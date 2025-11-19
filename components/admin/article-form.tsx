"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { Article } from "@/lib/types/article"
import { generateSlug } from "@/lib/utils/slug-util"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import "react-quill-new/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any

// Basic toolbar options (always visible)
const BASIC_TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["link", "image"],
  ["clean"],
]

// Advanced toolbar options (collapsible)
const ADVANCED_TOOLBAR_OPTIONS = [
  [{ header: [4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["blockquote", "code-block"],
  ["video"],
  [{ direction: "rtl" }],
]

const CATEGORY_OPTIONS = [
  { value: "kien-thuc-dep", label: "Kiến thức ĐẸP" },
  { value: "hoat-dong-cellic", label: "Hoạt động CELLIC" },
  { value: "other", label: "Khác" },
]

export interface ArticleFormSubmitData {
  title: string
  slug: string
  category: string
  excerpt?: string | null
  featuredImage?: string | null
  author?: string | null
  content: string
  publishedAt?: number | null
  isFeatured: boolean
  isPublished: boolean
}

interface ArticleFormProps {
  article?: Article | null
  onSubmit: (data: ArticleFormSubmitData) => Promise<void> | void
  onCancel: () => void
  readOnly?: boolean
  isSubmitting?: boolean
}

interface ArticleFormValues {
  title: string
  slug: string
  category: string
  excerpt: string
  featuredImage: string
  author: string
  publishedDate: string
  isFeatured: boolean
  isPublished: boolean
  content: string
}

export function ArticleForm({
  article,
  onSubmit,
  onCancel,
  readOnly = false,
  isSubmitting = false,
}: ArticleFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const quillRef = useRef<any>(null)
  const originalContentRef = useRef<string>("")
  const previousContentRef = useRef<string>("")
  const uploadedImagesRef = useRef<Set<string>>(new Set()) // Track images uploaded in this session
  const [uploading, setUploading] = useState(false)
  const [showAdvancedTools, setShowAdvancedTools] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      category: CATEGORY_OPTIONS[0].value,
      excerpt: "",
      featuredImage: "",
      author: "",
      publishedDate: "",
      isFeatured: false,
      isPublished: true,
      content: "",
    },
  })

  useEffect(() => {
    register("content", { required: true })
  }, [register])

  useEffect(() => {
    if (article) {
      const content = article.content || ""
      originalContentRef.current = content
      previousContentRef.current = content
      // Extract existing images from article content and track them
      const existingImages = content.match(/<img[^>]+src=["'](\/articles\/[^"']+)["'][^>]*>/gi) || []
      uploadedImagesRef.current.clear()
      existingImages.forEach((img) => {
        const match = img.match(/src=["'](\/articles\/[^"']+)["']/)
        if (match) {
          uploadedImagesRef.current.add(match[1])
        }
      })
      reset({
        title: article.title,
        slug: article.slug,
        category: article.category || CATEGORY_OPTIONS[0].value,
        excerpt: article.excerpt || "",
        featuredImage: article.featuredImage || "",
        author: article.author || "",
        publishedDate: article.publishedAt
          ? new Date(article.publishedAt * 1000).toISOString().slice(0, 10)
          : "",
        isFeatured: article.isFeatured,
        isPublished: article.isPublished,
        content,
      })
    } else {
      originalContentRef.current = ""
      previousContentRef.current = ""
      uploadedImagesRef.current.clear()
      reset({
        title: "",
        slug: "",
        category: CATEGORY_OPTIONS[0].value,
        excerpt: "",
        featuredImage: "",
        author: "",
        publishedDate: "",
        isFeatured: false,
        isPublished: true,
        content: "",
      })
    }
  }, [article, reset])

  const watchedTitle = watch("title")
  const watchedContent = watch("content")

  // Auto-generate slug from title and keep it hidden from manual edits
  useEffect(() => {
    if (typeof watchedTitle === "undefined") {
      return
    }
    const generatedSlug = generateSlug(watchedTitle || "")
    setValue("slug", generatedSlug, { shouldValidate: false })
  }, [watchedTitle, setValue])

  const handleEditorImageUpload = useCallback(() => {
    if (readOnly || typeof window === "undefined") {
      return
    }

    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      const formData = new FormData()
      formData.append("file", file)
      if (article?.id) {
        formData.append("articleId", article.id)
      }

      try {
        const response = await fetch("/api/admin/articles/upload", {
          method: "POST",
          body: formData,
        })
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.error || "Không thể tải ảnh")
        }
        const imageUrl = result.data?.url || result.url
        const editor = quillRef.current?.getEditor?.()
        if (editor && imageUrl) {
          const range = editor.getSelection(true)
          const insertAt = range?.index ?? editor.getLength()
          editor.insertEmbed(insertAt, "image", imageUrl)
          editor.setSelection(insertAt + 1)
          toast.success("Đã chèn ảnh vào nội dung")
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Không thể tải ảnh nội dung")
      } finally {
        input.value = ""
      }
    }

    input.click()
  }, [article?.id, readOnly])

  // Setup Quill editor handlers for paste
  useEffect(() => {
    if (readOnly || typeof window === "undefined") return

    let cleanup: (() => void) | null = null
    let retryTimeout: NodeJS.Timeout | null = null

    // Wait for editor to be ready
    const setupEditor = (): void => {
      if (!quillRef.current) {
        retryTimeout = setTimeout(setupEditor, 100)
        return
      }

      // Try to get editor - ReactQuill might expose it differently
      let editor: any = null
      try {
        if (typeof quillRef.current.getEditor === 'function') {
          editor = quillRef.current.getEditor()
        } else if (quillRef.current.editor) {
          editor = quillRef.current.editor
        }
      } catch (error) {
        // Editor not ready yet, retry
        retryTimeout = setTimeout(setupEditor, 100)
        return
      }

      if (!editor || !editor.root) {
        retryTimeout = setTimeout(setupEditor, 100)
        return
      }

      // Disable Quill's default drop handler to prevent duplicate images
      // Override the clipboard module's drop handler
      if (editor.clipboard && editor.clipboard.container) {
        const clipboardContainer = editor.clipboard.container
        // Remove Quill's default drop listener if it exists
        const originalDrop = clipboardContainer.ondrop
        clipboardContainer.ondrop = null
      }

      // Helper function to delete image file
      const deleteImageFile = async (imageUrl: string) => {
        try {
          const response = await fetch("/api/admin/articles/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl }),
          })
          const result = await response.json()
          if (!response.ok) {
            console.warn("Failed to delete image file:", result.error)
          }
        } catch (error) {
          console.warn("Error deleting image file:", error)
        }
      }

      // Extract image URLs from HTML content
      const extractImageUrls = (html: string): string[] => {
        const urls: string[] = []
        const imgRegex = /<img[^>]+src=["'](\/articles\/[^"']+)["'][^>]*>/gi
        let match
        while ((match = imgRegex.exec(html)) !== null) {
          const url = match[1]
          if (url && !url.startsWith("data:")) {
            urls.push(url)
          }
        }
        return urls
      }

      // Helper function to upload and insert image
      const uploadAndInsertImage = async (file: File, index: number = 0, total: number = 1) => {
        // Show loading
        const loadingMessage = total > 1 ? `Đang tải ảnh ${index + 1}/${total}...` : "Đang tải ảnh..."
        toast.loading(loadingMessage, { id: `upload-image-${index}` })

        // Upload directly
        const formData = new FormData()
        formData.append("file", file)
        if (article?.id) {
          formData.append("articleId", article.id)
        }

        try {
          const response = await fetch("/api/admin/articles/upload", {
            method: "POST",
            body: formData,
          })
          const result = await response.json()
          if (!response.ok) {
            throw new Error(result.error || "Không thể tải ảnh")
          }
          const imageUrl = result.data?.url || result.url

          // Track this uploaded image
          uploadedImagesRef.current.add(imageUrl)

          // Insert image at cursor position
          const range = editor.getSelection(true)
          const insertAt = range?.index ?? editor.getLength()
          editor.insertEmbed(insertAt, "image", imageUrl)
          editor.setSelection(insertAt + 1)

          const successMessage = total > 1 ? `Đã tải ảnh ${index + 1}/${total} lên server` : "Đã tải ảnh lên server"
          toast.success(successMessage, { id: `upload-image-${index}` })
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Không thể tải ảnh",
            { id: `upload-image-${index}` }
          )
        }
      }

      // Handle paste event to detect base64 images
      const handlePaste = async (e: ClipboardEvent) => {
        const items = e.clipboardData?.items
        if (!items) return

        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          if (item.type.indexOf("image") !== -1) {
            e.preventDefault()

            const blob = item.getAsFile()
            if (!blob) continue

            await uploadAndInsertImage(blob)
            break
          }
        }
      }

      // Handle drag & drop events
      const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        // Add visual feedback
        const editorElement = editor.root
        editorElement.classList.add("drag-over")
      }

      const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const editorElement = editor.root
        editorElement.classList.remove("drag-over")
      }

      const handleDrop = async (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation() // Prevent Quill's default handler

        const editorElement = editor.root
        editorElement.classList.remove("drag-over")

        const files = e.dataTransfer?.files
        if (!files || files.length === 0) return

        // Filter only image files
        const imageFiles: File[] = []
        for (let i = 0; i < files.length; i++) {
          if (files[i].type.startsWith("image/")) {
            imageFiles.push(files[i])
          }
        }

        if (imageFiles.length === 0) {
          toast.error("Vui lòng kéo thả file ảnh")
          return
        }

        // Small delay to ensure Quill doesn't process the drop event
        await new Promise(resolve => setTimeout(resolve, 10))

        // Upload all images sequentially
        for (let i = 0; i < imageFiles.length; i++) {
          await uploadAndInsertImage(imageFiles[i], i, imageFiles.length)
        }
      }

      // Handle text-change to detect when images are deleted
      const handleTextChange = () => {
        const currentContent = editor.root.innerHTML
        const previousContent = previousContentRef.current

        if (previousContent) {
          // Extract image URLs from previous and current content
          const previousImages = extractImageUrls(previousContent)
          const currentImages = extractImageUrls(currentContent)

          // Find images that were removed
          const removedImages = previousImages.filter((url) => !currentImages.includes(url))

          // Delete files for removed images that were uploaded in this session
          for (const imageUrl of removedImages) {
            if (uploadedImagesRef.current.has(imageUrl)) {
              // This image was uploaded in this session and is now deleted
              deleteImageFile(imageUrl)
              uploadedImagesRef.current.delete(imageUrl)
            }
          }
        }

        // Update previous content
        previousContentRef.current = currentContent
      }

      // Initialize previous content
      previousContentRef.current = editor.root.innerHTML

      const editorElement = editor.root
      // Use capture phase (true) to ensure our handler runs BEFORE Quill's default handler
      // This prevents duplicate image insertion
      editorElement.addEventListener("paste", handlePaste as any, true)
      editorElement.addEventListener("dragover", handleDragOver as any, true)
      editorElement.addEventListener("dragleave", handleDragLeave as any, true)
      editorElement.addEventListener("drop", handleDrop as any, true)

      // Listen to text-change events to detect image deletion
      editor.on("text-change", handleTextChange)

      cleanup = () => {
        editorElement.removeEventListener("paste", handlePaste as any)
        editorElement.removeEventListener("dragover", handleDragOver as any)
        editorElement.removeEventListener("dragleave", handleDragLeave as any)
        editorElement.removeEventListener("drop", handleDrop as any)
        editorElement.classList.remove("drag-over")
        editor.off("text-change", handleTextChange)
      }
    }

    // Start setup with initial delay
    retryTimeout = setTimeout(setupEditor, 200)

    return () => {
      if (retryTimeout) clearTimeout(retryTimeout)
      if (cleanup) cleanup()
    }
  }, [readOnly, article?.id])

  const quillModules = useMemo(
    () => {
      // Combine basic and advanced tools based on state
      const toolbarOptions = showAdvancedTools
        ? [...BASIC_TOOLBAR_OPTIONS, ...ADVANCED_TOOLBAR_OPTIONS]
        : BASIC_TOOLBAR_OPTIONS

      return {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            image: handleEditorImageUpload,
          },
        },
        clipboard: {
          matchVisual: false,
        },
      }
    },
    [handleEditorImageUpload, showAdvancedTools]
  )

  const onSubmitForm = handleSubmit(async (values) => {
    if (readOnly) return
    const publishedAt = values.publishedDate
      ? Math.floor(new Date(values.publishedDate).getTime() / 1000)
      : null

    // Cleanup unused images if editing existing article
    if (article?.id && originalContentRef.current !== values.content) {
      try {
        await fetch("/api/admin/articles/cleanup-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            articleId: article.id,
            oldContent: originalContentRef.current,
            newContent: values.content,
          }),
        })
      } catch (error) {
        console.warn("Failed to cleanup images:", error)
        // Don't block submission if cleanup fails
      }
    }

    await onSubmit({
      title: values.title,
      slug: values.slug || generateSlug(values.title),
      category: values.category,
      excerpt: values.excerpt || null,
      featuredImage: values.featuredImage || null,
      author: values.author || null,
      content: values.content,
      publishedAt,
      isFeatured: values.isFeatured,
      isPublished: values.isPublished,
    })

    // Update original content ref after successful save
    originalContentRef.current = values.content
  })

  const handlePickImage = () => {
    if (readOnly) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    if (article?.id) {
      formData.append("articleId", article.id)
    }

    setUploading(true)
    try {
      const response = await fetch("/api/admin/articles/upload", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || "Không thể tải ảnh")
      }
      const imageUrl = result.data?.url || result.url
      setValue("featuredImage", imageUrl ?? "")
      toast.success("Tải ảnh thành công")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể tải ảnh")
    } finally {
      setUploading(false)
      event.target.value = ""
    }
  }

  return (
    <form onSubmit={onSubmitForm} className="space-y-6" data-admin>
      <input type="hidden" {...register("slug", { required: true })} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="title" className="font-semibold text-neutral-900">Tiêu đề</Label>
          <Input
            id="title"
            placeholder="Nhập tiêu đề bài viết"
            disabled={readOnly}
            {...register("title", { required: true })}
            className="h-12 border-[var(--admin-neutral-gray)]/60"
          />
          {errors.title && (
            <p className="text-sm text-red-500">Tiêu đề là bắt buộc</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label className="font-semibold text-neutral-900">Danh mục</Label>
          <select
            {...register("category")}
            disabled={readOnly}
            className="w-full h-12 rounded-md border border-[var(--admin-neutral-gray)]/60 px-3 text-sm"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold text-neutral-900">Ngày publish</Label>
          <Input
            type="date"
            disabled={readOnly}
            {...register("publishedDate")}
            className="h-12 border-[var(--admin-neutral-gray)]/60"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-semibold text-neutral-900">Mô tả ngắn</Label>
        <Textarea
          rows={3}
          placeholder="Nhập mô tả nổi bật cho bài viết..."
          disabled={readOnly}
          {...register("excerpt")}
          className="border-[var(--admin-neutral-gray)]/60"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-3">
          <Label className="font-semibold text-neutral-900">Ảnh nổi bật</Label>
          <div className="space-y-3">
            <div className="relative aspect-video w-full rounded-2xl border-2 border-dashed border-[var(--admin-neutral-gray)]/50 bg-[var(--admin-cool-gray)]/10 flex items-center justify-center overflow-hidden">
              {watch("featuredImage") ? (
                <img
                  src={watch("featuredImage")}
                  alt="Featured preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="text-sm text-neutral-500">Chưa có hình ảnh</p>
              )}
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="/articles/..."
                disabled={readOnly}
                {...register("featuredImage")}
              />
              {!readOnly && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePickImage}
                  disabled={uploading}
                  className="shrink-0"
                >
                  {uploading ? "Đang tải..." : "Upload"}
                </Button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-semibold text-neutral-900">Tác giả</Label>
            <Input
              placeholder="Tên tác giả"
              disabled={readOnly}
              {...register("author")}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-800">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300"
                disabled={readOnly}
                {...register("isFeatured")}
              />
              Bài viết nổi bật
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-800">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300"
                disabled={readOnly}
                {...register("isPublished")}
              />
              Hiển thị công khai
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="font-semibold text-neutral-900">Nội dung</Label>
          <button
            type="button"
            onClick={() => setShowAdvancedTools(!showAdvancedTools)}
            className="text-xs font-medium text-neutral-600 hover:text-neutral-900 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
            title={showAdvancedTools ? "Ẩn công cụ nâng cao" : "Hiện công cụ nâng cao"}
          >
            {showAdvancedTools ? "Ẩn bớt" : "Thêm công cụ"}
          </button>
        </div>
        <div className="border border-[var(--admin-neutral-gray)]/60 rounded-xl overflow-hidden bg-white [&_.ql-editor.drag-over]:bg-gray-50 [&_.ql-editor.drag-over]:border-2 [&_.ql-editor.drag-over]:border-dashed [&_.ql-editor.drag-over]:border-[var(--admin-beige)]">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={watchedContent}
            modules={quillModules}
            onChange={(value: string) => setValue("content", value, { shouldDirty: true })}
            readOnly={readOnly}
            className="min-h-[300px]"
          />
        </div>
        {errors.content && (
          <p className="text-sm text-red-500">Nội dung là bắt buộc</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="px-6"
        >
          {readOnly ? "Đóng" : "Hủy"}
        </Button>
        {!readOnly && (
          <Button
            type="submit"
            className="px-6 bg-[var(--admin-beige)] text-neutral-900 hover:bg-[var(--admin-beige)]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang lưu..." : article ? "Cập nhật" : "Tạo bài viết"}
          </Button>
        )}
      </div>
    </form>
  )
}

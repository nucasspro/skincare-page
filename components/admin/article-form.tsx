"use client"

import dynamic from "next/dynamic"
import { useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { Article } from "@/lib/types/article"
import { generateSlug } from "@/lib/utils/slug-util"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import "react-quill-new/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

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
  const [uploading, setUploading] = useState(false)

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
        content: article.content,
      })
    } else {
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

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  )

  const onSubmitForm = handleSubmit(async (values) => {
    if (readOnly) return
    const publishedAt = values.publishedDate
      ? Math.floor(new Date(values.publishedDate).getTime() / 1000)
      : null

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
  })

  const handleGenerateSlug = () => {
    if (readOnly) return
    setValue("slug", generateSlug(watchedTitle || ""))
  }

  const handlePickImage = () => {
    if (readOnly) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="slug" className="font-semibold text-neutral-900">Slug</Label>
            {!readOnly && (
              <button
                type="button"
                onClick={handleGenerateSlug}
                className="text-xs font-semibold text-[var(--admin-taupe)] hover:text-neutral-900"
              >
                Tạo từ tiêu đề
              </button>
            )}
          </div>
          <Input
            id="slug"
            placeholder="nhap-tieu-de"
            disabled={readOnly}
            {...register("slug", { required: true })}
            className="h-12 border-[var(--admin-neutral-gray)]/60"
          />
          {errors.slug && (
            <p className="text-sm text-red-500">Slug là bắt buộc</p>
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
        <Label className="font-semibold text-neutral-900">Nội dung</Label>
        <div className="border border-[var(--admin-neutral-gray)]/60 rounded-xl overflow-hidden bg-white">
          <ReactQuill
            theme="snow"
            value={watchedContent}
            modules={quillModules}
            onChange={(value) => setValue("content", value, { shouldDirty: true })}
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

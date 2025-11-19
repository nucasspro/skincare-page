"use client"

import { Plus, RefreshCw } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { AdminLayout } from "@/components/admin/admin-layout"
import { ArticleForm, type ArticleFormSubmitData } from "@/components/admin/article-form"
import { ArticleList } from "@/components/admin/article-list"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useCurrentUser } from "@/hooks/use-current-user"
import { adminArticleService } from "@/lib/services/admin/article-service"
import type { Article } from "@/lib/types/article"

type DialogMode = "create" | "edit" | "view"

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<DialogMode>("create")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { isAdmin } = useCurrentUser()

  const fetchArticles = async (showToast = false) => {
    try {
      setLoading(true)
    const response = await adminArticleService.getArticles({ pageSize: 50 })
      setArticles(response.data)
      if (showToast) {
        toast.success("Đã làm mới danh sách bài viết")
      }
    } catch (error) {
      console.error(error)
      toast.error("Không thể tải danh sách bài viết")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleCreate = () => {
    setSelectedArticle(null)
    setDialogMode("create")
    setDialogOpen(true)
  }

  const handleEdit = (article: Article) => {
    setSelectedArticle(article)
    setDialogMode("edit")
    setDialogOpen(true)
  }

  const handleView = (article: Article) => {
    setSelectedArticle(article)
    setDialogMode("view")
    setDialogOpen(true)
  }

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setSelectedArticle(null)
      setDialogMode("create")
    }
  }

  const handleSubmit = async (formData: ArticleFormSubmitData) => {
    try {
      setSubmitting(true)
      if (dialogMode === "edit" && selectedArticle) {
        await adminArticleService.updateArticle(selectedArticle.id, formData)
        toast.success("Cập nhật bài viết thành công")
      } else {
        await adminArticleService.createArticle(formData)
        toast.success("Tạo bài viết thành công")
      }
      handleDialogClose(false)
      fetchArticles()
    } catch (error) {
      console.error(error)
      toast.error(
        dialogMode === "edit"
          ? "Không thể cập nhật bài viết"
          : "Không thể tạo bài viết"
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      toast.error("Bạn không có quyền xoá bài viết")
      return
    }
    const confirmed = window.confirm("Bạn có chắc chắn muốn xoá bài viết này?")
    if (!confirmed) return
    try {
      await adminArticleService.deleteArticle(id)
      toast.success("Đã xoá bài viết")
      fetchArticles()
    } catch (error) {
      console.error(error)
      toast.error("Không thể xoá bài viết")
    }
  }

  const dialogTitle = useMemo(() => {
    switch (dialogMode) {
      case "edit":
        return "Chỉnh sửa bài viết"
      case "view":
        return "Chi tiết bài viết"
      default:
        return "Tạo bài viết"
    }
  }, [dialogMode])

  if (loading && articles.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-neutral-500">Đang tải dữ liệu...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Bài viết</h1>
            <p className="text-sm text-neutral-500">
              Quản lý nội dung blog và các hoạt động truyền thông
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-10"
              onClick={() => fetchArticles(true)}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm mới
            </Button>
            <Button
              className="h-10 bg-[var(--admin-beige)] text-neutral-900 hover:bg-[var(--admin-beige)]/80"
              onClick={handleCreate}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm bài viết
            </Button>
          </div>
        </div>

        <ArticleList
          articles={articles}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          canDelete={isAdmin}
        />

        <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <ArticleForm
              article={selectedArticle}
              readOnly={dialogMode === "view"}
              onSubmit={handleSubmit}
              onCancel={() => handleDialogClose(false)}
              isSubmitting={submitting}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

"use client"

import { useMemo, useState } from "react"

import type { Article } from "@/lib/types/article"
import { formatDate } from "@/lib/utils/date-utils"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Edit, Eye, Search, Trash2 } from "lucide-react"

interface ArticleListProps {
  articles: Article[]
  onEdit: (article: Article) => void
  onView: (article: Article) => void
  onDelete: (id: string) => void
  canDelete?: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  "kien-thuc-dep": "Kiến thức ĐẸP",
  "hoat-dong-cellic": "Hoạt động CELLIC",
  other: "Khác",
}

export function ArticleList({
  articles,
  onEdit,
  onView,
  onDelete,
  canDelete = false,
}: ArticleListProps) {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.slug.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        categoryFilter === "all" || article.category === categoryFilter

      return matchesSearch && matchesCategory
    })
  }, [articles, search, categoryFilter])

  const categories = useMemo(() => {
    const unique = new Set(articles.map((article) => article.category))
    return Array.from(unique)
  }, [articles])

  if (articles.length === 0) {
    return (
      <Card className="p-12 text-center border border-[var(--admin-neutral-gray)]/50 bg-white">
        <p className="text-sm text-neutral-500">
          Chưa có bài viết nào. Hãy tạo bài viết đầu tiên của bạn.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 border border-[var(--admin-neutral-gray)]/50 bg-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-cool-gray)]" />
            <Input
              placeholder="Tìm kiếm theo tiêu đề hoặc slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 border-[var(--admin-neutral-gray)]/50"
            />
          </div>
          <div className="md:w-64">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-10 rounded-md border border-[var(--admin-neutral-gray)]/50 px-3 text-sm"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat] || cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden border border-[var(--admin-neutral-gray)]/50 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--admin-cool-gray)]/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                  Tiêu đề
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                  Danh mục
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                  Cập nhật
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wide">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-neutral-gray)]/30">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-[var(--admin-hover-bg)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-neutral-900 line-clamp-1">
                        {article.title}
                      </p>
                      <p className="text-xs text-neutral-500 font-mono">
                        {article.slug}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">
                    {CATEGORY_LABELS[article.category] || article.category}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          article.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {article.isPublished ? "Đã xuất bản" : "Bản nháp"}
                      </span>
                      {article.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          Nổi bật
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">
                    {formatDate(article.updatedAt || article.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 rounded-md border border-[var(--admin-neutral-gray)]/40"
                        onClick={() => onView(article)}
                        title="Xem bài viết"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 rounded-md border border-[var(--admin-beige)]/50 bg-[var(--admin-beige)]/10"
                        onClick={() => onEdit(article)}
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 rounded-md border border-red-200 bg-red-50 text-red-600 disabled:opacity-40"
                        onClick={() => onDelete(article.id)}
                        disabled={!canDelete}
                        title={canDelete ? "Xoá" : "Không có quyền xoá"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

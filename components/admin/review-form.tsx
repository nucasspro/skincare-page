'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Review } from '@/lib/services/admin/review-service'
import { Save, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ReviewFormProps {
  review?: Review | null
  products: any[]
  onSubmit: (data: ReviewFormData) => void
  onCancel: () => void
  readOnly?: boolean
}

export interface ReviewFormData {
  productId: string
  reviewerName: string
  rating: number
  review: string
}

export function ReviewForm({
  review,
  products,
  onSubmit,
  onCancel,
  readOnly = false
}: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    productId: '',
    reviewerName: '',
    rating: 5,
    review: '',
  })
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  useEffect(() => {
    if (review) {
      setFormData({
        productId: review.productId,
        reviewerName: review.reviewerName,
        rating: review.rating,
        review: review.review,
      })
    }
  }, [review])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleStarClick = (rating: number, isHalf: boolean = false) => {
    if (!readOnly) {
      const finalRating = isHalf ? rating - 0.5 : rating
      setFormData({ ...formData, rating: finalRating })
    }
  }

  const handleStarHover = (rating: number, isHalf: boolean = false) => {
    if (!readOnly) {
      const finalRating = isHalf ? rating - 0.5 : rating
      setHoverRating(finalRating)
    }
  }

  const handleMouseLeave = () => {
    setHoverRating(null)
  }

  const renderStar = (starNumber: number) => {
    const displayRating = hoverRating !== null ? hoverRating : formData.rating
    const isFullyFilled = starNumber <= displayRating
    const isHalfFilled = starNumber - 0.5 === displayRating

    const isHovering = hoverRating !== null

    return (
      <div key={starNumber} className="relative inline-block">
        {/* Full star button */}
        <button
          type="button"
          onClick={() => handleStarClick(starNumber, false)}
          onMouseEnter={() => handleStarHover(starNumber, false)}
          disabled={readOnly}
          className={`absolute inset-0 w-1/2 z-10 ${
            readOnly ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          style={{ right: 0, left: 'auto' }}
          title={`${starNumber} sao`}
        />
        {/* Half star button */}
        <button
          type="button"
          onClick={() => handleStarClick(starNumber, true)}
          onMouseEnter={() => handleStarHover(starNumber, true)}
          disabled={readOnly}
          className={`absolute inset-0 w-1/2 z-10 ${
            readOnly ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
          style={{ left: 0, right: 'auto' }}
          title={`${starNumber - 0.5} sao`}
        />
        {/* Star visual */}
        <div className={`relative transition-all duration-150 ${!readOnly && 'hover:scale-110'}`}>
          {isHalfFilled ? (
            <div className="relative h-8 w-8">
              <Star className={`h-8 w-8 absolute inset-0 transition-colors duration-150 ${
                isHovering ? 'fill-neutral-200 text-neutral-300' : 'fill-neutral-200 text-neutral-300'
              }`} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                <Star className={`h-8 w-8 transition-colors duration-150 ${
                  isHovering ? 'fill-yellow-300 text-yellow-300' : 'fill-yellow-400 text-yellow-400'
                }`} />
              </div>
            </div>
          ) : (
            <Star
              className={`h-8 w-8 transition-colors duration-150 ${
                isFullyFilled
                  ? isHovering
                    ? 'fill-yellow-300 text-yellow-300'
                    : 'fill-yellow-400 text-yellow-400'
                  : 'fill-neutral-200 text-neutral-300'
              }`}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      {/* Product */}
      <div>
        <Label htmlFor="productId" className="text-neutral-700 text-sm font-medium">
          Sản phẩm <span className="text-red-500">*</span>
        </Label>
        <select
          id="productId"
          value={formData.productId}
          onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
          disabled={readOnly}
          className="mt-1.5 h-9 w-full rounded border border-neutral-300 bg-white px-3 text-sm disabled:bg-neutral-100 disabled:cursor-not-allowed focus:border-neutral-400 focus:outline-none focus:ring-0"
          required
        >
          <option value="">Chọn sản phẩm</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      {/* Reviewer Name */}
      <div>
        <Label htmlFor="reviewerName" className="text-neutral-700 text-sm font-medium">
          Tên người review <span className="text-red-500">*</span>
        </Label>
        <Input
          id="reviewerName"
          value={formData.reviewerName}
          onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
          disabled={readOnly}
          placeholder="Nhập tên người review"
          className="mt-1.5 bg-white h-9 rounded border border-neutral-300 shadow-none focus:border-neutral-400 focus:outline-none focus:ring-0 text-sm transition-colors disabled:bg-neutral-100 disabled:cursor-not-allowed"
          required
        />
      </div>

      {/* Rating - Star Selector */}
      <div>
        <Label className="text-neutral-700 text-sm font-medium">
          Rating <span className="text-red-500">*</span>
        </Label>
        <div
          className="mt-1.5 flex items-center gap-1"
          onMouseLeave={handleMouseLeave}
        >
          {[1, 2, 3, 4, 5].map((star) => renderStar(star))}
          <span className="ml-2 text-sm text-neutral-600 min-w-[50px]">
            {hoverRating !== null ? hoverRating : formData.rating} sao
          </span>
        </div>
      </div>

      {/* Review Content */}
      <div>
        <Label htmlFor="review" className="text-neutral-700 text-sm font-medium">
          Nội dung review <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="review"
          value={formData.review}
          onChange={(e) => setFormData({ ...formData, review: e.target.value })}
          disabled={readOnly}
          placeholder="Nhập nội dung review..."
          className="mt-1.5 bg-white rounded border border-neutral-300 min-h-[150px] shadow-none focus:border-neutral-400 focus:outline-none focus:ring-0 text-sm transition-colors disabled:bg-neutral-100 disabled:cursor-not-allowed"
          required
        />
      </div>

      {/* Buttons */}
      {!readOnly && (
        <div className="flex gap-2 pt-4 border-t border-neutral-200 justify-end sticky bottom-0 bg-neutral-50 z-10">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="rounded border-neutral-300 text-neutral-700 hover:bg-neutral-100 shadow-none h-9 px-4 text-sm cursor-pointer"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            className="gap-2 rounded bg-neutral-900 hover:bg-neutral-800 text-white border-0 shadow-none h-9 px-4 text-sm cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" />
            {review ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      )}
    </form>
  )
}

'use client'

import { RichTextEditor } from '@/components/rich-text-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Product } from '@/lib/product-service'
import { getAllSkinNeeds } from '@/lib/skin-need-service'
import { formatVND } from '@/lib/utils/currency-utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpen, FileText, FlaskConical, Image as ImageIcon, Package, Plus, Save, Sparkles, Tag, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  tagline: z.string().min(1, 'Tagline là bắt buộc'),
  price: z.number().min(0, 'Giá phải lớn hơn 0'),
  originalPrice: z.number().optional().nullable(),
  discount: z.number().optional().nullable(),
  category: z.string().min(1, 'Danh mục là bắt buộc'),
  needs: z.array(z.string()).min(1, 'Chọn ít nhất một nhu cầu da'),
  image: z.string().min(1, 'Hình ảnh là bắt buộc'),
  hoverImage: z.string().min(1, 'Hình ảnh hover là bắt buộc'),
  description: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
  howToUse: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: Product | null
  onSubmit: (data: ProductFormData & { description: string; benefits: string[]; ingredients: string[] }) => Promise<void>
  onCancel: () => void
  readOnly?: boolean
}

// Internal reusable components
interface SectionHeaderProps {
  icon: React.ReactNode
  title: string
  color: 'cool-gray' | 'beige' | 'lavender' | 'taupe'
}

function SectionHeader({ icon, title, color }: SectionHeaderProps) {
  const colorClasses = {
    'cool-gray': 'from-[var(--admin-cool-gray)]/25',
    'beige': 'from-[var(--admin-beige)]/25',
    'lavender': 'from-[var(--admin-lavender)]/25',
    'taupe': 'from-[var(--admin-taupe)]/25',
  }

  const iconBgClasses = {
    'cool-gray': 'bg-[var(--admin-cool-gray)]/40',
    'beige': 'bg-[var(--admin-beige)]/40',
    'lavender': 'bg-[var(--admin-lavender)]/40',
    'taupe': 'bg-[var(--admin-taupe)]/40',
  }

  return (
    <div className={`px-6 py-4 bg-gradient-to-r ${colorClasses[color]} to-transparent border-b-2 border-[var(--admin-neutral-gray)]/50`}>
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${iconBgClasses[color]}`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
      </div>
    </div>
  )
}

export function ProductForm({ product, onSubmit, onCancel, readOnly = false }: ProductFormProps) {
  const [description, setDescription] = useState('')
  const [benefits, setBenefits] = useState<string[]>([''])
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [priceDisplay, setPriceDisplay] = useState('')
  const [originalPriceDisplay, setOriginalPriceDisplay] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      needs: [],
      benefits: [],
      ingredients: [],
    },
  })

  const watchedNeeds = watch('needs')
  const watchedPrice = watch('price')
  const watchedOriginalPrice = watch('originalPrice')
  const watchedImage = watch('image')
  const watchedHoverImage = watch('hoverImage')

  // Load product data when editing
  useEffect(() => {
    if (product) {
      setDescription(product.description || '')
      setBenefits(product.benefits && product.benefits.length > 0 ? product.benefits : [''])
      setIngredients(product.ingredients && product.ingredients.length > 0 ? product.ingredients : [''])
      setPriceDisplay(product.price ? formatVND(product.price).replace(' đ', '') : '')
      setOriginalPriceDisplay(product.originalPrice ? formatVND(product.originalPrice).replace(' đ', '') : '')

      reset({
        name: product.name,
        tagline: product.tagline,
        price: product.price,
        originalPrice: product.originalPrice || null,
        discount: product.discount || null,
        category: product.category,
        needs: product.needs || [],
        image: product.image,
        hoverImage: product.hoverImage,
        description: product.description || '',
        benefits: product.benefits || [],
        ingredients: product.ingredients || [],
        howToUse: product.howToUse || '',
      })
    } else {
      // Reset form for new product
      setDescription('')
      setBenefits([''])
      setIngredients([''])
      setPriceDisplay('')
      setOriginalPriceDisplay('')
      reset({
        name: '',
        tagline: '',
        price: 0,
        originalPrice: null,
        discount: null,
        category: '',
        needs: [],
        image: '',
        hoverImage: '',
        description: '',
        benefits: [],
        ingredients: [],
        howToUse: '',
      })
    }
  }, [product, reset])

  // Format price display when form value changes
  useEffect(() => {
    if (watchedPrice && watchedPrice > 0) {
      setPriceDisplay(formatVND(watchedPrice).replace(' VNĐ', ''))
    }
  }, [watchedPrice])

  useEffect(() => {
    if (watchedOriginalPrice && watchedOriginalPrice > 0) {
      setOriginalPriceDisplay(formatVND(watchedOriginalPrice).replace(' VNĐ', ''))
    }
  }, [watchedOriginalPrice])

  const handleFormSubmit = async (data: ProductFormData) => {
    await onSubmit({
      ...data,
      description,
      benefits: benefits.filter(b => b.trim() !== ''),
      ingredients: ingredients.filter(i => i.trim() !== ''),
    })
  }

  const addBenefit = () => {
    setBenefits([...benefits, ''])
  }

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index))
  }

  const addIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const toggleNeed = (needId: string) => {
    if (readOnly) return
    const currentNeeds = watchedNeeds || []
    const newNeeds = currentNeeds.includes(needId)
      ? currentNeeds.filter(id => id !== needId)
      : [...currentNeeds, needId]
    setValue('needs', newNeeds)
  }

  // Price input handlers (reusable)
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, setDisplay: (value: string) => void, setFormValue: (value: number) => void) => {
    if (readOnly) return
    const inputValue = e.target.value.replace(/[^\d]/g, '')
    setDisplay(inputValue)
    const numValue = parseFloat(inputValue || '0')
    if (!isNaN(numValue)) {
      setFormValue(numValue)
    }
  }

  const handleRequiredPriceBlur = (e: React.FocusEvent<HTMLInputElement>, setDisplay: (value: string) => void, setFormValue: (value: number) => void) => {
    if (readOnly) return
    const inputValue = e.target.value.replace(/[^\d]/g, '')
    const numValue = parseFloat(inputValue || '0')
    if (!isNaN(numValue) && numValue > 0) {
      const formatted = formatVND(numValue).replace(' đ', '')
      setDisplay(formatted)
      setFormValue(numValue)
    } else {
      setDisplay('')
      setFormValue(0)
    }
  }

  const handleOptionalPriceBlur = (e: React.FocusEvent<HTMLInputElement>, setDisplay: (value: string) => void, setFormValue: (value: number | null) => void) => {
    if (readOnly) return
    const inputValue = e.target.value.replace(/[^\d]/g, '')
    const numValue = parseFloat(inputValue || '0')
    if (!isNaN(numValue) && numValue > 0) {
      const formatted = formatVND(numValue).replace(' đ', '')
      setDisplay(formatted)
      setFormValue(numValue)
    } else {
      setDisplay('')
      setFormValue(null)
    }
  }

  // Array input handlers (reusable for benefits/ingredients)
  const handleArrayItemChange = <T,>(
    index: number,
    value: string,
    array: T[],
    setArray: (array: T[]) => void,
    readOnly: boolean
  ) => {
    if (readOnly) return
    const newArray = [...array] as any[]
    newArray[index] = value
    setArray(newArray as T[])
  }

  const skinNeeds = getAllSkinNeeds()

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" data-admin>
      {/* Basic Information */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <SectionHeader
          icon={<Package className="h-5 w-5 text-neutral-800" />}
          title="Thông tin cơ bản"
          color="cool-gray"
        />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-bold text-neutral-900 mb-2.5 block uppercase tracking-wide">
                Tên sản phẩm <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Nhập tên sản phẩm"
                disabled={readOnly}
                className="h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 text-sm focus:border-[var(--admin-cool-gray)] focus:ring-2 focus:ring-[var(--admin-cool-gray)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>
              )}
            </div>

            {/* Tagline */}
            <div>
              <Label htmlFor="tagline" className="text-sm font-bold text-neutral-900 mb-2.5 block uppercase tracking-wide">
                Tagline <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tagline"
                {...register('tagline')}
                placeholder="Nhập tagline"
                disabled={readOnly}
                className="h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 text-sm focus:border-[var(--admin-cool-gray)] focus:ring-2 focus:ring-[var(--admin-cool-gray)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
              />
              {errors.tagline && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.tagline.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="text-sm font-bold text-neutral-900 mb-2.5 block uppercase tracking-wide">
                Giá <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="price"
                  type="text"
                  value={priceDisplay}
                  onChange={(e) => handlePriceChange(
                    e,
                    setPriceDisplay,
                    (value) => setValue('price', value, { shouldValidate: true })
                  )}
                  onBlur={(e) => handleRequiredPriceBlur(
                    e,
                    setPriceDisplay,
                    (value) => setValue('price', value, { shouldValidate: true })
                  )}
                  placeholder="Nhập giá (VD: 125000)"
                  disabled={readOnly}
                  className="h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 pr-12 text-sm focus:border-[var(--admin-cool-gray)] focus:ring-2 focus:ring-[var(--admin-cool-gray)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 text-sm font-medium pointer-events-none">đ</span>
              </div>
              {errors.price && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.price.message}</p>
              )}
            </div>

            {/* Original Price */}
            <div>
              <Label htmlFor="originalPrice" className="text-sm font-bold text-neutral-900 mb-2.5 block uppercase tracking-wide">
                Giá gốc
              </Label>
              <div className="relative">
                <Input
                  id="originalPrice"
                  type="text"
                  value={originalPriceDisplay}
                  onChange={(e) => {
                    if (readOnly) return
                    handlePriceChange(
                      e,
                      setOriginalPriceDisplay,
                      (value) => setValue('originalPrice', value > 0 ? value : null, { shouldValidate: true })
                    )
                  }}
                  onBlur={(e) => handleOptionalPriceBlur(
                    e,
                    setOriginalPriceDisplay,
                    (value) => setValue('originalPrice', value, { shouldValidate: true })
                  )}
                  placeholder="Nhập giá gốc (VD: 150000)"
                  disabled={readOnly}
                  className="h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 pr-12 text-sm focus:border-[var(--admin-cool-gray)] focus:ring-2 focus:ring-[var(--admin-cool-gray)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 text-sm font-medium pointer-events-none">đ</span>
              </div>
            </div>

            {/* Discount */}
            <div>
              <Label htmlFor="discount" className="text-sm font-bold text-neutral-900 mb-2.5 block uppercase tracking-wide">
                Giảm giá (%)
              </Label>
              <Input
                id="discount"
                type="number"
                step="0.01"
                {...register('discount', { valueAsNumber: true })}
                placeholder="Nhập % giảm giá"
                disabled={readOnly}
                className="h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 text-sm focus:border-[var(--admin-cool-gray)] focus:ring-2 focus:ring-[var(--admin-cool-gray)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-sm font-bold text-neutral-900 mb-2.5 block uppercase tracking-wide">
                Danh mục <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category"
                {...register('category')}
                placeholder="Nhập danh mục (VD: oily, dry, sensitive)"
                disabled={readOnly}
                className="h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 text-sm focus:border-[var(--admin-cool-gray)] focus:ring-2 focus:ring-[var(--admin-cool-gray)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
              />
              {errors.category && (
                <p className="mt-2 text-sm text-red-600 font-medium">{errors.category.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <SectionHeader
          icon={<ImageIcon className="h-5 w-5 text-neutral-800" />}
          title="Hình ảnh"
          color="beige"
        />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Image */}
            <div>
              <Label className="text-sm font-bold text-neutral-900 mb-2.5 block uppercase tracking-wide">
                Hình ảnh <span className="text-red-500">*</span>
              </Label>
              <div className="mt-3">
                {/* Preview */}
                <div className="border-2 border-dashed border-[var(--admin-neutral-gray)]/60 rounded-xl p-6 flex flex-col items-center justify-center min-h-[240px] bg-gradient-to-br from-[var(--admin-beige)]/10 to-transparent mb-4 hover:border-[var(--admin-beige)]/70 transition-all">
                  {watchedImage ? (
                    <div className="text-center w-full">
                      <div className="relative w-full h-48 mb-3 rounded-xl overflow-hidden bg-[var(--admin-cool-gray)]/20 border-2 border-[var(--admin-neutral-gray)]/40">
                        <Image
                          src={watchedImage}
                          alt="Preview"
                          fill
                          className="object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                      <p className="text-xs text-neutral-600 break-all font-medium bg-white/60 px-3 py-1.5 rounded-lg border border-[var(--admin-neutral-gray)]/40">{watchedImage}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="p-4 rounded-xl bg-[var(--admin-beige)]/20 mb-3">
                        <ImageIcon className="h-8 w-8 text-neutral-600 mx-auto" />
                      </div>
                      <p className="text-sm text-neutral-600 font-medium">Kéo thả hoặc click để tải ảnh</p>
                    </div>
                  )}
                </div>
                {/* Input */}
                <Input
                  id="image"
                  {...register('image')}
                  placeholder="/path/to/image.jpg"
                  disabled={readOnly}
                  className="h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 text-sm focus:border-[var(--admin-beige)] focus:ring-2 focus:ring-[var(--admin-beige)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
                />
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.image.message}</p>
                )}
              </div>
            </div>

            {/* Hover Image */}
            <div>
              <Label className="text-sm font-bold text-neutral-900 mb-2.5 block uppercase tracking-wide">
                Hình ảnh hover <span className="text-red-500">*</span>
              </Label>
              <div className="mt-3">
                {/* Preview */}
                <div className="border-2 border-dashed border-[var(--admin-neutral-gray)]/60 rounded-xl p-6 flex flex-col items-center justify-center min-h-[240px] bg-gradient-to-br from-[var(--admin-lavender)]/10 to-transparent mb-4 hover:border-[var(--admin-lavender)]/70 transition-all">
                  {watchedHoverImage ? (
                    <div className="text-center w-full">
                      <div className="relative w-full h-48 mb-3 rounded-xl overflow-hidden bg-[var(--admin-cool-gray)]/20 border-2 border-[var(--admin-neutral-gray)]/40">
                        <Image
                          src={watchedHoverImage}
                          alt="Preview"
                          fill
                          className="object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                      <p className="text-xs text-neutral-600 break-all font-medium bg-white/60 px-3 py-1.5 rounded-lg border border-[var(--admin-neutral-gray)]/40">{watchedHoverImage}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="p-4 rounded-xl bg-[var(--admin-lavender)]/20 mb-3">
                        <ImageIcon className="h-8 w-8 text-neutral-600 mx-auto" />
                      </div>
                      <p className="text-sm text-neutral-600 font-medium">Kéo thả hoặc click để tải ảnh</p>
                    </div>
                  )}
                </div>
                {/* Input */}
                <Input
                  id="hoverImage"
                  {...register('hoverImage')}
                  placeholder="/path/to/hover-image.jpg"
                  disabled={readOnly}
                  className="h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 text-sm focus:border-[var(--admin-lavender)] focus:ring-2 focus:ring-[var(--admin-lavender)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
                />
                {errors.hoverImage && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.hoverImage.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classification */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <SectionHeader
          icon={<Tag className="h-5 w-5 text-neutral-800" />}
          title="Phân loại"
          color="lavender"
        />
        <div className="p-6">
          <Label className="text-sm font-bold text-neutral-900 mb-4 block uppercase tracking-wide">
            Nhu cầu da <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-wrap gap-3">
            {skinNeeds.map(need => {
              const isSelected = watchedNeeds?.includes(need.id)
              return (
                <Button
                  key={need.id}
                  type="button"
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleNeed(need.id)}
                  disabled={readOnly}
                  className={`rounded-xl px-4 py-2 h-10 text-sm font-medium cursor-pointer transition-all border-2 shadow-sm hover:shadow-md ${
                    isSelected
                      ? `bg-gradient-to-r from-[var(--admin-lavender)] to-[var(--admin-beige)] text-neutral-900 border-[var(--admin-lavender)]/50 hover:from-[var(--admin-lavender)]/90 hover:to-[var(--admin-beige)]/90`
                      : 'bg-white text-neutral-700 border-[var(--admin-neutral-gray)]/60 hover:bg-[var(--admin-hover-bg)] hover:border-[var(--admin-lavender)]/50'
                  }`}
                >
                  {need.name}
                  {isSelected && (
                    <X className="h-4 w-4 ml-2" />
                  )}
                </Button>
              )
            })}
          </div>
          {errors.needs && (
            <p className="mt-3 text-sm text-red-600 font-medium">{errors.needs.message}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <SectionHeader
          icon={<FileText className="h-5 w-5 text-neutral-800" />}
          title="Mô tả sản phẩm"
          color="taupe"
        />
        <div className="p-6">
          <RichTextEditor
            content={description}
            onChange={setDescription}
            placeholder="Nhập mô tả sản phẩm..."
            disabled={readOnly}
          />
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <SectionHeader
          icon={<Sparkles className="h-5 w-5 text-neutral-800" />}
          title="Lợi ích"
          color="beige"
        />
        <div className="p-6">
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-3">
                <Input
                  value={benefit}
                  onChange={(e) => handleArrayItemChange(index, e.target.value, benefits, setBenefits, readOnly)}
                  placeholder="Nhập lợi ích..."
                  disabled={readOnly}
                  className="flex-1 h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 text-sm focus:border-[var(--admin-beige)] focus:ring-2 focus:ring-[var(--admin-beige)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBenefit(index)}
                  disabled={readOnly}
                  className="h-12 w-12 rounded-xl bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-300 text-red-600 cursor-pointer transition-all shadow-sm hover:shadow-md"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {!readOnly && (
            <Button
              type="button"
              variant="outline"
              className="w-full mt-4 border-2 border-dashed border-[var(--admin-beige)]/50 rounded-xl text-neutral-700 hover:bg-[var(--admin-hover-bg)] bg-white shadow-sm hover:shadow-md h-12 text-sm font-medium cursor-pointer transition-all"
              onClick={addBenefit}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm lợi ích
            </Button>
          )}
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <SectionHeader
          icon={<FlaskConical className="h-5 w-5 text-neutral-800" />}
          title="Thành phần"
          color="cool-gray"
        />
        <div className="p-6">
          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-3">
                <Input
                  value={ingredient}
                  onChange={(e) => handleArrayItemChange(index, e.target.value, ingredients, setIngredients, readOnly)}
                  placeholder="Nhập thành phần..."
                  disabled={readOnly}
                  className="flex-1 h-12 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 text-sm focus:border-[var(--admin-cool-gray)] focus:ring-2 focus:ring-[var(--admin-cool-gray)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(index)}
                  disabled={readOnly}
                  className="h-12 w-12 rounded-xl bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-300 text-red-600 cursor-pointer transition-all shadow-sm hover:shadow-md"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {!readOnly && (
            <Button
              type="button"
              variant="outline"
              className="w-full mt-4 border-2 border-dashed border-[var(--admin-cool-gray)]/50 rounded-xl text-neutral-700 hover:bg-[var(--admin-hover-bg)] bg-white shadow-sm hover:shadow-md h-12 text-sm font-medium cursor-pointer transition-all"
              onClick={addIngredient}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm thành phần
            </Button>
          )}
        </div>
      </div>

      {/* How to use */}
      <div className="bg-white rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 shadow-sm overflow-hidden">
        <SectionHeader
          icon={<BookOpen className="h-5 w-5 text-neutral-800" />}
          title="Hướng dẫn sử dụng"
          color="lavender"
        />
        <div className="p-6">
          <Textarea
            id="howToUse"
            {...register('howToUse')}
            placeholder="Nhập hướng dẫn sử dụng"
            disabled={readOnly}
            className="h-32 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 bg-white px-4 py-3 text-sm focus:border-[var(--admin-lavender)] focus:ring-2 focus:ring-[var(--admin-lavender)]/20 cursor-pointer transition-all font-medium shadow-sm hover:shadow-md resize-none"
          />
        </div>
      </div>

      {/* Submit buttons */}
      {!readOnly && (
        <div className="flex gap-4 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 rounded-xl border-2 border-[var(--admin-neutral-gray)]/60 text-neutral-700 hover:bg-[var(--admin-hover-bg)] hover:border-[var(--admin-cool-gray)]/70 shadow-sm hover:shadow-md h-12 text-sm font-bold cursor-pointer transition-all"
          >
            <X className="h-4 w-4 mr-2" />
            Hủy
          </Button>
          <Button
            type="submit"
            className="flex-1 gap-2 rounded-xl bg-gradient-to-r from-[var(--admin-beige)] to-[var(--admin-taupe)] hover:from-[var(--admin-beige)]/90 hover:to-[var(--admin-taupe)]/90 text-neutral-900 border-0 shadow-md hover:shadow-lg h-12 text-sm font-bold cursor-pointer transition-all"
          >
            <Save className="h-4 w-4" />
            {product ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      )}
    </form>
  )
}

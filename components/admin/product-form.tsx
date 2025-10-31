'use client'

import { RichTextEditor } from '@/components/rich-text-editor'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getAllCategories, getAllSkinNeeds } from '@/lib/category-service'
import { Product } from '@/lib/product-service'
import { formatVND } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpen, FileText, FlaskConical, Image as ImageIcon, Package, Plus, Save, Sparkles, Tag, Trash2, X } from 'lucide-react'
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
    const currentNeeds = watchedNeeds || []
    const newNeeds = currentNeeds.includes(needId)
      ? currentNeeds.filter(id => id !== needId)
      : [...currentNeeds, needId]
    setValue('needs', newNeeds)
  }

  const categories = getAllCategories().filter(cat => cat.id !== 'all')
  const skinNeeds = getAllSkinNeeds()

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3 bg-neutral-50">
      <Accordion type="multiple" defaultValue={['basic', 'images', 'classification']} className="w-full">
        {/* Basic Information */}
        <AccordionItem value="basic" className="rounded px-3 mb-2 bg-white border border-neutral-200">
          <AccordionTrigger className="hover:no-underline py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-neutral-600" />
              <span className="text-sm font-medium text-neutral-900">Thông tin cơ bản</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-neutral-700 text-sm font-medium">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Nhập tên sản phẩm"
                  disabled={readOnly}
                  className="mt-1.5 bg-white h-9 rounded border border-neutral-300 shadow-none focus:border-neutral-400 focus:outline-none focus:ring-0 text-sm transition-colors"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Tagline */}
              <div>
                <Label htmlFor="tagline" className="text-gray-700 font-medium">
                  Tagline <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tagline"
                  {...register('tagline')}
                  placeholder="Nhập tagline"
                  disabled={readOnly}
                  className="mt-1 bg-white h-11 rounded-md border border-gray-300 shadow-none focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 focus-visible:border-indigo-300 focus-visible:ring-0 transition-colors"
                />
                {errors.tagline && (
                  <p className="mt-1 text-sm text-red-600">{errors.tagline.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price" className="text-gray-700 font-medium">
                  Giá <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="price"
                    type="text"
                    value={priceDisplay}
                    onChange={(e) => {
                      if (readOnly) return
                      const inputValue = e.target.value.replace(/[^\d]/g, '')
                      setPriceDisplay(inputValue)
                      const numValue = parseFloat(inputValue || '0')
                      if (!isNaN(numValue)) {
                        setValue('price', numValue, { shouldValidate: true })
                      }
                    }}
                    onBlur={(e) => {
                      if (readOnly) return
                      const inputValue = e.target.value.replace(/[^\d]/g, '')
                      const numValue = parseFloat(inputValue || '0')
                      if (!isNaN(numValue) && numValue > 0) {
                        const formatted = formatVND(numValue).replace(' đ', '')
                        setPriceDisplay(formatted)
                        setValue('price', numValue, { shouldValidate: true })
                      } else {
                        setPriceDisplay('')
                        setValue('price', 0, { shouldValidate: true })
                      }
                    }}
                    placeholder="Nhập giá (VD: 125000)"
                    disabled={readOnly}
                    className="bg-white h-11 rounded-md border border-gray-300 shadow-none focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 focus-visible:border-indigo-300 focus-visible:ring-0 transition-colors pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">đ</span>
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              {/* Original Price */}
              <div>
                <Label htmlFor="originalPrice" className="text-gray-700 font-medium">Giá gốc</Label>
                <div className="relative mt-1">
                  <Input
                    id="originalPrice"
                    type="text"
                    value={originalPriceDisplay}
                    onChange={(e) => {
                      if (readOnly) return
                      const inputValue = e.target.value.replace(/[^\d]/g, '')
                      setOriginalPriceDisplay(inputValue)
                      const numValue = parseFloat(inputValue || '0')
                      if (!isNaN(numValue)) {
                        setValue('originalPrice', numValue > 0 ? numValue : null, { shouldValidate: true })
                      }
                    }}
                    onBlur={(e) => {
                      if (readOnly) return
                      const inputValue = e.target.value.replace(/[^\d]/g, '')
                      const numValue = parseFloat(inputValue || '0')
                      if (!isNaN(numValue) && numValue > 0) {
                        const formatted = formatVND(numValue).replace(' đ', '')
                        setOriginalPriceDisplay(formatted)
                        setValue('originalPrice', numValue, { shouldValidate: true })
                      } else {
                        setOriginalPriceDisplay('')
                        setValue('originalPrice', null, { shouldValidate: true })
                      }
                    }}
                    placeholder="Nhập giá gốc (VD: 150000)"
                    disabled={readOnly}
                    className="bg-white h-11 rounded-md border border-gray-300 shadow-none focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 focus-visible:border-indigo-300 focus-visible:ring-0 transition-colors pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">đ</span>
                </div>
              </div>

              {/* Discount */}
              <div>
                <Label htmlFor="discount" className="text-gray-700 font-medium">Giảm giá (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  {...register('discount', { valueAsNumber: true })}
                  placeholder="Nhập % giảm giá"
                  disabled={readOnly}
                  className="mt-1 bg-white h-11 rounded-md border border-gray-300 shadow-none focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 focus-visible:border-indigo-300 focus-visible:ring-0 transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-gray-700 font-medium">
                  Danh mục <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  {...register('category')}
                  disabled={readOnly}
                  className="mt-1 h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 outline-none focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 shadow-none transition-colors"
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Images */}
        <AccordionItem value="images" className="rounded-lg px-4 mb-4 shadow-sm bg-white border-0">
          <AccordionTrigger className="hover:no-underline py-4 cursor-pointer">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 " />
              <span className="text-base ">Hình ảnh</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image */}
              <div>
                <Label className="text-gray-700 font-medium">
                  Hình ảnh <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  {/* Preview */}
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] bg-white mb-3">
                    {watch('image') ? (
                      <div className="text-center w-full">
                        <img
                          src={watch('image')}
                          alt="Preview"
                          className="w-full h-auto max-h-[150px] object-contain mx-auto mb-2"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <p className="text-sm text-gray-600 break-all">{watch('image')}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl text-gray-400 mb-2">🖼️</div>
                        <p className="text-sm text-gray-500">Kéo thả hoặc click để tải ảnh</p>
                      </div>
                    )}
                  </div>
                  {/* Input */}
                  <Input
                    id="image"
                    {...register('image')}
                    placeholder="/path/to/image.jpg"
                    disabled={readOnly}
                    className="bg-white h-11 rounded-md border border-gray-300 shadow-none focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 focus-visible:border-indigo-300 focus-visible:ring-0 transition-colors"
                  />
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                  )}
                </div>
              </div>

              {/* Hover Image */}
              <div>
                <Label className="text-gray-700 font-medium">
                  Hình ảnh hover <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  {/* Preview */}
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] bg-white mb-3">
                    {watch('hoverImage') ? (
                      <div className="text-center w-full">
                        <img
                          src={watch('hoverImage')}
                          alt="Preview"
                          className="w-full h-auto max-h-[150px] object-contain mx-auto mb-2"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <p className="text-sm text-gray-600 break-all">{watch('hoverImage')}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-4xl text-gray-400 mb-2">🖼️</div>
                        <p className="text-sm text-gray-500">Kéo thả hoặc click để tải ảnh</p>
                      </div>
                    )}
                  </div>
                  {/* Input */}
                  <Input
                    id="hoverImage"
                    {...register('hoverImage')}
                    placeholder="/path/to/hover-image.jpg"
                    disabled={readOnly}
                    className="bg-white h-11 rounded-md border border-gray-300 shadow-none focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 focus-visible:border-indigo-300 focus-visible:ring-0 transition-colors"
                  />
                  {errors.hoverImage && (
                    <p className="mt-1 text-sm text-red-600">{errors.hoverImage.message}</p>
                  )}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Classification */}
        <AccordionItem value="classification" className="rounded-lg px-4 mb-4 shadow-sm bg-white border-0">
          <AccordionTrigger className="hover:no-underline py-4 cursor-pointer">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 " />
              <span className="text-base ">Phân loại</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {skinNeeds.map(need => (
                  <Button
                    key={need.id}
                    type="button"
                    variant={watchedNeeds?.includes(need.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleNeed(need.id)}
                    disabled={readOnly}
                    className={watchedNeeds?.includes(need.id)
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-0 rounded-md px-3 py-1 h-8 text-sm font-normal cursor-pointer'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-md px-3 py-1 h-8 text-sm font-normal shadow-none cursor-pointer'}
                  >
                    {need.name}
                    {watchedNeeds?.includes(need.id) && (
                      <X className="h-3 w-3 ml-1.5" />
                    )}
                  </Button>
                ))}
              </div>
              {errors.needs && (
                <p className="mt-1 text-sm text-red-600">{errors.needs.message}</p>
              )}
          </AccordionContent>
        </AccordionItem>

        {/* Description */}
        <AccordionItem value="description" className="rounded-lg px-4 mb-4 shadow-sm bg-white border-0">
          <AccordionTrigger className="hover:no-underline py-4 cursor-pointer">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 " />
              <span className="text-base ">Mô tả sản phẩm</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
              <RichTextEditor
                  content={description}
                  onChange={setDescription}
                  placeholder="Nhập mô tả sản phẩm..."
                  disabled={readOnly}
                />
          </AccordionContent>
        </AccordionItem>

        {/* Benefits */}
        <AccordionItem value="benefits" className="rounded-lg px-4 mb-4 shadow-sm bg-white border-0">
          <AccordionTrigger className="hover:no-underline py-4 cursor-pointer">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 " />
              <span className="text-base ">Lợi ích</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => {
                        if (readOnly) return
                        const newBenefits = [...benefits]
                        newBenefits[index] = e.target.value
                        setBenefits(newBenefits)
                      }}
                      placeholder="Nhập lợi ích..."
                      disabled={readOnly}
                      className="bg-white h-11 rounded-md border border-gray-300 shadow-none focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 focus-visible:border-indigo-300 focus-visible:ring-0 transition-colors"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBenefit(index)}
                      disabled={readOnly}
                      className="text-gray-600 hover:text-gray-800 h-11 w-11 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-3 border border-dashed border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 bg-white shadow-none cursor-pointer"
                onClick={addBenefit}
                disabled={readOnly}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm lợi ích
              </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Ingredients */}
        <AccordionItem value="ingredients" className="rounded-lg px-4 mb-4 shadow-sm bg-white border-0">
          <AccordionTrigger className="hover:no-underline py-4 cursor-pointer">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 " />
              <span className="text-base ">Thành phần</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={ingredient}
                      onChange={(e) => {
                        if (readOnly) return
                        const newIngredients = [...ingredients]
                        newIngredients[index] = e.target.value
                        setIngredients(newIngredients)
                      }}
                      placeholder="Nhập thành phần..."
                      disabled={readOnly}
                      className="bg-white h-11 rounded-md border border-gray-300 shadow-none focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 focus-visible:border-indigo-300 focus-visible:ring-0 transition-colors"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                      disabled={readOnly}
                      className="text-gray-600 hover:text-gray-800 h-11 w-11 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-3 border border-dashed border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 bg-white shadow-none cursor-pointer"
                onClick={addIngredient}
                disabled={readOnly}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm thành phần
              </Button>
          </AccordionContent>
        </AccordionItem>

        {/* How to use */}
        <AccordionItem value="usage" className="rounded-lg px-4 mb-4 shadow-sm bg-white border-0">
          <AccordionTrigger className="hover:no-underline py-4 cursor-pointer">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 " />
              <span className="text-base ">Hướng dẫn sử dụng</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
              <Textarea
                id="howToUse"
                {...register('howToUse')}
                placeholder="Nhập hướng dẫn sử dụng"
                disabled={readOnly}
                className="mt-1 bg-white rounded-md border border-gray-300 focus:border-indigo-300 focus:bg-indigo-50/30 focus:outline-none focus:ring-0 focus-visible:border-indigo-300 focus-visible:ring-0 shadow-none transition-colors"
                rows={4}
              />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

          {/* Submit buttons */}
      {!readOnly && (
        <div className="flex gap-2 pt-4 border-t border-neutral-200 sticky bottom-0 bg-neutral-50 z-10 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="rounded border-neutral-300 text-neutral-700 hover:bg-neutral-100 shadow-none cursor-pointer h-9 px-4 text-sm"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            className="gap-2 rounded bg-neutral-900 hover:bg-neutral-800 text-white border-0 shadow-none cursor-pointer h-9 px-4 text-sm"
          >
            <Save className="h-3.5 w-3.5" />
            {product ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </div>
      )}
    </form>
  )
}

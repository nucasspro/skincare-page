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
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpen, FileText, FlaskConical, Image as ImageIcon, Package, Plus, Save, Sparkles, Tag, Trash2 } from 'lucide-react'
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
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [description, setDescription] = useState('')
  const [benefits, setBenefits] = useState<string[]>([''])
  const [ingredients, setIngredients] = useState<string[]>([''])

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

  // Load product data when editing
  useEffect(() => {
    if (product) {
      setDescription(product.description || '')
      setBenefits(product.benefits && product.benefits.length > 0 ? product.benefits : [''])
      setIngredients(product.ingredients && product.ingredients.length > 0 ? product.ingredients : [''])

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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 bg-white">
      <Accordion type="multiple" defaultValue={['basic', 'images', 'classification']} className="w-full">
        {/* Basic Information */}
        <AccordionItem value="basic" className="border rounded-lg px-4 mb-4 shadow-sm bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-600" />
              <span className="text-base font-semibold">Thông tin cơ bản</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  className="mt-1 bg-white h-11 rounded-none"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Tagline */}
              <div>
                <Label htmlFor="tagline">
                  Tagline <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tagline"
                  {...register('tagline')}
                  className="mt-1 bg-white h-11 rounded-none"
                />
                {errors.tagline && (
                  <p className="mt-1 text-sm text-red-600">{errors.tagline.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price">
                  Giá <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className="mt-1 bg-white h-11 rounded-none"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              {/* Original Price */}
              <div>
                <Label htmlFor="originalPrice">Giá gốc</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  {...register('originalPrice', { valueAsNumber: true })}
                  className="mt-1 bg-white h-11 rounded-none"
                />
              </div>

              {/* Discount */}
              <div>
                <Label htmlFor="discount">Giảm giá (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  step="0.01"
                  {...register('discount', { valueAsNumber: true })}
                  className="mt-1 bg-white h-11 rounded-none"
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">
                  Danh mục <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  {...register('category')}
                  className="mt-1 h-11 w-full rounded-none border border-input bg-white px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
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
        <AccordionItem value="images" className="border rounded-lg px-4 mb-4 shadow-sm bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gray-600" />
              <span className="text-base font-semibold">Hình ảnh</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Image */}
              <div>
                <Label>
                  Hình ảnh <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  {/* Preview */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] bg-white mb-3">
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
                    className="bg-white h-11 rounded-none"
                  />
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                  )}
                </div>
              </div>

              {/* Hover Image */}
              <div>
                <Label>
                  Hình ảnh hover <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  {/* Preview */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] bg-white mb-3">
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
                    className="bg-white h-11 rounded-none"
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
        <AccordionItem value="classification" className="border rounded-lg px-4 mb-4 shadow-sm bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-600" />
              <span className="text-base font-semibold">Phân loại</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <Label>
                Nhu cầu da <span className="text-red-500">*</span>
              </Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {skinNeeds.map(need => (
                  <Button
                    key={need.id}
                    type="button"
                    variant={watchedNeeds?.includes(need.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleNeed(need.id)}
                  >
                    {need.name}
                  </Button>
                ))}
              </div>
              {errors.needs && (
                <p className="mt-1 text-sm text-red-600">{errors.needs.message}</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Description */}
        <AccordionItem value="description" className="border rounded-lg px-4 mb-4 shadow-sm bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-600" />
              <span className="text-base font-semibold">Mô tả sản phẩm</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <Label>Mô tả</Label>
              <div className="mt-2">
                <RichTextEditor
                  content={description}
                  onChange={setDescription}
                  placeholder="Nhập mô tả sản phẩm..."
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Benefits */}
        <AccordionItem value="benefits" className="border rounded-lg px-4 mb-4 shadow-sm bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gray-600" />
              <span className="text-base font-semibold">Lợi ích</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <Label>Lợi ích</Label>
              <div className="mt-2 space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => {
                        const newBenefits = [...benefits]
                        newBenefits[index] = e.target.value
                        setBenefits(newBenefits)
                      }}
                      placeholder="Nhập lợi ích..."
                      className="bg-white h-11 rounded-none"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBenefit(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-3 border-2 border-dashed rounded-sm"
                onClick={addBenefit}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm lợi ích
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Ingredients */}
        <AccordionItem value="ingredients" className="border rounded-lg px-4 mb-4 shadow-sm bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-gray-600" />
              <span className="text-base font-semibold">Thành phần</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <Label>Thành phần</Label>
              <div className="mt-2 space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={ingredient}
                      onChange={(e) => {
                        const newIngredients = [...ingredients]
                        newIngredients[index] = e.target.value
                        setIngredients(newIngredients)
                      }}
                      placeholder="Nhập thành phần..."
                      className="bg-white h-11 rounded-none"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-3 border-2 border-dashed rounded-sm"
                onClick={addIngredient}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm thành phần
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* How to use */}
        <AccordionItem value="usage" className="border rounded-lg px-4 mb-4 shadow-sm bg-white">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-600" />
              <span className="text-base font-semibold">Hướng dẫn sử dụng</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <Label htmlFor="howToUse">Cách sử dụng</Label>
              <Textarea
                id="howToUse"
                {...register('howToUse')}
                className="mt-1 bg-white rounded-none"
                rows={4}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Submit buttons */}
      <div className="flex gap-4 pt-4 border-t sticky bottom-0 bg-white z-10 justify-end">
        <Button type="button" variant="outline" onClick={onCancel} className="rounded-sm">
          Hủy
        </Button>
        <Button type="submit" variant="outline" className="gap-2 rounded-sm">
          <Save className="h-4 w-4" />
          {product ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </div>
    </form>
  )
}

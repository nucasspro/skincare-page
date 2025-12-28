"use client";

import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import { MontserratFont, QuicksandFont } from '../../fonts';

interface BenefitsContainerProps {
    items: Array<{ imageSrc: string; text: string }>
    backgroundImage: string
}

function BenefitsContainer({ items, backgroundImage }: BenefitsContainerProps) {
    return (
        <div className="relative rounded-[3rem] md:p-10 space-y-16 mb-10">
            <div className="hidden md:block absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt=""
                    fill
                    // className="object-cover"
                    style={{ transform: 'scale(2.15)' }}
                    quality={100}
                    unoptimized
                />
            </div>
            <div className="relative z-10">
                {items.map((item, index) => (
                    <BenefitItem key={index} imageSrc={item.imageSrc} text={item.text} />
                ))}
            </div>
        </div>
    )
}

interface BenefitItemProps {
    imageSrc: string
    text: string
}

function BenefitItem({ imageSrc, text }: BenefitItemProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center max-w-full md:max-w-[90%] mx-auto my-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                    src={imageSrc}
                    alt=""
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    quality={100}
                    unoptimized
                />
            </div>
            <p className="text-body-subtitle text-center md:text-left leading-relaxed px-4 md:px-0 md:pr-30">
                {text}
            </p>
        </div>
    )
}

interface StepProps {
    imageSrc: string
    alt: string
    text: string
}

function Step({ imageSrc, alt, text }: StepProps) {
    return (
        <div className="flex flex-col items-center justify-start h-full flex-1">
            <div className="flex-shrink-0 w-full">
                <Image
                    src={imageSrc}
                    alt={alt}
                    quality={100}
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain"
                    unoptimized
                />
            </div>
            <p className="text-body md:mt-4 text-center flex-grow w-full">{text}</p>
        </div>
    )
}

interface StarRatingProps {
    rating: number
    maxRating?: number
    size?: number
}

function StarRating({ rating, maxRating = 5, size = 16 }: StarRatingProps) {
    const stars = []
    for (let i = 0; i < maxRating; i++) {
        const starValue = i + 1
        if (starValue <= Math.floor(rating)) {
            // Full star
            stars.push(
                <Star key={i} className="fill-current text-amber-400" style={{ width: size, height: size }} />
            )
        } else if (starValue - 0.5 <= rating) {
            // Half star
            stars.push(
                <div key={i} className="relative inline-block" style={{ width: size, height: size }}>
                    <Star className="text-amber-400" style={{ width: size, height: size }} />
                    <div
                        className="absolute left-0 top-0 overflow-hidden"
                        style={{
                            width: '50%',
                            height: '100%',
                            clipPath: 'inset(0 50% 0 0)'
                        }}
                    >
                        <Star className="fill-current text-amber-400" style={{ width: size, height: size }} />
                    </div>
                </div>
            )
        } else {
            // Empty star
            stars.push(
                <Star key={i} className="text-amber-400" style={{ width: size, height: size }} />
            )
        }
    }
    return <div className="flex gap-1">{stars}</div>
}

interface ReviewCardProps {
    rating: number
    review: string
    author: string
    date: string
}

function ReviewCard({ rating, review, author, date }: ReviewCardProps) {
    return (
        <div className="bg-white p-8 rounded-lg border border-slate-100 flex flex-col flex-1 min-h-[300px]">
            <div className="mb-4">
                <StarRating rating={rating} size={16} />
            </div>
            <p className="text-body-subtitle mb-6 flex-grow text-left">
                {review}
            </p>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-4 gap-2 md:gap-0">
                <span className="text-body-subtitle !font-semibold text-left">{author}</span>
                <span className="text-body-subtitle text-left md:text-right">{date}</span>
            </div>
        </div>
    )
}

interface StatsBarItemProps {
    label: string
    percentage: number
    color: string
    index: number
    hoveredIndex: number | null
    hoveredPart: 'percentage1' | 'percentage2' | null
    onMouseEnterPercentage1: () => void
    onMouseLeavePercentage1: () => void
    onMouseEnterPercentage2: () => void
    onMouseLeavePercentage2: () => void
    value1: number
    percentage1: number
    value2: number
    percentage2: number
}

function StatsBarItem({ label, percentage, color, index, hoveredIndex, hoveredPart, onMouseEnterPercentage1, onMouseLeavePercentage1, onMouseEnterPercentage2, onMouseLeavePercentage2, value1, percentage1, value2, percentage2 }: StatsBarItemProps) {
    const isHovered = hoveredIndex === index
    const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index
    const opacity = isOtherHovered ? 0.3 : 1
    const isHoveredPercentage1 = isHovered && hoveredPart === 'percentage1'
    const isHoveredPercentage2 = isHovered && hoveredPart === 'percentage2'
    // When hovering percentage 2, reduce opacity of percentage 1
    const percentage1Opacity = isHoveredPercentage2 ? 0.3 : 1

    return (
        <div className="flex items-center gap-4">
            <span
                className="text-slate-500 whitespace-nowrap flex-shrink-0 w-24 text-right"
                style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}
            >
                {label}
            </span>
            <div
                className="flex-1 h-16 bg-slate-200/50 relative transition-opacity duration-200"
                style={{ opacity }}
            >
                {/* Vertical grid lines */}
                {[20, 40, 60, 80].map((mark) => (
                    <div
                        key={mark}
                        className="absolute top-0 bottom-0 w-px bg-slate-300/50"
                        style={{ left: `${mark}%` }}
                    ></div>
                ))}

                {/* Percentage 1 bar (main bar) */}
                <div
                    className="absolute top-0 left-0 h-full transition-opacity duration-200 z-10 cursor-pointer"
                    style={{ width: `${percentage1}%`, backgroundColor: color, opacity: percentage1Opacity }}
                    onMouseEnter={onMouseEnterPercentage1}
                    onMouseLeave={onMouseLeavePercentage1}
                ></div>

                {/* Percentage 2 bar (remaining part) */}
                <div
                    className="absolute top-0 left-0 h-full transition-all duration-200 z-10 cursor-pointer"
                    style={{
                        left: `${percentage1}%`,
                        width: `${percentage2}%`,
                        backgroundColor: isHoveredPercentage2 ? '#cbd5e1' : '#e2e8f0',
                        borderLeft: '0.5px solid #cbd5e1'
                    }}
                    onMouseEnter={onMouseEnterPercentage2}
                    onMouseLeave={onMouseLeavePercentage2}
                ></div>

                {/* Tooltip for percentage 1 */}
                {isHoveredPercentage1 && (
                    <div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:left-full md:translate-x-0 md:ml-3 bg-gray-700 text-white px-3 py-2 md:px-3 md:py-2 rounded-lg text-sm md:text-sm whitespace-nowrap z-20"
                        style={{
                            left: `${percentage1}%`,
                            maxWidth: 'calc(100vw - 2rem)',
                        }}
                    >
                        <div className="font-semibold">{label}:</div>
                        <div className="text-xs md:text-xs">{value1} ({percentage1.toFixed(1)}%)</div>
                        <div
                            className="absolute top-full left-1/2 -translate-x-1/2 md:top-1/2 md:left-0 md:translate-x-0 md:-translate-y-1/2 -mt-[2px] md:mt-0 md:-ml-[2px] border-[3px] border-transparent border-t-gray-700 md:border-t-transparent md:border-r-gray-700"
                        ></div>
                    </div>
                )}

                {/* Tooltip for percentage 2 */}
                {isHoveredPercentage2 && (
                    <div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:left-full md:translate-x-0 md:ml-3 bg-gray-700 text-white px-3 py-2 md:px-3 md:py-2 rounded-lg text-sm md:text-sm whitespace-nowrap z-20"
                        style={{
                            left: `${percentage1 + percentage2}%`,
                            maxWidth: 'calc(100vw - 2rem)',
                        }}
                    >
                        <div className="font-semibold">{label}:</div>
                        <div className="text-xs md:text-xs">{value2} ({percentage2.toFixed(1)}%)</div>
                        <div
                            className="absolute top-full left-1/2 -translate-x-1/2 md:top-1/2 md:left-0 md:translate-x-0 md:-translate-y-1/2 -mt-[2px] md:mt-0 md:-ml-[2px] border-[3px] border-transparent border-t-gray-700 md:border-t-transparent md:border-r-gray-700"
                        ></div>
                    </div>
                )}
            </div>
        </div>
    )
}

interface StatsGraphProps {
    items: Array<{ label: string; percentage: number; color: string; value1: number; percentage1: number; value2: number; percentage2: number }>
}

function StatsGraph({ items }: StatsGraphProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [hoveredPart, setHoveredPart] = useState<'percentage1' | 'percentage2' | null>(null)

    return (
        <div className="w-full md:w-[80%] mx-auto">
            <div className="space-y-4">
                {items.map((item, index) => (
                    <StatsBarItem
                        key={index}
                        label={item.label}
                        percentage={item.percentage}
                        color={item.color}
                        index={index}
                        hoveredIndex={hoveredIndex}
                        hoveredPart={hoveredPart}
                        onMouseEnterPercentage1={() => {
                            setHoveredIndex(index)
                            setHoveredPart('percentage1')
                        }}
                        onMouseLeavePercentage1={() => {
                            setHoveredIndex(null)
                            setHoveredPart(null)
                        }}
                        onMouseEnterPercentage2={() => {
                            setHoveredIndex(index)
                            setHoveredPart('percentage2')
                        }}
                        onMouseLeavePercentage2={() => {
                            setHoveredIndex(null)
                            setHoveredPart(null)
                        }}
                        value1={item.value1}
                        percentage1={item.percentage1}
                        value2={item.value2}
                        percentage2={item.percentage2}
                    />
                ))}
                {/* Axis */}
                <div className="flex pl-28 text-xs text-slate-500 justify-between pt-2">
                    <span className="rotate-[-40deg] md:rotate-0" style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>0%</span>
                    <span className="hidden md:inline" style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>20%</span>
                    <span className="rotate-[-40deg] md:rotate-0" style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>40%</span>
                    <span className="hidden md:inline" style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>60%</span>
                    <span className="rotate-[-40deg] md:rotate-0" style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>80%</span>
                    <span className="hidden md:inline" style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>100%</span>
                </div>
            </div>
        </div>
    )
}

export default function LandingPage() {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  return (
    <main className={`w-full min-h-screen bg-gradient-to-b from-white via-[#DDECFA] to-white text-black text-base leading-relaxed ${MontserratFont.variable} overflow-y-scroll overflow-x-hidden snap-y snap-mandatory` }>
      {/* Section 1: Hero */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center snap-center z-10">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Image
            src="/landing-page/PAGE 1/1.png"
            alt="Hero background"
            fill
            className="object-cover object-center"
            quality={100}
            unoptimized
            priority
          />
        </div>
        <div className="relative z-10 w-full h-screen flex flex-col items-center justify-start pt-[100px] px-10 pb-0">
          <div className="text-center w-full max-w-[1200px] order-1">
            <h1 className="text-heading-2 mb-5">
              CELLIC<br />
              BRIGHT MATTE SUNCREEN
            </h1>
            <p className="text-body-large mt-4 !leading-[1.1]">
              <strong>X10</strong> HIỆU QUẢ CHỐNG NẮNG - TÁI TẠO PHỤC HỒI DA
            </p>
          </div>
          <div className="flex items-end justify-center w-full max-w-[650px] order-2 mt-auto pb-0">
            <Image
              src="/landing-page/PAGE 1/2.png"
              alt="Cellic Bright Matte Sunscreen"
              width={800}
              height={1000}
              className="w-full h-full max-h-[70vh] object-contain object-center"
              quality={100}
              unoptimized
              priority
            />
          </div>
        </div>
      </section>

      {/* Section 2: New Generation Sunscreen */}
      <section className="w-full min-h-screen py-[120px] px-10 flex items-center justify-center snap-center">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center gap-20">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-heading-2">KEM CHỐNG NẮNG THẾ HỆ MỚI</h2>
            <p className="text-body-large">THẤU HIỂU VÀ ĐỒNG HÀNH CÙNG LÀN DA VIỆT</p>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
            <div className="flex-none flex flex-col gap-6 md:gap-10 text-center order-1 md:order-none">
              <p className="text-[20px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2]">4 MÀNG LỌC<br />THẾ HỆ MỚI</p>
              <p className="text-[20px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2]">PDRN</p>
              <p className="text-[20px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2]">LÀNH TÍNH<br />DỊU NHẸ</p>
            </div>
            <div className="relative flex-none flex items-center justify-center w-[300px] h-[300px] md:w-[550px] md:h-[550px] order-2 md:order-none">
              <Image
                src="/landing-page/PAGE 2/8.png"
                alt="Water background"
                width={600}
                height={600}
                className="absolute w-full h-full object-contain z-[1]"
                quality={100}
                unoptimized
              />
              <Image
                src="/landing-page/PAGE 2/9.png"
                alt="Cellic Sunscreen Tube"
                width={400}
                height={600}
                className="absolute w-[70%] h-auto object-contain z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[8deg]"
                quality={100}
                unoptimized
              />
            </div>
            <div className="flex-none flex flex-col gap-6 md:gap-10 text-center order-3 md:order-none">
              <p className="text-[20px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2]">KIỀM DẦU SUỐT 8H</p>
              <p className="text-[20px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2]">NÂNG TONE<br />TỰ NHIÊN</p>
              <p className="text-[20px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2]">PHỤC HỒI<br />TỔN THƯƠNG</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 3-Layer Protection */}
      <section className="landing__three-layer w-full min-h-screen py-[120px] px-10 flex items-center justify-center snap-y snap-mandatory">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
          {/* Title */}
          <h2 className="text-heading-2 mb-10 text-center">TÍNH NĂNG BẢO VỆ 3 LỚP TOÀN DIỆN</h2>

          {/* Numbered List */}
          <div className="flex flex-col gap-5 w-full max-w-[900px] mt-10">
            <p className="text-body-large !font-bold">1. Bảo vệ da trước tác động của tia UVA, UVB, HEV</p>
            <p className="text-body-large !font-bold">2. Bảo vệ khỏi tác động từ ô nhiễm môi trường và bụi mịn</p>
            <p className="text-body-large !font-bold">3. Bảo vệ song song nuôi dưỡng hệ vi sinh</p>
          </div>

          {/* CTA Button */}
          <Link href="/" className="mb-10 mt-6 relative group w-[200px] h-[48px] md:w-[20.8vw] md:h-[3.9vw] rounded-full bg-[#CFE5F5] border-[2px] md:border-[0.14vw] border-[#2F5C91] shadow-lg overflow-hidden transition-transform flex items-center justify-center">
              <div className="absolute inset-[2px] md:inset-[0.2vw] border-[2px] md:border-[0.14vw] border-white rounded-full pointer-events-none"></div>
              <span className="relative z-10 text-body-large !font-bold">
                  Xem thêm
              </span>
          </Link>

          {/* Model Image */}
          { /* TODO: longdang - Dung sai hinh */}
          <div className="w-full flex justify-center">
            <Image
              src="/landing-page/PAGE 3/20.png"
              alt="Model with Cellic sunscreen"
              width={600}
              height={800}
              className="w-full max-w-[600px] h-auto object-contain"
              quality={100}
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Section 4: Ingredients */}
      <section className="landing__ingredients w-full min-h-screen py-[120px] px-10 flex items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-[1600px] mx-auto relative flex flex-col md:block">
          {/* Flex container with two columns */}
          <div className="flex relative order-1 md:order-none justify-center md:justify-start">
            <div className="basis-1/5 flex-shrink-0 hidden md:block"></div>
            <div className="w-full md:basis-4/5 flex-shrink-0 relative md:w-auto">

              {/* Background Card */}
              <div className="bg-gradient-to-b from-[#D4E2EA] to-[#E9F2F6] rounded-[40px] md:rounded-[60px] p-6 md:p-12 flex relative z-0 justify-center md:justify-start">
                <div className="basis-1/3 flex-shrink-0 hidden md:block"></div>
                <div className="w-full md:basis-2/3 flex-shrink-0 flex flex-col gap-6 md:gap-8 md:w-auto text-center md:text-left">
                  <h2 className="text-heading-2">THÀNH PHẦN</h2>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[24px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2] flex-1">MÀNG LỌC CHỐNG NẮNG HIỆN ĐẠI</h3>
                    <div className="flex flex-col gap-2">
                      <p className="text-body text-[#6BA3C7]">Ultrafine Titanium Dioxide, Nano Zinc Oxide, Uvinul A Plus, Octinoxate</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[24px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2] flex-1">PDRN THỰC VẬT</h3>
                    <p className="text-body text-[#6BA3C7]">
                      Từ nguyên liệu rau má giúp phục hồi và tái tạo da. Hoa oải hương và kim ngân hoa giúp kháng viêm, giảm kích ứng.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[24px] md:text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2] flex-1">PROPANEDIOL</h3>
                    <p className="text-body text-[#6BA3C7]">
                      Có độ tinh khiết cao và mang lại hiệu quả bền vững
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Image - on bottom on mobile, absolute on desktop */}
          <div className="relative md:absolute md:-left-28 md:top-1/2 md:-translate-y-1/2 z-10 max-w-[300px] md:w-[50%] md:max-w-none flex items-center justify-center mx-auto md:mx-0 mt-6 md:mt-0 order-2 md:order-none">
            <Image
              src="/landing-page/PAGE 4/product.png"
              alt="Cellic sunscreen products"
              width={800}
              height={1000}
              className="w-full h-auto object-contain"
              quality={100}
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Section 5: PDRN - Có thể bạn chưa biết? */}
      <section className="landing__pdrn w-full py-[120px] px-10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-12">
          {/* Section Title */}
          <h2 className="text-heading-2 text-center">PDRN - CÓ THỂ BẠN CHƯA BIẾT?</h2>

          {/* Row 1: Image LEFT, Text RIGHT */}
          <div className="w-full flex flex-col md:flex-row overflow-hidden bg-gradient-to-b from-[#8ACBE2] to-[#A2D6E6]">
            <div className="w-full md:w-1/3 h-[200px] md:h-[300px] flex-shrink-0 order-1 md:order-none">
              <Image
                src="/landing-page/PAGE 5/31.png"
                alt="PDRN information"
                width={400}
                height={300}
                className="w-full h-full object-cover"
                quality={100}
                unoptimized
              />
            </div>
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center order-2 md:order-none">
              <h3 className="text-body !font-semibold mb-4">Hỗ trợ tái tạo tế bào da</h3>
              <p className="text-body">
                PDRN giúp kích thích quá trình tái tạo tế bào da, làm lành các tổn thương và cải thiện kết cấu da từ bên trong.
              </p>
            </div>
          </div>

          {/* Row 2: Text LEFT, Image RIGHT */}
          <div className="w-full flex flex-col md:flex-row overflow-hidden bg-gradient-to-b from-[#8ACBE2] to-[#A2D6E6]">
            <div className="w-full md:w-1/3 h-[200px] md:h-[300px] flex-shrink-0 order-1 md:order-2">
              <Image
                src="/landing-page/PAGE 5/32.png"
                alt="PDRN benefits"
                width={400}
                height={300}
                className="w-full h-full object-cover"
                quality={100}
                unoptimized
              />
            </div>
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center order-2 md:order-1">
              <h3 className="text-body !font-semibold mb-4">Cải thiện độ đàn hồi</h3>
              <p className="text-body">
                Thành phần PDRN giúp tăng cường sản xuất collagen và elastin, mang lại làn da săn chắc và đàn hồi hơn.
              </p>
            </div>
          </div>

          {/* Row 3: Image LEFT, Text RIGHT */}
          <div className="w-full flex flex-col md:flex-row overflow-hidden bg-gradient-to-b from-[#8ACBE2] to-[#A2D6E6]">
            <div className="w-full md:w-1/3 h-[200px] md:h-[300px] flex-shrink-0 order-1 md:order-none">
              <Image
                src="/landing-page/PAGE 5/33.png"
                alt="PDRN protection"
                width={400}
                height={300}
                className="w-full h-full object-cover"
                quality={100}
                unoptimized
              />
            </div>
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center order-2 md:order-none">
              <h3 className="text-body !font-semibold mb-4">Bảo vệ da khỏi tác hại môi trường</h3>
              <p className="text-body">
                PDRN tạo lớp bảo vệ tự nhiên, giúp da chống lại các tác động từ môi trường và duy trì độ ẩm cần thiết.
              </p>
            </div>
          </div>
        </div>
      </section>




      <section className="py-[120px] px-10">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-[1.1vw] text-center">

          {/* Background Image */}
          <div className="hidden md:block absolute inset-0 z-0">
              <Image
                  src="/landing-page/PAGE 6/BACKGROUND.png"
                  alt=""
                  fill
                  className="object-cover"
                  quality={100}
                  unoptimized
              />
          </div>

            <div className="max-w-full md:max-w-[100vw] mx-auto px-0 md:px-[1.1vw] relative z-10">
              {/* Container with 3C, Header and BenefitsContainer - All same width */}
              <div className="max-w-full md:max-w-[100vw] relative">
                {/* Large "3C" - On top, hidden on mobile */}
                <div className="hidden md:block absolute top-[5.5vw] left-[-2vw] text-[#3a76a5] leading-none select-none pointer-events-none z-20" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: '17.7vw' }}>
                    3
                </div>
                <div className="hidden md:block absolute top-[8.8vw] left-[8vw] text-[#3a76a5] leading-none select-none pointer-events-none z-20" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: '9vw' }}>
                    C
                </div>

                {/* Header - On top, below 3C */}
                <div className="relative z-20 mb-6 md:mb-[4.4vw] pt-0 md:pt-[8.8vw] md:top-[1.1vw] md:left-[15.2vw]">
                    <h2 className="text-heading-2 text-center md:text-left">
                        <span className="md:hidden">3C CÔNG DỤNG "KHÔNG TƯỞNG" CỦA CELLIC MATTE SUNSCREEN</span>
                        <span className="hidden md:block">
                            <span className="text-body-large text-[#2F5C91]">ÔNG DỤNG "KHÔNG TƯỞNG"</span>
                            <br />
                            <span className="text-body-large !font-bold text-[#2F5C91]">CỦA CELLIC MATTE SUNSCREEN</span>
                        </span>
                    </h2>
                </div>

                {/* BenefitsContainer - Background below */}
                <BenefitsContainer
                    backgroundImage="/landing-page/PAGE 6/35.png"
                    items={[
                        {
                            imageSrc: "/landing-page/PAGE 6/36.png",
                            text: "Chống nắng đạt chuẩn SPF 50+ PA++++, kiềm dầu suốt 8h và cân bằng hệ vi sinh da, duy trì hàng rào bảo vệ tự nhiên."
                        },
                        {
                            imageSrc: "/landing-page/PAGE 6/37.png",
                            text: "Hiệu ứng soft focus, che phủ khuyết điểm nhẹ nhàng và nâng tone mịn đẹp."
                        },
                        {
                            imageSrc: "/landing-page/PAGE 6/38.png",
                            text: "Công thức chứa PDRN thực vật củng cố và giúp da được nuôi dưỡng ở cấp độ tế bào trong 1 bước chống nắng.  "
                        }
                    ]}
                />
              </div>
            </div>
        </div>
      </section>

      {/* Section 7: Deep Protection & Nourishment */}
      <section className="landing__deep-protection w-full py-[120px] px-10">
        <div className="w-full max-w-[1400px] mx-auto relative">
          {/* Floating mask image - positioned above and to the left of card */}
          <div className="hidden md:block absolute -top-34 -left-34 z-10 w-[500px] h-auto">
            <Image
              src="/landing-page/PAGE 7/42.png"
              alt="Floating mask"
              width={600}
              height={700}
              className="w-full h-auto object-contain"
              quality={100}
              unoptimized
            />
          </div>

          {/* Main card */}
          <div className="relative bg-[#E1F5FF] rounded-[40px] p-6 md:p-12 mt-8 md:mt-32 flex flex-col md:flex-row">
            {/* Left column - 40% for big title */}
            <div className="basis-2/5 flex-shrink-0 flex items-center justify-center order-1 md:order-none mb-6 md:mb-0">
              <h2 className="text-heading-2 text-center">
                <span className="md:hidden">BẢO VỆ CHUYÊN SÂU VÀ NUÔI DƯỠNG CHỈ TRONG 1 BƯỚC</span>
                <span className="hidden md:block">
                  BẢO VỆ<br />
                  CHUYÊN SÂU VÀ<br />
                  NUÔI DƯỠNG<br />
                  CHỈ TRONG<br />
                  1 BƯỚC
                </span>
              </h2>
            </div>

            {/* Right column - 60% for detailed content */}
            <div className="basis-3/5 flex-shrink-0 flex flex-col gap-6 md:gap-8 pl-0 md:pl-8 order-2 md:order-none text-left">
              <div className="flex flex-col gap-4">
                <h3 className="text-body !font-bold">
                  4 MÀNG LỌC CHỐNG NẮNG HIỆN ĐẠI
                </h3>
                <p className="text-body">
                  Với 2 màng lọc <strong>Ultrafine Titanium Dioxide & Nano Zinc Oxide</strong> chống nắng thế hệ mới mang lại hiệu quả bảo vệ đa tầng
                </p>
                <div className="flex flex-col">
                  <div className="flex gap-3 items-start">
                    <span className="text-body font-bold flex-shrink-0">1.</span>
                    <p className="text-body flex-1">Bảo vệ da trước tác động của tia UVA, UVB, HEV.</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-body font-bold flex-shrink-0">2.</span>
                    <p className="text-body flex-1">Bảo vệ khỏi tác động từ ô nhiễm môi trường và bụi mịn</p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-body font-bold flex-shrink-0">3.</span>
                    <p className="text-body flex-1">Bảo vệ song song nuôi dưỡng hệ vi sinh</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <h3 className="text-body !font-bold">
                  CÔNG NGHỆ SMART OIL CONTROL KẾT HỢP <br/>
                  CÔNG NGHỆ HẠT NANO
                </h3>
                <p className="text-body">
                  Duy trì cảm giác thoáng da - ráo mặt - không bóng nhờn suốt 8 giờ. Tạo hiệu ứng soft focus, che phủ khuyết điểm nhẹ nhàng, cho Finish mỏng nhẹ, mịn đẹp.
                </p>
              </div>

              <div className="flex flex-col">
                <h3 className="text-body !font-bold">
                  CÔNG NGHỆ MICROBIOME
                </h3>
                <p className="text-body">
                  Làm dịu và cân bằng hệ vi sinh, bảo vệ làn da nhạy cảm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Test Report */}
      <section className="landing__lab-report w-full py-[120px] px-10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-16">
          <h2 className="text-heading-2 text-center">PHIẾU KIỂM NGHIỆM</h2>

          <div className="relative w-full border-2 border-[#3a76a5] rounded-[40px] p-6 md:p-12 min-h-[300px] md:min-h-[500px] flex flex-col md:flex-row md:items-center md:mt-30">
            {/* Lab report image - positioned to overlap left side of border on desktop, on top on mobile */}
            <div
              className="relative md:absolute md:-left-8 md:-top-[50] z-10 w-full max-w-[300px] md:w-[500px] md:max-w-[500px] h-auto order-1 md:order-none mb-6 md:mb-0 cursor-pointer mx-auto md:mx-0"
              onClick={() => setIsImagePopupOpen(true)}
            >
              <Image
                src="/landing-page/PAGE 7/43.png"
                alt="Phiếu kết quả thử nghiệm"
                width={600}
                height={800}
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </div>

            {/* Right content - text description */}
            <div className="w-full md:ml-[480px] flex-1 flex items-center order-2 md:order-none">
              <p className="text-body leading-relaxed text-center md:text-left">
                Phiếu kết quả thử nghiệm  được Viện nghiên cứu và phát triển sản phẩm thiên nhiên cấp vào ngày 28/10/2025, đảm bảo uy tín
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Usage Instructions */}
      <section className="landing__usage w-full py-[120px] px-10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-12">
          <h2 className="text-heading-2 text-center">HƯỚNG DẪN SỬ DỤNG</h2>

          <div className="w-full bg-[#D5E5EF] rounded-[40px] p-6 md:p-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start justify-center">
              <Step
                imageSrc="/landing-page/PAGE 8/47.png"
                alt="Step 1"
                text="Sử dụng một lượng vừa đủ, đảm bảo che phủ toàn mặt và cổ."
              />
              <Step
                imageSrc="/landing-page/PAGE 8/48.png"
                alt="Step 2"
                text="Thao tác thoa dàn trải từ trong ra ngoài, giúp kem dàn đều và thấm vào da."
              />
              <Step
                imageSrc="/landing-page/PAGE 8/49.png"
                alt="Step 3"
                text="Sử dụng trước khi ra nắng 15 phút để có lớp bảo vệ tuyệt đối cho da."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Customer Reviews */}
      <section className="landing__reviews w-full py-[120px] px-10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-12">
          <h2 className="text-heading-2 text-center">ĐÁNH GIÁ TỪ KHÁCH HÀNG</h2>

          <div className="bg-gray-50 rounded-[40px] p-8 shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <ReviewCard
                rating={5}
                review="Tone lên nhẹ, hợp dùng buổi sáng đi làm. Da mình hơi xỉn nên rất thích kiểu nâng tone nhẹ như em này. Không bị trắng bệch như mấy dòng Hàn, mà sáng kiểu tự nhiên, kiểu healthy skin. Mình hay makeup nhẹ sau đó, lớp nền bám khá ổn. Nếu Cellic có thêm phiên bản chống nước thì chắc mình chấm 5 sao luôn."
                author="Kiều Oanh"
                date="1 tuần trước"
              />
              <ReviewCard
                rating={4.5}
                review="Tốt nhưng nên cải thiện tốc độ thấm. Chống nắng ổn, không bị rát da khi ra nắng gắt, mà da cũng đỡ đổ dầu hơn. Tuy nhiên lúc mới bôi thì hơi dính nhẹ tầm 1-2 phút đầu mới set hẳn. Dù vậy, tổng thể rất đáng tiền, đặc biệt là vì cảm giác dịu nhẹ không gây kích ứng."
                author="Thảo Trang"
                date="1 tháng trước"
              />
              <ReviewCard
                rating={5}
                review="Finish đẹp, mịn lì mà vẫn ẩm nhẹ. Ấn tượng đầu tiên là chất kem mịn, tán ra mượt, không để lại vệt trắng. Da mình dầu vùng T nhưng dùng cả buổi vẫn thấy kiềm dầu tốt, không bị loang như mấy loại trước. Mùi dễ chịu, kiểu rất nhẹ. Mình chỉ mong hãng ra thêm bản lớn để xài được lâu hơn."
                author="Diệu Linh"
                date="3 tuần trước"
              />
            </div>
          </div>

          {/* Stats Graph */}
          <StatsGraph
            items={[
              { label: "Hiệu Quả", percentage: 92.3, color: "#a7c1d3", value1: 12, percentage1: 92.3, value2: 1, percentage2: 7.7 },
              { label: "Dưỡng ẩm", percentage: 88.9, color: "#a7c1d3", value1: 8, percentage1: 88.9, value2: 1, percentage2: 11.1 },
              { label: "Kích ứng", percentage: 4, color: "#a7c1d3", value1: 1, percentage1: 4, value2: 12, percentage2: 96 },
            ]}
          />
        </div>
      </section>

      {/* Section 10: Brand Story */}
      <section className="w-full min-h-screen py-[150px] px-10 flex items-center justify-center">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-[50px]">
          <div className="w-full flex items-center justify-center m-0">
            <Image
              src="/landing-page/PAGE 10/53.png"
              alt="Cellic"
              width={900}
              height={400}
              className="w-full max-w-[1200px] h-auto object-contain"
              quality={100}
              unoptimized
            />
          </div>
          <div className="w-full bg-gradient-to-b from-[#9ED4E5] to-[#F1F8FB] rounded-[40px] md:rounded-[80px] py-[40px] px-6 md:py-[70px] md:px-20 flex flex-col items-center gap-[20px] md:gap-[30px]">
            <h2 className="text-heading-2 text-center">CÂU CHUYỆN THƯƠNG HIỆU</h2>
            <p className="text-body-large text-center max-w-full md:max-w-[850px]">
              Sự kết hợp giữa "Cell" (Tế bào) và "Clinic" (Phòng khám) với triết lý chăm sóc da từ cấp độ tế bào bằng nền tảng khoa học y học chuẩn xác. Với sự thấu hiểu sâu sắc về làn da của người Việt, Cellic là nơi khoa học gặp gỡ sự yêu thương, nơi mỗi công thức không chỉ hiệu quả, mà còn mang lại sự an tâm trọn vẹn.
            </p>
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      {isImagePopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setIsImagePopupOpen(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-auto h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300 transition-colors"
              onClick={() => setIsImagePopupOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src="/landing-page/PAGE 7/43.png"
              alt="Phiếu kết quả thử nghiệm - Xem toàn màn hình"
              width={1200}
              height={1600}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              quality={100}
              unoptimized
            />
          </div>
        </div>
      )}
    </main>
  );
}

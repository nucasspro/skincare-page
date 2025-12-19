"use client"

import { Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { ManropeFont, MontserratFont, QuicksandFont } from "../fonts"

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
            <p className="section-content-small mt-4 text-center flex-grow w-full">{text}</p>
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
            <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow text-left" style={{ fontFamily: ManropeFont.style.fontFamily }}>
                {review}
            </p>
            <div className="flex justify-between items-center pt-4">
                <span className="font-bold text-[#2F5C91] text-sm font-heading">{author}</span>
                <span className="text-slate-400 text-xs">{date}</span>
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
                className="text-slate-500 whitespace-nowrap flex-shrink-0 w-24 text-right transition-opacity duration-200"
                style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px', opacity }}
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
                        className="absolute top-1/2 -translate-y-1/2 left-full ml-3 bg-gray-700 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20"
                        style={{ left: `${percentage1}%` }}
                    >
                        <div className="font-semibold">{label}:</div>
                        <div className="text-xs">{value1} ({percentage1.toFixed(1)}%)</div>
                        <div
                            className="absolute top-1/2 -translate-y-1/2 -left-[2px] border-[3px] border-transparent border-r-gray-700"
                        ></div>
                    </div>
                )}

                {/* Tooltip for percentage 2 */}
                {isHoveredPercentage2 && (
                    <div
                        className="absolute top-1/2 -translate-y-1/2 left-full ml-3 bg-gray-700 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-20"
                        style={{ left: `${percentage1 + percentage2}%` }}
                    >
                        <div className="font-semibold">{label}:</div>
                        <div className="text-xs">{value2} ({percentage2.toFixed(1)}%)</div>
                        <div
                            className="absolute top-1/2 -translate-y-1/2 -left-[2px] border-[3px] border-transparent border-r-gray-700"
                        ></div>
                    </div>
                )}
            </div>
        </div>
    )
}

interface PDRNInfoBarProps {
    imageSrc: string
    imagePosition: 'left' | 'right'
    imageWidth: number
    imageHeight: number
    title: string
    description: string
}

function PDRNInfoBar({ imageSrc, imagePosition, imageWidth, imageHeight, title, description }: PDRNInfoBarProps) {
    const isImageLeft = imagePosition === 'left'

    return (
        <div className="flex flex-col md:flex-row overflow-hidden gap-0 items-stretch" style={{ backgroundColor: '#92CEE3' }}>
            {isImageLeft && (
                <div className="w-full md:w-[20%] h-48 md:h-auto flex-shrink-0 relative m-0 p-0 overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={imageWidth}
                        height={imageHeight}
                        className="object-cover w-full h-full"
                        quality={100}
                        unoptimized
                    />
                </div>
            )}
            <div className="w-full md:w-[80%] p-1 md:p-3 flex flex-col justify-center text-left h-full mb-4">
                <h3 className="section-content text-2xl font-extrabold font-heading">
                    {title}
                </h3>
                <p className="section-content-small" style={{ lineHeight: '1.69' }}>
                    {description}
                </p>
            </div>
            {!isImageLeft && (
                <div className="w-full md:w-[20%] h-48 md:h-auto flex-shrink-0 relative m-0 p-0 overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={imageWidth}
                        height={imageHeight}
                        className="object-cover w-full h-full"
                        quality={100}
                        unoptimized
                    />
                </div>
            )}
        </div>
    )
}

interface BenefitItemProps {
    imageSrc: string
    text: string
}

function BenefitItem({ imageSrc, text }: BenefitItemProps) {
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-[90%] mx-auto my-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
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
            <p className="section-content text-left text-lg md:text-xl leading-relaxed pr-30" style={{ lineHeight: '1.5' }}>
                {text}
            </p>
        </div>
    )
}

interface BenefitsContainerProps {
    items: Array<{ imageSrc: string; text: string }>
    backgroundImage: string
}

function BenefitsContainer({ items, backgroundImage }: BenefitsContainerProps) {
    return (
        <div className="relative rounded-[3rem] md:p-10 space-y-16 mb-10">
            <div className="absolute inset-0 z-0">
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
                    <span style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>0%</span>
                    <span className="hidden md:inline" style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>20%</span>
                    <span style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>40%</span>
                    <span className="hidden md:inline" style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>60%</span>
                    <span style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>80%</span>
                    <span className="hidden md:inline" style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>100%</span>
                </div>
            </div>
        </div>
    )
}

export default function LandingPage() {
    const montserratFamily = MontserratFont.style.fontFamily
    const manropeFamily = ManropeFont.style.fontFamily



    return (
        <div
            className={`${ManropeFont.className} bg-white text-slate-600 antialiased overflow-x-hidden relative`}
        >
            {/* Cloud Background Elements */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <Image
                        src="/landing-page/PAGE 5/MÂY BACKGROUND.png"
                        alt="Cloud Background"
                        fill
                        className="object-cover"
                        priority={false}
                    />
                </div>
            </div>
            <style jsx global>{`
        h1, h2, h3, h4, h5, h6, .font-heading {
          font-family: ${montserratFamily}, 'Montserrat', sans-serif;
        }
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .text-shadow-white {
          text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
        }
        .clip-wave {
          clip-path: ellipse(150% 100% at 50% 100%);
        }
        .section-title {
          font-family: ${montserratFamily}, 'Montserrat', sans-serif;
          font-size: 35px;
          color: #3a76a5;
          line-height: 1.96;
        }
        /* Section Typography Sizes (Scaled based on 1440px with min limits) */
        .section-title {
          font-size: clamp(18px, 2.43vw, 35px);
        }
        .section-title-25 {
          font-size: clamp(14px, 1.74vw, 25px);
        }
        .section-content {
          font-size: clamp(12px, 1.39vw, 20px);
        }
        .section-content-small {
          font-size: clamp(10px, 1.25vw, 18px);
        }
      `}</style>

            {/* HERO SECTION */}
            <header className="relative w-full h-[55.5vw] overflow-hidden bg-[#EAF6FD]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/landing-page/PAGE 1/1.png"
                        alt="Background"
                        fill
                        className="object-cover object-[center_60%]"
                        priority
                        unoptimized
                    />
                </div>

                <div className="relative z-10 w-full h-full max-w-[100vw] mx-auto flex flex-row">
                    {/* Left Section: Text & Product (3/4) */}
                    <div className="relative w-3/4 h-full flex flex-col items-center pt-[5.5vw]">
                        {/* Header Text */}
                        <div className="text-center px-[1.1vw] z-40 mb-[3.3vw]">
                            <h2 className="section-title text-[clamp(24px,3.5vw,50px)] font-extrabold tracking-widest uppercase font-heading text-[#2F5C91]">
                                Cellic
                            </h2>
                            <h2 className="section-title text-[clamp(18px,2.8vw,40px)] font-extrabold tracking-widest uppercase font-heading text-[#2F5C91]">
                                Bright Matte Sunscreen
                            </h2>
                            <p className="section-content-small text-[clamp(10px,1.4vw,20px)] font-medium text-[#537AA8] uppercase tracking-wide">
                                <span className="font-extrabold text-[#2F5C91]">X10</span> Hiệu quả chống nắng - Tái tạo phục hồi da
                            </p>
                        </div>

                        {/* Product Image */}
                        <div className="relative w-[24.3vw] z-30 group">
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src="/landing-page/PAGE 1/3.png"
                                    alt="Products"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                    unoptimized
                                />
                            </div>
                            <div className="absolute top-full left-0 w-full h-full transform scale-y-[-1] opacity-40 origin-top mt-[22vw] pointer-events-none -z-10 bg-gradient-to-b from-transparent to-white/20"
                                style={{ maskImage: 'linear-gradient(to top, rgba(0,0,0,1), transparent)' }}>
                                <Image
                                    src="/landing-page/PAGE 1/3.png"
                                    alt="Products Reflection"
                                    fill
                                    className="object-contain"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Model (1/4) */}
                    <div className="relative w-1/4 h-full">
                        {/* Model Image - Right */}
                        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full h-[70%] z-20">
                            <Image
                                src="/landing-page/PAGE 1/2.png"
                                alt="Model"
                                fill
                                className="object-contain object-bottom drop-shadow-2xl"
                                priority
                                unoptimized
                            />
                            {/* Model Reflection - Show reflection */}
                            <div className="absolute bottom-0 left-0 w-full h-full transform scale-y-[-1] origin-bottom translate-y-[20%] opacity-50 pointer-events-none -z-10"
                                style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent 80%)' }}>
                                <Image
                                    src="/landing-page/PAGE 1/2.png"
                                    alt="Model Reflection"
                                    fill
                                    className="object-contain object-bottom blur-[1px]"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* SECTION 2: NEW GEN SUNSCREEN (Radial Layout) */}
            <section className="py-[5.5vw] bg-[#F0F9FF] relative overflow-hidden z-10">
                <div className="max-w-[100vw] mx-auto px-[1.1vw]">
                    <div className="text-center mb-[4.4vw] relative z-10">
                        <h2 className="section-title text-[clamp(20px,2.8vw,40px)] font-extrabold text-[#2F5C91] uppercase mb-[0.8vw] font-heading">
                            Kem Chống Nắng Thế Hệ Mới
                        </h2>
                        <div className="inline-block border-[#BFDBFE] bg-white backdrop-blur-sm px-[1.6vw] py-[0.5vw]">
                            <p className="section-content-small text-[#2563EB] text-sm uppercase tracking-wider">
                                Thấu hiểu và đồng hành cùng làn da Việt
                            </p>
                        </div>
                    </div>

                    <div className="relative h-full w-full flex items-center justify-center">
                        {/* Layer 1: Background Molecules (10.png) */}
                        <div className="absolute inset-0 flex items-center justify-center z-0 w-full h-full">
                            <Image
                                src="/landing-page/PAGE 2/10.png"
                                alt="Background Molecules"
                                width={1000}
                                height={600}
                                className="w-full h-full object-contain"
                                priority
                                unoptimized
                            />
                        </div>

                        {/* Layer 2: Water/Circle Effect (8.png) */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="relative w-[27.7vw] h-[27.7vw] transform -translate-y-[10%]">
                                <Image
                                    src="/landing-page/PAGE 2/8.png"
                                    alt="Water Effect"
                                    fill
                                    className="object-contain"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Layer 3: Product (9.png) */}
                        <div className="relative z-20 w-[17.7vw] transform translate-y-[-10%]">
                            <div className="relative w-full aspect-[2/5]">
                                <Image
                                    src="/landing-page/PAGE 2/9.png"
                                    alt="Product"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Features - Absolutely Positioned for Desktop */}
                        {/* Adjust widths to prevent 3 lines */}

                        {/* Left Top */}
                        <div className="absolute top-[0%] left-[5%] md:left-[2%] w-auto max-w-[250px] text-center md:text-right z-30">
                            <h3 className="section-title-25 text-center font-bold text-[#2F5C91] text-[clamp(10px,1.7vw,24px)] md:text-2xl uppercase leading-tight font-heading">
                                4 Màng Lọc<br />Thế Hệ Mới
                            </h3>
                        </div>
                        {/* Left Middle */}
                        <div className="absolute top-[30%] left-0 md:left-[5%] w-auto max-w-[250px] text-center md:text-right z-30">
                            <h3 className="section-title-25 text-center font-bold text-[#2F5C91] text-[clamp(10px,1.7vw,24px)] md:text-2xl uppercase leading-tight font-heading">PDRN</h3>
                        </div>
                        {/* Left Bottom */}
                        <div className="absolute bottom-[30%] left-[5%] md:left-[2%] w-auto max-w-[250px] text-center md:text-right z-30">
                            <h3 className="section-title-25 text-center font-bold text-[#2F5C91] text-[clamp(10px,1.7vw,24px)] md:text-2xl uppercase leading-tight font-heading">
                                Lành Tính<br />Dịu Nhẹ
                            </h3>
                        </div>

                        {/* Right Top */}
                        <div className="absolute top-[-5%] right-[5%] md:right-[5%] w-auto max-w-[280px] text-center md:text-left z-30">
                            <h3 className="section-title-25 text-center font-bold text-[#2F5C91] text-[clamp(10px,1.7vw,24px)] md:text-2xl uppercase leading-tight font-heading">
                                Kiềm Dầu Suốt 8h
                            </h3>
                        </div>
                        {/* Right Middle */}
                        <div className="absolute top-[20%] right-0 md:right-[5%] w-auto max-w-[250px] text-center md:text-left z-30">
                            <h3 className="section-title-25 text-center font-bold text-[#2F5C91] text-[clamp(10px,1.7vw,24px)] md:text-2xl uppercase leading-tight font-heading">
                                Nâng Tone<br />Tự Nhiên
                            </h3>
                        </div>
                        {/* Right Bottom */}
                        <div className="absolute bottom-[25%] right-[5%] md:right-[8%] w-auto max-w-[250px] text-center md:text-left z-30">
                            <h3 className="section-title-25 text-center font-bold text-[#2F5C91] text-[clamp(10px,1.7vw,24px)] md:text-2xl uppercase leading-tight font-heading">
                                Phục Hồi<br />Tổn Thương
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: 3-LAYER PROTECTION */}
            <section className="py-[5.5vw] px-[1.1vw] relative z-10 w-full">
                <div className="w-[80vw] mx-auto px-[1.1vw] text-center">
                    {/* Header - Centered Top */}
                    <div className="text-center relative z-10">
                        <h2 className="section-title text-[clamp(20px,2.8vw,40px)] font-extrabold text-[#2F5C91] uppercase tracking-tight font-heading">
                            Tính năng bảo vệ 3 lớp toàn diện
                        </h2>
                    </div>

                    {/* Card Container */}
                    <div className="relative bg-white overflow-visible min-h-[48.6vw]">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0 flex justify-center w-full h-full">
                            <div className="w-[80vw] h-full relative">
                                <Image
                                    src="/landing-page/PAGE 3/17.png"
                                    alt="Background"
                                    fill
                                    className="object-cover rounded-[5rem]"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="absolute inset-0 z-10 w-full h-full">
                            {/* Model Image - Large, can overflow */}
                            <div className="absolute right-0 top-[15%] z-10 pointer-events-none">
                                <div className="w-[62.5vw] relative">
                                    <Image
                                        src="/landing-page/PAGE 3/2_1.png"
                                        alt="Model Protection"
                                        width={1100}
                                        height={1540}
                                        className="w-full h-auto object-contain drop-shadow-2xl"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            {/* Left: Text Items - Positioned Top-Left */}
                            <div className="absolute top-[15%] left-0 z-10 flex flex-col justify-start pl-[2.2vw] space-y-[2.7vw]">

                                {/* Item 1 */}
                                <div className="flex items-center gap-[1.1vw]">
                                    <h3 className="section-content text-left text-[clamp(10px,1.7vw,24px)] font-bold text-[#2F5C91] font-heading leading-relaxed">
                                        Bảo vệ da trước tác động<br />của tia UVA, UVB, HEV
                                    </h3>
                                </div>
                                {/* Item 2 */}
                                <div className="flex items-center gap-[1.1vw]">
                                    <h3 className="section-content text-left text-[clamp(10px,1.7vw,24px)] font-bold text-[#2F5C91] font-heading leading-relaxed">
                                        Bảo vệ khỏi tác động từ<br />ô nhiễm môi trường và bụi mịn
                                    </h3>
                                </div>
                                {/* Item 3 */}
                                <div className="flex items-center gap-[1.1vw]">
                                    <h3 className="section-content text-left text-[clamp(10px,1.7vw,24px)] font-bold text-[#2F5C91] font-heading leading-relaxed">
                                        Bảo vệ song song<br />nuôi dưỡng hệ vi sinh
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Button - Left Bottom */}
                        <div className="absolute bottom-[3.3vw] left-0 z-10 flex justify-start pl-[2.2vw]">
                            <button className="relative group w-[20.8vw] h-[3.9vw] rounded-full bg-[#CFE5F5] border-[0.14vw] border-[#2F5C91] shadow-lg overflow-hidden transition-transform">
                                {/* Inner White Border */}
                                <div className="absolute inset-[0.2vw] border-[0.14vw] border-white rounded-full pointer-events-none"></div>
                                {/* Text */}
                                <span className="relative z-10 text-[#2F5C91] font-bold text-[clamp(10px,1.4vw,20px)] uppercase font-heading">
                                    Xem thêm
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: INGREDIENTS */}
            <section className="py-[5.5vw] bg-white relative z-10 w-full">
                <div className="w-[80vw] mx-auto px-[1.1vw] text-center">
                    <div className="bg-[#F1F5F9] rounded-[2.8vw] p-[0.5vw] flex flex-row items-center gap-[4.4vw] relative overflow-hidden">
                        {/* Left Visual: Product Images */}
                        <div className="w-5/12 relative h-[22.2vw] flex items-center justify-center overflow-hidden">
                            <Image
                                src="/landing-page/PAGE 4/product.png"
                                alt="Cellic Products"
                                width={900}
                                height={900}
                                className="w-full max-w-[55.5vw] h-auto object-contain"
                                quality={100}
                                unoptimized
                            />
                        </div>

                        {/* Right Content */}
                        <div className="w-7/12 space-y-[0.55vw]">
                            <h2 className="section-title font-extrabold uppercase tracking-tight">
                                Thành Phần
                            </h2>

                            <div className="space-y-[0.55vw]">
                                <div>
                                    <h3 className="section-content font-extrabold uppercase mb-1 font-heading text-left">
                                        Màng lọc chống nắng hiện đại
                                    </h3>
                                    <p className="section-content-small leading-relaxed text-left" style={{ lineHeight: '1.69' }}>
                                        Ultrafine Titanium Dioxide, Nano Zinc Oxide, Uvinul A Plus, Octinoxate
                                    </p>
                                </div>
                                <div>
                                    <h3 className="section-content font-extrabold uppercase mb-1 font-heading text-left">PDRN Thực Vật</h3>
                                    <p className="section-content-small leading-relaxed text-left" style={{ lineHeight: '1.69' }}>
                                        Từ nguyên liệu rau má giúp phục hồi và tái tạo da. Hoa oải hương và kim ngân hoa giúp kháng viêm,
                                        giảm kích ứng.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="section-content font-extrabold uppercase mb-1 font-heading text-left">Propanediol</h3>
                                    <p className="section-content-small leading-relaxed text-left" style={{ lineHeight: '1.69' }}>
                                        Có độ tinh khiết cao và mang lại hiệu quả bền vững.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: PDRN INFO */}
            <section className="py-[5.5vw] bg-slate-50 relative z-10 w-full">
                <div className="w-[80vw] mx-auto px-[1.1vw] text-center">
                    <h2 className="section-title font-extrabold uppercase mb-[2.2vw]">
                        PDRN - Có thể bạn chưa biết?
                    </h2>

                    <div className="flex flex-col gap-[1.6vw]">
                        <PDRNInfoBar
                            imageSrc="/landing-page/PAGE 5/31.png"
                            imagePosition="left"
                            imageWidth={300}
                            imageHeight={300}
                            title="Hỗ trợ tái tạo tế bào da"
                            description="Kích thích sự tăng sinh của tế bào sừng và nguyên bào sợi, giúp phục hồi da bị tổn thương."
                        />
                        <PDRNInfoBar
                            imageSrc="/landing-page/PAGE 5/32.png"
                            imagePosition="right"
                            imageWidth={250}
                            imageHeight={250}
                            title="Phục hồi làn da tổn thương (Wound healing)"
                            description="Kích hoạt quá trình tăng sinh và tái tạo mô bị tổn thương. Kích thích VEGF và Angiopoietin nhằm thúc đẩy quá trình khét miệng vết thương."
                        />
                        <PDRNInfoBar
                            imageSrc="/landing-page/PAGE 5/33.png"
                            imagePosition="left"
                            imageWidth={300}
                            imageHeight={300}
                            title="Bảo vệ tế bào trước tia UVB"
                            description="Tăng khả năng sống của tế bào và giảm thiểu tác hại oxy hóa, hỗ trợ củng cố hàng rào da."
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 6: 3C (USES) */}
            <section className="py-[5.5vw] relative z-10 w-full">
                <div className="w-[80vw] mx-auto px-[1.1vw] text-center">

                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/landing-page/PAGE 6/BACKGROUND.png"
                            alt=""
                            fill
                            className="object-cover"
                            quality={100}
                            unoptimized
                        />
                    </div>

                    <div className="max-w-[100vw] mx-auto px-[1.1vw] relative z-10">
                        {/* Container with 3C, Header and BenefitsContainer - All same width */}
                        <div className="max-w-[100vw] relative">
                            {/* Large "3C" - On top */}
                            <div className="absolute top-[5.5vw] left-[-2vw] text-[#3a76a5] leading-none select-none pointer-events-none z-20" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: '17.7vw' }}>
                                3
                            </div>
                            <div className="absolute top-[8.8vw] left-[8vw] text-[#3a76a5] leading-none select-none pointer-events-none z-20" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: '9vw' }}>
                                C
                            </div>

                            {/* Header - On top, below 3C */}
                            <div className="relative z-20 top-[1.1vw] left-[15.2vw] mb-[4.4vw] pt-[8.8vw]">
                                <h2 className="text-left font-heading uppercase tracking-tight" style={{ fontSize: 'clamp(16px, 2.4vw, 35px)' }}>
                                    <span className="font-normal text-[#2F5C91]">ÔNG DỤNG "KHÔNG TƯỞNG"</span>
                                    <br />
                                    <span className="font-bold text-[#2F5C91]">CỦA CELLIC MATTE SUNSCREEN</span>
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

            {/* SECTION 7: DEEP PROTECTION */}
            <section className="py-[5.5vw] bg-white relative z-10 w-full overflow-visible mt-[6.9vw]">
                <div className="w-[80vw] mx-auto px-[1.1vw] relative">
                    {/* Image at top left, overlapping border */}
                    <div className="absolute top-[-6.9vw] left-[-5.5vw] z-20">
                        <Image
                            src="/landing-page/PAGE 7/42.png"
                            alt=""
                            width={200}
                            height={200}
                            className="w-[20.8vw] h-auto object-contain"
                            quality={100}
                            unoptimized
                        />
                    </div>
                    <div className="bg-[#EFF6FF] rounded-[3.3vw] p-[3.3vw] grid grid-cols-2 gap-[3.3vw] items-center relative z-10">
                        {/* Left Visual with Text Overlay */}
                        <div className="relative rounded-[2rem] group">
                            <div>
                                <h2
                                    className="section-title font-extrabold uppercase text-center"
                                    style={{ lineHeight: "1.5" }}
                                >
                                    Bảo vệ<br />chuyên sâu và<br />nuôi dưỡng<br />chỉ trong<br />1 bước
                                </h2>
                            </div>
                        </div>

                        {/* Right Text Content */}
                        <div className="space-y-2">
                            <div>
                                <h3 className="section-content font-extrabold uppercase text-left" style={{ lineHeight: "1.3" }}>
                                    4 Màng Lọc Chống Nắng Hiện Đại
                                </h3>
                                <p className="section-content-small leading-relaxed" style={{ lineHeight: "1.3" }}>
                                    Với <span className="font-bold">2 màng lọc Ultrafine Titanium Dioxide & Nano Zinc Oxide</span>{" "}
                                    chống nắng thế hệ mới mang lại hiệu quả bảo vệ đa tầng:<br />
                                    1. Bảo vệ da trước tác động của tia UVA, UVB, HEV.<br />
                                    2. Bảo vệ khỏi tác động từ ô nhiễm môi trường và bụi mịn.<br />
                                    3. Bảo vệ song song nuôi dưỡng hệ vi sinh.
                                </p>
                            </div>

                            <div>
                                <h3 className="section-content font-extrabold uppercase text-left" style={{ lineHeight: "1.3" }}>
                                    Công Nghệ Smart Oil Control Kết Hợp Công Nghệ Hạt Nano
                                </h3>
                                <p className="section-content-small leading-relaxed" style={{ lineHeight: "1.3" }}>
                                    Duy trì cảm giác thoáng da - ráo mặt - không bóng nhờn suốt 8 giờ. Tạo hiệu ứng soft focus, che phủ
                                    khuyết điểm nhẹ nhàng, cho Finish mỏng nhẹ, mịn đẹp.
                                </p>
                            </div>

                            <div>
                                <h3 className="section-content font-extrabold uppercase text-left" style={{ lineHeight: "1.3" }}>Công Nghệ Microbiome</h3>
                                <p className="section-content-small leading-relaxed" style={{ lineHeight: "1.3" }}>
                                    Làm dịu và cân bằng hệ vi sinh, bảo vệ làn da nhạy cảm.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8: CERTIFICATE */}
            <section className="py-[5.5vw] relative overflow-visible z-10 mt-[4.1vw]">
                <div className="w-[80vw] mx-auto px-[1.1vw] relative z-10">
                    {/* Image at top right corner of border */}
                    <div className="absolute top-[-9.7vw] right-[-11.8vw] z-30">
                        <Image
                            src="/landing-page/PAGE 1/4.png"
                            alt=""
                            width={250}
                            height={250}
                            className="w-[17.3vw] h-auto object-contain"
                            quality={100}
                            unoptimized
                        />
                    </div>

                    {/* Text Content with Border - Flex layout 1:3 */}
                    <div className="relative border-2 border-[#3a76a5] rounded-[0.55vw] bg-white z-10 overflow-visible">
                        <div className="absolute left-[-1.4vw] top-1/2 -translate-y-1/2 z-20 w-[22.2vw]">
                            <Image
                                src="/landing-page/PAGE 7/43.png"
                                alt="Phiếu Kiểm Nghiệm"
                                width={320}
                                height={448}
                                className="w-full h-auto object-contain rounded-[0.55vw]"
                                style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2)' }}
                                quality={100}
                                unoptimized
                            />
                        </div>
                        <div className="flex flex-row">
                            <div className="w-2/5"></div>

                            <div className="w-3/5 p-[3.3vw] space-y-[1.6vw] relative">
                                <h2 className="section-title font-extrabold uppercase tracking-tight">
                                    PHIẾU KIỂM NGHIỆM
                                </h2>
                                <p className="section-content">
                                    Phiếu kết quả nghiên cứu và phát triển sản phẩm thiên nhiên cấp vào ngày 28/10/2025, đảm bảo uy tín.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 9: HOW TO USE */}
            <section className="py-20 bg-slate-50 relative z-10 w-full mt-[60px]">
                <div className="w-[80vw] mx-auto px-4 text-center">
                    <h2 className="section-title font-extrabold uppercase mb-8">
                        HƯỚNG DẪN SỬ DỤNG
                    </h2>

                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                        {/* Content Flex */}
                        <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-16 p-8 md:p-12 items-start justify-center bg-[#D5E5EF] rounded-2xl">
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

            {/* SECTION 10: TESTIMONIALS */}
            <section className="py-20 bg-slate-50 relative z-10 w-full">
                <div className="w-[80vw] mx-auto px-4">
                    <h2 className="section-title font-extrabold uppercase mb-8 text-center">
                        Đánh Giá Từ Khách Hàng
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8 mb-20">
                        <ReviewCard
                            rating={5}
                            review="Tone lên nhẹ, hợp dùng buổi sáng đi làm. Da mình hơi xỉn nên rất thích kiểu nâng tone nhẹ như em này. Không bị trắng bệch như mấy dòng Hàn, mà sáng kiểu tự nhiên, kiểu healthy skin. Mình hay makeup nhẹ sau đó, lớp nền bám khá ổn."
                            author="Kiều Oanh"
                            date="1 tuần trước"
                        />
                        <ReviewCard
                            rating={4.5}
                            review="Tốt nhưng nên cải thiện tốc độ thấm. Chống nắng ổn, không bị rát da khi ra nắng gắt, mà da cũng đỡ đổ dầu hơn. Tuy nhiên lúc mới bôi thì hơi dính nhẹ tầm 1-2 phút đầu mới set hẳn. Dù vậy, tổng thể rất đáng tiền."
                            author="Thảo Trang"
                            date="1 tháng trước"
                        />
                        <ReviewCard
                            rating={5}
                            review="Finish đẹp, mịn lì mà vẫn ẩm nhẹ. Ấn tượng đầu tiên là chất kem mịn, tán ra mượt, không để lại vệt trắng. Da mình dầu vùng T nhưng dùng cả buổi vẫn thấy kiềm dầu tốt. Mùi dễ chịu, kiểu rất nhẹ."
                            author="Diệu Linh"
                            date="3 tuần trước"
                        />
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

            {/* FOOTER / BRAND STORY */}
            <footer className="py-0 md:py-[8.8vw] relative overflow-hidden z-10 bg-gradient-to-b from-[#DFEAF8] to-white">
                {/* Logo Image - Independent container */}
                <div className="flex justify-center mb-[-6vw] md:mb-[-6.9vw] px-[4vw] md:px-0">
                    <div className="relative w-full md:w-auto">
                        <Image
                            src="/landing-page/PAGE 10/53.png"
                            alt="Cellic Logo"
                            width={1800}
                            height={500}
                            className="w-full h-auto object-contain scale-110 md:scale-100"
                            priority
                        />
                    </div>
                </div>

                {/* Brand Story Box with CSS Gradient - Independent container */}
                <div className="w-full md:w-[60vw] max-w-none mx-auto text-center relative z-10 px-[4vw] md:px-0">
                    <div className="relative overflow-hidden rounded-t-[10vw] md:rounded-t-[4.4vw] bg-gradient-to-b from-[#D1E9FC] to-white py-[6vw] md:py-[3.3vw] px-[5vw] md:px-[2.2vw]">
                        <h2 className="text-[40px] md:text-[clamp(18px, 2.4vw, 35px)] font-extrabold text-[#2b6493] tracking-tight uppercase mb-[4vw] md:mb-[2.2vw] font-heading">
                            Câu Chuyện Thương Hiệu
                        </h2>
                        <div className="text-[clamp(16px, 3.5vw, 20px)] md:text-[clamp(12px, 1.38vw, 20px)] text-[#235e8f] leading-relaxed max-w-full md:max-w-[50vw] mx-auto font-medium px-0">
                            <p style={{ fontFamily: montserratFamily }}>
                                Sự kết hợp giữa "Cell" (Tế bào) và "Clinic" (Phòng khám) với triết lý chăm sóc da từ cấp độ tế bào bằng nền tảng khoa học y học chuẩn xác. Với sự thấu hiểu sâu sắc về làn da của người Việt, Cellic là nơi khoa học gặp gỡ sự yêu thương, nơi mỗi công thức không chỉ hiệu quả, mà còn mang lại sự an tâm trọn vẹn.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

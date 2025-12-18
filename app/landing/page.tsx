"use client"

import { Star } from "lucide-react"
import Image from "next/image"
import { ManropeFont, MontserratFont, QuicksandFont } from "../fonts"

interface StepProps {
    imageSrc: string
    alt: string
    text: string
}

function Step({ imageSrc, alt, text }: StepProps) {
    return (
        <div className="flex h-full flex-1 flex-col items-center justify-start">
            <div className="w-full flex-shrink-0">
                <Image
                    src={imageSrc}
                    alt={alt}
                    quality={100}
                    width={600}
                    height={600}
                    className="h-auto w-full object-contain"
                    unoptimized
                />
            </div>
            <p className="section-content-small mt-4 w-full flex-grow text-center">{text}</p>
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
        <div className="flex min-h-[300px] flex-1 flex-col rounded-lg border border-slate-100 bg-white p-8">
            <div className="mb-4">
                <StarRating rating={rating} size={16} />
            </div>
            <p className="mb-6 flex-grow text-left text-sm leading-relaxed text-slate-600">
                {review}
            </p>
            <div className="flex items-center justify-between pt-4">
                <span className="font-heading text-sm font-bold text-[#2F5C91]">{author}</span>
                <span className="text-xs text-slate-400">{date}</span>
            </div>
        </div>
    )
}

interface StatsBarItemProps {
    label: string
    percentage: number
    color: string
}

function StatsBarItem({ label, percentage, color }: StatsBarItemProps) {
    return (
        <div className="flex items-center gap-4">
            <span
                className="w-24 flex-shrink-0 whitespace-nowrap text-right text-slate-500"
                style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}
            >
                {label}
            </span>
            <div className="relative h-16 flex-1 bg-slate-200/50">
                <div className="absolute left-0 top-0 h-full" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
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
        <div className="flex flex-col items-stretch gap-0 overflow-hidden md:flex-row" style={{ backgroundColor: '#92CEE3' }}>
            {isImageLeft && (
                <div className="relative m-0 h-48 w-full flex-shrink-0 overflow-hidden p-0 md:h-auto md:w-[20%]">
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={imageWidth}
                        height={imageHeight}
                        className="h-full w-full object-cover"
                        quality={100}
                        unoptimized
                    />
                </div>
            )}
            <div className="mb-4 flex h-full w-full flex-col justify-center p-1 text-left md:w-[80%] md:p-3">
                <h3 className="section-content font-heading text-2xl font-extrabold">
                    {title}
                </h3>
                <p className="section-content-small" style={{ lineHeight: '1.69' }}>
                    {description}
                </p>
            </div>
            {!isImageLeft && (
                <div className="relative m-0 h-48 w-full flex-shrink-0 overflow-hidden p-0 md:h-auto md:w-[20%]">
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={imageWidth}
                        height={imageHeight}
                        className="h-full w-full object-cover"
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
        <div className="mx-auto my-4 flex max-w-[90%] flex-col items-center gap-8 md:flex-row">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full">
                <Image
                    src={imageSrc}
                    alt=""
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                    quality={100}
                    unoptimized
                />
            </div>
            <p className="section-content pr-30 text-left text-lg leading-relaxed md:text-xl" style={{ lineHeight: '1.5' }}>
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
        <div className="relative mb-10 space-y-16 rounded-[3rem] md:p-10">
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
    items: Array<{ label: string; percentage: number; color: string }>
}

function StatsGraph({ items }: StatsGraphProps) {
    return (
        <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
                {items.map((item, index) => (
                    <StatsBarItem
                        key={index}
                        label={item.label}
                        percentage={item.percentage}
                        color={item.color}
                    />
                ))}
                {/* Axis */}
                <div className="flex justify-between pl-28 pt-2 text-xs text-slate-500">
                    <span style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>0%</span>
                    <span style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>20%</span>
                    <span style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>40%</span>
                    <span style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>60%</span>
                    <span style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>80%</span>
                    <span style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}>100%</span>
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
            className={`${ManropeFont.className} relative overflow-x-hidden bg-white text-slate-600 antialiased`}
        >
            {/* Cloud Background Elements */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-full opacity-30">
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
        .section-title-25 {
          font-family: ${montserratFamily}, 'Montserrat', sans-serif;
          font-size: 25px;
          color: #3a76a5;
          line-height: 1.96;
        }
        .section-content {
          font-family: ${montserratFamily}, 'Montserrat', sans-serif;
          font-size: 20px;
          color: #3a76a5;
          line-height: 1.96;
        }
        .section-content-small {
          font-family: ${montserratFamily}, 'Montserrat', sans-serif;
          font-size: 18px;
          color: #3a76a5;
          line-height: 1.96;
        }
      `}</style>

            {/* HERO SECTION */}
            <header className="relative h-auto w-full overflow-hidden bg-[#EAF6FD] min-h-[600px] md:h-[800px] lg:h-[900px]">
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

                <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col md:flex-row">
                    {/* Left Section: Text & Product (3/4) */}
                    <div className="relative flex h-full w-full flex-col items-center md:w-3/4 md:pt-20">
                        {/* Header Text */}
                        <div className="z-40 mb-8 px-4 text-center md:mb-12">
                            <h2 className="section-title text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-widest uppercase font-heading text-[#2F5C91]">
                                Cellic
                            </h2>
                            <h2 className="section-title text-xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-widest uppercase font-heading text-[#2F5C91]">
                                Bright Matte Sunscreen
                            </h2>
                            <p className="section-content-small text-xs md:text-xl lg:text-2xl font-medium text-[#537AA8] uppercase tracking-wide">
                                <span className="font-extrabold text-[#2F5C91]">X10</span> Hiệu quả chống nắng - Tái tạo phục hồi da
                            </p>
                        </div>

                        {/* Product Image */}
                        <div className="group relative z-30 w-[200px] md:w-[350px]">
                            <div className="relative aspect-[4/3] w-full">
                                <Image
                                    src="/landing-page/PAGE 1/3.png"
                                    alt="Products"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                    unoptimized
                                />
                            </div>
                            <div className="pointer-events-none absolute left-0 top-full mt-80 h-full w-full origin-top scale-y-[-1] transform bg-gradient-to-b from-transparent to-white/20 opacity-40 -z-10"
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
                    <div className="relative h-full w-full md:w-1/4">
                        {/* Model Image - Right */}
                        <div className="absolute left-1/2 top-[20%] z-20 h-[50%] w-[80%] -translate-x-1/2 md:top-[15%] md:h-[70%] md:w-full">
                            <Image
                                src="/landing-page/PAGE 1/2.png"
                                alt="Model"
                                fill
                                className="object-contain object-bottom drop-shadow-2xl"
                                priority
                                unoptimized
                            />
                            {/* Model Reflection - Show reflection */}
                            <div className="pointer-events-none absolute bottom-0 left-0 h-full w-full origin-bottom translate-y-[20%] scale-y-[-1] transform opacity-50 -z-10"
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
            <section className="relative z-10 overflow-hidden bg-[#F0F9FF] py-20">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="relative z-10 mb-16 text-center">
                        <h2 className="section-title mb-3 font-heading text-3xl font-extrabold uppercase text-[#2F5C91] md:text-4xl">
                            Kem Chống Nắng Thế Hệ Mới
                        </h2>
                        <div className="inline-block border-[#BFDBFE] bg-white px-6 py-2 backdrop-blur-sm">
                            <p className="section-content-small text-sm uppercase tracking-wider text-[#2563EB]">
                                Thấu hiểu và đồng hành cùng làn da Việt
                            </p>
                        </div>
                    </div>

                    <div className="relative flex h-full w-full items-center justify-center">
                        {/* Layer 1: Background Molecules (10.png) */}
                        <div className="absolute inset-0 z-0 flex h-full w-full items-center justify-center">
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
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <div className="relative h-[300px] w-[300px] -translate-y-[10%] transform md:h-[400px] md:w-[400px]">
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
                        <div className="relative z-20 w-40 translate-y-[-10%] transform md:w-64">
                            <div className="relative aspect-[2/5] w-full">
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
                        <div className="absolute left-[5%] top-[0%] z-30 w-auto max-w-[250px] text-center md:left-[2%] md:text-right lg:left-[5%] xl:left-[10%]">
                            <h3 className="section-title-25 font-heading text-center text-lg font-bold uppercase leading-tight text-[#2F5C91] md:text-2xl">
                                4 Màng Lọc<br />Thế Hệ Mới
                            </h3>
                        </div>
                        {/* Left Middle */}
                        <div className="absolute left-0 top-[30%] z-30 w-auto max-w-[250px] text-center md:left-[5%] md:text-right">
                            <h3 className="section-title-25 font-heading text-center text-lg font-bold uppercase leading-tight text-[#2F5C91] md:text-2xl">PDRN</h3>
                        </div>
                        {/* Left Bottom */}
                        <div className="absolute bottom-[30%] left-[5%] z-30 w-auto max-w-[250px] text-center md:left-[2%] md:text-right lg:left-[5%] xl:left-[10%]">
                            <h3 className="section-title-25 font-heading text-center text-lg font-bold uppercase leading-tight text-[#2F5C91] md:text-2xl">
                                Lành Tính<br />Dịu Nhẹ
                            </h3>
                        </div>

                        {/* Right Top */}
                        <div className="absolute right-[5%] top-[-5%] z-30 w-auto max-w-[280px] text-center md:text-left lg:right-[8%] xl:right-[12%]">
                            <h3 className="section-title-25 font-heading text-center text-lg font-bold uppercase leading-tight text-[#2F5C91] md:text-2xl">
                                Kiềm Dầu Suốt 8h
                            </h3>
                        </div>
                        {/* Right Middle */}
                        <div className="absolute right-0 top-[20%] z-30 w-auto max-w-[250px] text-center md:right-[5%] md:text-left">
                            <h3 className="section-title-25 font-heading text-center text-lg font-bold uppercase leading-tight text-[#2F5C91] md:text-2xl">
                                Nâng Tone<br />Tự Nhiên
                            </h3>
                        </div>
                        {/* Right Bottom */}
                        <div className="absolute bottom-[25%] right-[5%] z-30 w-auto max-w-[250px] text-center md:right-[8%] md:text-left lg:right-[10%] xl:right-[15%]">
                            <h3 className="section-title-25 font-heading text-center text-lg font-bold uppercase leading-tight text-[#2F5C91] md:text-2xl">
                                Phục Hồi<br />Tổn Thương
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: 3-LAYER PROTECTION */}
            <section className="relative z-10 w-full px-4 py-20">
                <div className="mx-auto w-full max-w-[1440px] px-4 text-center md:px-8">
                    {/* Header - Centered Top */}
                    <div className="relative z-10 text-center">
                        <h2 className="section-title font-heading text-2xl font-extrabold uppercase tracking-tight text-[#2F5C91] md:text-4xl">
                            Tính năng bảo vệ 3 lớp toàn diện
                        </h2>
                    </div>

                    {/* Card Container */}
                    <div className="relative min-h-[600px] overflow-visible bg-white md:min-h-[700px]">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0 flex h-full w-full justify-center">
                            <div className="relative h-full w-[80vw]">
                                <Image
                                    src="/landing-page/PAGE 3/17.png"
                                    alt="Background"
                                    fill
                                    className="object-cover rounded-[5rem]"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="absolute inset-0 z-10 h-full w-full">
                            {/* Model Image - Large, can overflow */}
                            <div className="pointer-events-none absolute right-[-10%] top-[30%] z-10 md:right-0 md:top-[-15%] lg:top-[-20%]">
                                <div className="relative w-[850px] md:w-[900px] lg:w-[1050px] xl:w-[1250px]">
                                    <Image
                                        src="/landing-page/PAGE 3/2_1.png"
                                        alt="Model Protection"
                                        width={1100}
                                        height={1540}
                                        className="h-auto w-full object-contain drop-shadow-2xl"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            {/* Left: Text Items - Positioned Top-Left */}
                            <div className="absolute left-0 top-[10%] z-10 flex flex-col justify-start space-y-6 md:top-[15%] md:space-y-10">

                                {/* Item 1 */}
                                <div className="flex items-center gap-4 pl-20 md:pl-30">
                                    <h3 className="section-content font-heading text-right text-lg font-bold leading-relaxed text-[#2F5C91] md:text-2xl" style={{ lineHeight: "1.5" }}>
                                        Bảo vệ da trước tác động<br />của tia UVA, UVB, HEV
                                    </h3>
                                </div>
                                {/* Item 2 */}
                                <div className="flex items-center gap-4 pl-20 md:pl-6">
                                    <h3 className="section-content font-heading text-right text-lg font-bold leading-relaxed text-[#2F5C91] md:text-2xl" style={{ lineHeight: "1.5" }}>
                                        Bảo vệ khỏi tác động từ<br />ô nhiễm môi trường và bụi mịn
                                    </h3>
                                </div>
                                {/* Item 3 */}
                                <div className="flex items-center gap-4 pl-20 md:pl-30">
                                    <h3 className="section-content font-heading text-right text-lg font-bold leading-relaxed text-[#2F5C91] md:text-2xl" style={{ lineHeight: "1.5" }}>
                                        Bảo vệ song song<br />nuôi dưỡng hệ vi sinh
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Button - Left Bottom */}
                        <div className="absolute bottom-40 left-10 z-10 flex justify-start pl-4 md:pl-8">
                            <button className="group relative h-12 w-[220px] overflow-hidden rounded-full border-[2px] border-[#2F5C91] shadow-lg transition-transform md:h-14 md:w-[300px]">
                                {/* Inner White Border */}
                                <div className="pointer-events-none absolute inset-[3px] rounded-full border-2 bg-[#CFE5F5] pad"></div>
                                {/* Text */}
                                <span className="section-content relative z-10 font-heading text-base font-extrabold uppercase md:text-xl">
                                    Xem thêm
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: INGREDIENTS */}
            <section className="relative z-10 w-full bg-white py-24 md:py-28">
                <div className="relative mx-auto w-full max-w-[1440px] px-4 text-center md:px-8">
                    {/* Product Image - Separate element, floating outside background */}
                    <div className="pointer-events-none absolute left-[-2%] top-1/2 z-20 -translate-y-1/2 md:left-[-10%] lg:left-[-12%]">
                        <Image
                            src="/landing-page/PAGE 4/product.png"
                            alt="Cellic Products"
                            width={1200}
                            height={1200}
                            className="h-auto w-[200px] object-contain md:w-[350px] lg:w-[450px]"
                            quality={100}
                            unoptimized
                        />
                    </div>

                    {/* Background Container */}
                    <div className="relative ml-12 flex flex-col items-center gap-16 overflow-visible rounded-[2.5rem] p-2 md:ml-20 md:flex-row md:p-2" style={{ background: 'linear-gradient(to bottom, #E0E7EF, #F1F5F9)' }}>
                        {/* Right Content */}
                        <div className="relative z-10 w-full md:ml-auto md:w-8/12">
                            <h2 className="section-title text-left font-extrabold uppercase tracking-tight">
                                Thành Phần
                            </h2>

                            <div>
                                <div>
                                    <h3 className="section-content font-heading text-left font-extrabold uppercase">
                                        Màng lọc chống nắng hiện đại
                                    </h3>
                                    <p className="section-content-small text-left leading-relaxed" style={{ lineHeight: '1.6' }}>
                                        Ultrafine Titanium Dioxide, Nano Zinc Oxide, Uvinul A Plus, Octinoxate
                                    </p>
                                </div>
                                <div>
                                    <h3 className="section-content font-heading text-left font-extrabold uppercase">PDRN Thực Vật</h3>
                                    <p className="section-content-small text-left leading-relaxed" style={{ lineHeight: '1.6' }}>
                                        Từ nguyên liệu rau má giúp phục hồi và tái tạo da. Hoa oải hương và kim ngân hoa giúp kháng viêm,
                                        giảm kích ứng.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="section-content font-heading text-left font-extrabold uppercase">Propanediol</h3>
                                    <p className="section-content-small text-left leading-relaxed" style={{ lineHeight: '1.6' }}>
                                        Có độ tinh khiết cao và mang lại hiệu quả bền vững.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: PDRN INFO */}
            <section className="relative z-10 w-full bg-slate-50 py-20">
                <div className="mx-auto w-full max-w-[1440px] px-4 text-center md:px-8">
                    <h2 className="section-title mb-8 font-extrabold uppercase">
                        PDRN - Có thể bạn chưa biết?
                    </h2>

                    <div className="flex flex-col gap-6">
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
            <section className="relative z-10 w-full py-20">
                <div className="mx-auto w-full max-w-[1440px] px-4 text-center md:px-8">

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

                    <div className="relative z-10 mx-auto max-w-6xl px-4">
                        {/* Container with 3C, Header and BenefitsContainer - All same width */}
                        <div className="relative max-w-6xl">
                            {/* Large "3C" - On top */}
                            <div className="pointer-events-none absolute left-[-30px] top-20 select-none text-[#3a76a5] leading-none z-20 md:left-[-30px] lg:left-0" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: 'clamp(150px, 20vw, 256px)' }}>
                                3
                            </div>
                            <div className="pointer-events-none absolute left-[115px] top-32 select-none text-[#3a76a5] leading-none z-20 md:left-[115px] lg:left-[140px]" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: 'clamp(80px, 10vw, 130px)' }}>
                                C
                            </div>

                            {/* Header - On top, below 3C */}
                            <div className="relative left-[220px] top-4 z-20 mb-16 pt-32 md:left-[220px] lg:left-[250px]">
                                <h2 className="font-heading text-right uppercase tracking-tight md:text-left" style={{ fontSize: 'clamp(24px, 4vw, 35px)' }}>
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
            <section className="relative z-10 mt-[100px] w-full overflow-visible bg-white py-20">
                <div className="relative mx-auto w-full max-w-[1440px] px-4 md:px-8">
                    {/* Image at top left, overlapping border */}
                    <div className="absolute left-[-20px] top-[-60px] z-20 md:left-[-80px] md:top-[-100px]">
                        <Image
                            src="/landing-page/PAGE 7/42.png"
                            alt=""
                            width={200}
                            height={200}
                            className="h-auto w-[150px] object-contain md:w-[300px]"
                            quality={100}
                            unoptimized
                        />
                    </div>
                    <div className="relative z-10 grid grid-cols-1 items-center gap-12 rounded-[3rem] bg-[#EFF6FF] p-8 md:grid-cols-2 md:p-12">
                        {/* Left Visual with Text Overlay */}
                        <div className="group relative rounded-[2rem]">
                            <div>
                                <h2
                                    className="section-title text-center font-extrabold uppercase"
                                    style={{ lineHeight: "1.5" }}
                                >
                                    Bảo vệ<br />chuyên sâu và<br />nuôi dưỡng<br />chỉ trong<br />1 bước
                                </h2>
                            </div>
                        </div>

                        {/* Right Text Content */}
                        <div className="space-y-2">
                            <div>
                                <h3 className="section-content text-left font-extrabold uppercase" style={{ lineHeight: "1.3" }}>
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
                                <h3 className="section-content text-left font-extrabold uppercase" style={{ lineHeight: "1.3" }}>
                                    Công Nghệ Smart Oil Control Kết Hợp Công Nghệ Hạt Nano
                                </h3>
                                <p className="section-content-small leading-relaxed" style={{ lineHeight: "1.3" }}>
                                    Duy trì cảm giác thoáng da - ráo mặt - không bóng nhờn suốt 8 giờ. Tạo hiệu ứng soft focus, che phủ
                                    khuyết điểm nhẹ nhàng, cho Finish mỏng nhẹ, mịn đẹp.
                                </p>
                            </div>

                            <div>
                                <h3 className="section-content text-left font-extrabold uppercase" style={{ lineHeight: "1.3" }}>Công Nghệ Microbiome</h3>
                                <p className="section-content-small leading-relaxed" style={{ lineHeight: "1.3" }}>
                                    Làm dịu và cân bằng hệ vi sinh, bảo vệ làn da nhạy cảm.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8: CERTIFICATE */}
            <section className="relative z-10 mt-[60px] overflow-visible py-20">
                <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 md:px-8">
                    {/* Image at top right corner of border */}
                    <div className="absolute right-[-20px] top-[-80px] z-30 md:right-[-170px] md:top-[-140px]">
                        <Image
                            src="/landing-page/PAGE 1/4.png"
                            alt=""
                            width={250}
                            height={250}
                            className="h-auto w-[120px] object-contain md:w-[250px]"
                            quality={100}
                            unoptimized
                        />
                    </div>

                    {/* Text Content with Border - Flex layout 1:3 */}
                    <div className="relative z-10 overflow-visible rounded-lg border-2 border-[#3a76a5] bg-white">
                        <div className="absolute left-[-20px] top-1/2 z-20 w-[150px] -translate-y-1/2 md:w-[250px] lg:w-[320px]">
                            <Image
                                src="/landing-page/PAGE 7/43.png"
                                alt="Phiếu Kiểm Nghiệm"
                                width={320}
                                height={448}
                                className="h-auto w-full rounded-lg object-contain"
                                style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2)' }}
                                quality={100}
                                unoptimized
                            />
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-2/5"></div>

                            <div className="relative w-full space-y-6 p-8 md:w-3/5 md:p-12">
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
            <section className="relative z-10 mt-[60px] w-full bg-slate-50 py-20">
                <div className="mx-auto w-full max-w-[1440px] px-4 text-center md:px-8">
                    <h2 className="section-title mb-8 font-extrabold uppercase">
                        HƯỚNG DẪN SỬ DỤNG
                    </h2>

                    <div className="relative overflow-hidden rounded-2xl shadow-lg">
                        {/* Content Flex */}
                        <div className="relative z-10 flex flex-col items-start justify-center gap-12 rounded-2xl bg-[#EFF6FF] p-8 md:flex-row md:gap-16 md:p-12">
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
            <section className="relative z-10 w-full bg-slate-50 py-20">
                <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8">
                    <h2 className="section-title mb-8 text-center font-extrabold uppercase">
                        Đánh Giá Từ Khách Hàng
                    </h2>

                    <div className="mb-20 flex flex-col gap-8 md:flex-row">
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
                            { label: "Hiệu Quả", percentage: 92, color: "#a7c1d3" },
                            { label: "Dưỡng ẩm", percentage: 88, color: "#a7c1d3" },
                            { label: "Kích ứng", percentage: 3, color: "#a7c1d3" },
                        ]}
                    />
                </div>
            </section>

            {/* FOOTER / BRAND STORY */}
            <footer className="relative z-10 overflow-hidden py-32">
                {/* Logo Image - Independent container */}
                <div className="mb-[-100px] flex justify-center">
                    <div className="relative">
                        <Image
                            src="/landing-page/PAGE 10/53.png"
                            alt="Cellic Logo"
                            width={1800}
                            height={500}
                            className="h-auto w-full object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Brand Story Box with CSS Gradient - Independent container */}
                <div className="relative z-10 mx-auto w-full max-w-none px-4 text-center md:w-[70vw] lg:w-[60vw]">
                    <div className="relative overflow-hidden rounded-t-[4rem] bg-gradient-to-b from-[#D1E9FC] to-white px-8 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
                        <h2 className="font-heading mb-6 text-[35px] font-extrabold uppercase tracking-tight text-[#2b6493] md:mb-8">
                            Câu Chuyện Thương Hiệu
                        </h2>
                        <div className="mx-auto max-w-3xl text-[20px] font-medium leading-relaxed text-[#235e8f]">
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

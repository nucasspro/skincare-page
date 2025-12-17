"use client"

import { Shield, Star } from "lucide-react"
import Image from "next/image"
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
            <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow text-left">
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
}

function StatsBarItem({ label, percentage, color }: StatsBarItemProps) {
    return (
        <div className="flex items-center gap-4">
            <span
                className="text-slate-500 whitespace-nowrap flex-shrink-0 w-24 text-right"
                style={{ fontFamily: QuicksandFont.style.fontFamily, fontSize: '22.3px' }}
            >
                {label}
            </span>
            <div className="flex-1 h-16 bg-slate-200/50 relative">
                <div className="absolute top-0 left-0 h-full" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
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
        <div className="flex flex-col md:flex-row overflow-hidden gap-0" style={{ backgroundColor: '#92CEE3' }}>
            {isImageLeft && (
                <div className="w-full md:w-[20%] h-48 md:h-auto flex-shrink-0 relative m-0 p-0 overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={imageWidth}
                        height={imageHeight}
                        className="object-contain w-full h-full"
                        quality={100}
                        unoptimized
                    />
                </div>
            )}
            <div className="w-full md:w-[80%] p-4 md:p-6 flex flex-col justify-center text-left">
                <h3 className="section-content text-2xl font-extrabold uppercase font-heading">
                    {title}
                </h3>
                <p className="section-content-small">
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
            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center shrink-0 border-4 border-blue-100 overflow-hidden">
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
            <p className="section-content text-lg md:text-xl leading-relaxed pr-30">
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
    items: Array<{ label: string; percentage: number; color: string }>
}

function StatsGraph({ items }: StatsGraphProps) {
    return (
        <div className="max-w-4xl mx-auto">
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
                <div className="flex pl-28 text-xs text-slate-500 justify-between pt-2">
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
            <header className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-[#EAF6FD]">
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

                <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto flex flex-col md:flex-row">
                    {/* Left Section: Text & Product (3/4) */}
                    <div className="relative w-full md:w-3/4 h-full flex flex-col items-center md:pt-20">
                        {/* Header Text */}
                        <div className="text-center px-4 z-40 mb-8 md:mb-12">
                            <h2 className="section-title text-3xl md:text-5xl font-extrabold tracking-widest uppercase font-heading text-[#2F5C91]">
                                Cellic
                            </h2>
                            <h2 className="section-title text-xl md:text-4xl font-extrabold tracking-widest uppercase font-heading text-[#2F5C91]">
                                Bright Matte Sunscreen
                            </h2>
                            <p className="section-content-small text-xs md:text-xl font-medium text-[#537AA8] uppercase tracking-wide">
                                <span className="font-extrabold text-[#2F5C91]">X10</span> Hiệu quả chống nắng - Tái tạo phục hồi da
                            </p>
                        </div>

                        {/* Product Image */}
                        <div className="relative w-[200px] md:w-[350px] z-30 group">
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
                            <div className="absolute top-full left-0 w-full h-full transform scale-y-[-1] opacity-40 origin-top mt-80 pointer-events-none -z-10 bg-gradient-to-b from-transparent to-white/20"
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
                    <div className="relative w-full md:w-1/4 h-full">
                        {/* Model Image - Right */}
                        <div className="absolute top-[20%] md:top-[15%] left-1/2 -translate-x-1/2 w-[80%] md:w-full h-[50%] md:h-[70%] z-20">
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
            <section className="py-20 bg-[#F0F9FF] relative overflow-hidden z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F5C91] uppercase mb-3 font-heading">
                            Kem Chống Nắng Thế Hệ Mới
                        </h2>
                        <div className="inline-block border border-[#BFDBFE] bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full">
                            <p className="text-[#2563EB] font-semibold text-sm uppercase tracking-wider">
                                Thấu hiểu và đồng hành cùng làn da Việt
                            </p>
                        </div>
                    </div>

                    <div className="relative h-[600px] flex items-center justify-center">
                        {/* Connecting Lines SVG */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
                            style={{ zIndex: 0 }}
                        >
                            {/* Left Curves */}
                            <path
                                d="M50% 50% Q 30% 30% 20% 20%"
                                fill="none"
                                stroke="#BFDBFE"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                            ></path>
                            <path
                                d="M50% 50% Q 25% 50% 15% 50%"
                                fill="none"
                                stroke="#BFDBFE"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                            ></path>
                            <path
                                d="M50% 50% Q 30% 70% 20% 80%"
                                fill="none"
                                stroke="#BFDBFE"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                            ></path>
                            {/* Right Curves */}
                            <path
                                d="M50% 50% Q 70% 30% 80% 20%"
                                fill="none"
                                stroke="#BFDBFE"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                            ></path>
                            <path
                                d="M50% 50% Q 75% 50% 85% 50%"
                                fill="none"
                                stroke="#BFDBFE"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                            ></path>
                            <path
                                d="M50% 50% Q 70% 70% 80% 80%"
                                fill="none"
                                stroke="#BFDBFE"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                            ></path>
                            {/* Dots */}
                            <circle cx="20%" cy="20%" r="6" fill="#BFDBFE"></circle>
                            <circle cx="15%" cy="50%" r="6" fill="#BFDBFE"></circle>
                            <circle cx="20%" cy="80%" r="6" fill="#BFDBFE"></circle>
                            <circle cx="80%" cy="20%" r="6" fill="#BFDBFE"></circle>
                            <circle cx="85%" cy="50%" r="6" fill="#BFDBFE"></circle>
                            <circle cx="80%" cy="80%" r="6" fill="#BFDBFE"></circle>
                        </svg>

                        {/* Center Product */}
                        <div className="relative z-10 w-48 md:w-64 transform -rotate-6">
                            <div className="w-full aspect-[1/2] bg-white drop-shadow-2xl rounded-2xl border border-blue-100 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-[#2F5C91] text-lg md:text-2xl font-extrabold">CELLIC</div>
                                    <div className="text-[#2F5C91] text-xs md:text-sm font-bold mt-1">SPF 50+</div>
                                </div>
                            </div>
                            {/* Ring Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[80%] border border-blue-200 rounded-full opacity-50 animate-pulse pointer-events-none"></div>
                        </div>

                        {/* Features - Absolutely Positioned for Desktop */}
                        {/* Left Top */}
                        <div className="absolute top-10 left-10 md:left-20 w-40 text-center md:text-right">
                            <h3 className="font-bold text-[#2F5C91] text-lg uppercase leading-tight font-heading">
                                4 Màng Lọc<br />Thế Hệ Mới
                            </h3>
                        </div>
                        {/* Left Middle */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-10 w-40 text-center md:text-right">
                            <h3 className="font-bold text-[#2F5C91] text-lg uppercase leading-tight font-heading">PDRN</h3>
                        </div>
                        {/* Left Bottom */}
                        <div className="absolute bottom-10 left-10 md:left-20 w-40 text-center md:text-right">
                            <h3 className="font-bold text-[#2F5C91] text-lg uppercase leading-tight font-heading">
                                Lành Tính<br />Dịu Nhẹ
                            </h3>
                        </div>

                        {/* Right Top */}
                        <div className="absolute top-10 right-10 md:right-20 w-40 text-center md:text-left">
                            <h3 className="font-bold text-[#2F5C91] text-lg uppercase leading-tight font-heading">
                                Kiềm Dầu Suốt 8h
                            </h3>
                        </div>
                        {/* Right Middle */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-10 w-40 text-center md:text-left">
                            <h3 className="font-bold text-[#2F5C91] text-lg uppercase leading-tight font-heading">
                                Nâng Tone<br />Tự Nhiên
                            </h3>
                        </div>
                        {/* Right Bottom */}
                        <div className="absolute bottom-10 right-10 md:right-20 w-40 text-center md:text-left">
                            <h3 className="font-bold text-[#2F5C91] text-lg uppercase leading-tight font-heading">
                                Phục Hồi<br />Tổn Thương
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: 3-LAYER PROTECTION */}
            <section className="py-20 px-4 relative z-10">
                <div className="max-w-6xl mx-auto bg-[#E6F4FA] rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-sm">
                    {/* Background Swirl */}
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/60 to-transparent opacity-50 pointer-events-none"></div>

                    <div className="text-center mb-12 relative z-10">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-[#2F5C91] uppercase tracking-tight font-heading">
                            Tính năng bảo vệ 3 lớp toàn diện
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
                        {/* Content Left */}
                        <div className="space-y-10 pl-4 md:pl-8">
                            {/* Item 1 */}
                            <div className="relative group">
                                <div className="hidden md:block absolute -right-20 top-1/2 w-20 h-px bg-blue-300 transform rotate-12 origin-left"></div>
                                <h3 className="text-lg font-bold text-slate-600 mb-1 font-heading">
                                    Bảo vệ da trước tác động<br />của tia UVA, UVB, HEV
                                </h3>
                            </div>
                            {/* Item 2 */}
                            <div className="relative group">
                                <div className="hidden md:block absolute -right-20 top-1/2 w-20 h-px bg-blue-300"></div>
                                <h3 className="text-lg font-bold text-slate-600 mb-1 font-heading">
                                    Bảo vệ khỏi tác động từ<br />ô nhiễm môi trường và bụi mịn
                                </h3>
                            </div>
                            {/* Item 3 */}
                            <div className="relative group">
                                <div className="hidden md:block absolute -right-20 top-1/2 w-20 h-px bg-blue-300 transform -rotate-12 origin-left"></div>
                                <h3 className="text-lg font-bold text-slate-600 mb-1 font-heading">
                                    Bảo vệ song song<br />nuôi dưỡng hệ vi sinh
                                </h3>
                            </div>

                            <div className="pt-4">
                                <button className="px-10 py-3 rounded-full bg-transparent border-2 border-[#2F5C91] text-[#2F5C91] font-bold uppercase hover:bg-[#2F5C91] hover:text-white transition-colors font-heading">
                                    Xem thêm
                                </button>
                            </div>
                        </div>

                        {/* Visual Right */}
                        <div className="relative flex justify-center md:justify-end">
                            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center p-6 shadow-xl relative overflow-hidden">
                                {/* Model holding product - Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50 opacity-90 rounded-full"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
                                {/* Overlay Product */}
                                <div className="absolute bottom-4 right-10 w-24 h-48 bg-white transform rotate-6 shadow-lg rounded-xl z-20 border border-white flex items-center justify-center">
                                    <span className="text-[#2F5C91] text-xs font-bold">CELLIC</span>
                                </div>
                                {/* Shield Icons Overlay */}
                                <div className="absolute top-10 left-10 p-2 bg-white/80 rounded-full shadow-sm">
                                    <Shield className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: INGREDIENTS */}
            <section className="py-20 bg-white relative z-10 w-full">
                <div className="w-[80vw] mx-auto px-4 text-center">
                    <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
                        {/* Left Visual: Product Images */}
                        <div className="w-full md:w-5/12 relative h-80 flex items-center justify-center">
                            <Image
                                src="/landing-page/PAGE 4/product.png"
                                alt="Cellic Products"
                                width={800}
                                height={800}
                                className="w-full max-w-[700px] md:max-w-[700px] h-auto object-contain"
                                quality={100}
                                unoptimized
                            />
                        </div>

                        {/* Right Content */}
                        <div className="w-full md:w-7/12 space-y-2">
                            <h2 className="section-title font-extrabold uppercase tracking-tight">
                                Thành Phần
                            </h2>

                            <div className="space-y-2">
                                <div>
                                    <h3 className="section-content font-extrabold uppercase mb-1 font-heading">
                                        Màng lọc chống nắng hiện đại
                                    </h3>
                                    <p className="section-content-small leading-relaxed">
                                        Ultrafine Titanium Dioxide, Nano Zinc Oxide, Uvinul A Plus, Octinoxate
                                    </p>
                                </div>
                                <div>
                                    <h3 className="section-content font-extrabold uppercase mb-1 font-heading">PDRN Thực Vật</h3>
                                    <p className="section-content-small leading-relaxed">
                                        Từ nguyên liệu rau má giúp phục hồi và tái tạo da. Hoa oải hương và kim ngân hoa giúp kháng viêm,
                                        giảm kích ứng.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="section-content font-extrabold uppercase mb-1 font-heading">Propanediol</h3>
                                    <p className="section-content-small leading-relaxed">
                                        Có độ tinh khiết cao và mang lại hiệu quả bền vững.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: PDRN INFO */}
            <section className="py-20 bg-slate-50 relative z-10 w-full">
                <div className="w-[80vw] mx-auto px-4 text-center">
                    <h2 className="section-title font-extrabold uppercase mb-8">
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
            <section className="py-20 relative z-10">
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

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    {/* Container with 3C, Header and BenefitsContainer - All same width */}
                    <div className="max-w-6xl relative">
                        {/* Large "3C" - On top */}
                        <div className="absolute top-20 left-[-30] text-[#3a76a5] leading-none select-none pointer-events-none z-20" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: '256px' }}>
                            3
                        </div>
                        <div className="absolute top-32 left-[115] text-[#3a76a5] leading-none select-none pointer-events-none z-20" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: '130px' }}>
                            C
                        </div>

                        {/* Header - On top, below 3C */}
                        <div className="relative z-20 top-4 left-[220] mb-16 pt-32">
                            <h2 className="text-right md:text-left font-heading uppercase tracking-tight" style={{ fontSize: '35px' }}>
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
            </section>

            {/* SECTION 7: DEEP PROTECTION */}
            <section className="py-20 bg-white relative z-10 w-full overflow-visible mt-[100px]">
                <div className="w-[80vw] mx-auto px-4 relative">
                    {/* Image at top left, overlapping border */}
                    <div className="absolute top-[-100px] left-[-40px] md:left-[-80px] z-20">
                        <Image
                            src="/landing-page/PAGE 7/42.png"
                            alt=""
                            width={200}
                            height={200}
                            className="w-[250px] md:w-[300px] h-auto object-contain"
                            quality={100}
                            unoptimized
                        />
                    </div>
                    <div className="bg-[#EFF6FF] rounded-[3rem] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
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
            <section className="py-20 relative overflow-visible z-10 mt-[60px]">
                <div className="w-[80vw] mx-auto px-4 relative z-10">
                    {/* Image at top right corner of border */}
                    <div className="absolute top-[-140px] right-[-170px] z-30">
                        <Image
                            src="/landing-page/PAGE 1/4.png"
                            alt=""
                            width={250}
                            height={250}
                            className="w-[180px] md:w-[250px] h-auto object-contain"
                            quality={100}
                            unoptimized
                        />
                    </div>

                    {/* Text Content with Border - Flex layout 1:3 */}
                    <div className="relative border-2 border-[#3a76a5] rounded-lg bg-white z-10 overflow-visible">
                        <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-[150px] md:w-[250px] lg:w-[320px]">
                            <Image
                                src="/landing-page/PAGE 7/43.png"
                                alt="Phiếu Kiểm Nghiệm"
                                width={320}
                                height={448}
                                className="w-full h-auto object-contain rounded-lg"
                                style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2)' }}
                                quality={100}
                                unoptimized
                            />
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-2/5"></div>

                            <div className="w-full md:w-3/5 p-8 md:p-12 space-y-6 relative">
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
                        <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-16 p-8 md:p-12 items-start justify-center bg-[#EFF6FF] rounded-2xl">
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
                            { label: "Hiệu Quả", percentage: 92, color: "#a7c1d3" },
                            { label: "Dưỡng ẩm", percentage: 88, color: "#a7c1d3" },
                            { label: "Kích ứng", percentage: 3, color: "#a7c1d3" },
                        ]}
                    />
                </div>
            </section>

            {/* FOOTER / BRAND STORY */}
            <footer className="py-32 relative overflow-hidden z-10">
                {/* Logo Image - Independent container */}
                <div className="flex justify-center mb-[-100px]">
                    <div className="relative">
                        <Image
                            src="/landing-page/PAGE 10/53.png"
                            alt="Cellic Logo"
                            width={1800}
                            height={500}
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Brand Story Box with CSS Gradient - Independent container */}
                <div className="w-[60vw] max-w-none mx-auto text-center relative z-10">
                    <div className="relative overflow-hidden rounded-t-[4rem] bg-gradient-to-b from-[#D1E9FC] to-white py-12 md:py-16 lg:py-20 px-8 md:px-12 lg:px-16">
                        <h2 className="text-[35px] font-extrabold text-[#2b6493] tracking-tight uppercase mb-6 md:mb-8 font-heading">
                            Câu Chuyện Thương Hiệu
                        </h2>
                        <div className="text-[20px] text-[#235e8f] leading-relaxed max-w-3xl mx-auto font-medium">
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

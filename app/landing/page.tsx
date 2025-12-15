"use client"

import { Droplet, Shield, Star, SunMedium } from "lucide-react"
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
        .section-content {
          font-family: ${montserratFamily}, 'Montserrat', sans-serif;
          font-size: 20px;
          color: #3a76a5;
          line-height: 1.96;
        }
      `}</style>

            {/* HERO SECTION */}
            <header className="relative bg-gradient-to-b from-[#D8EBF9] via-[#E8F4FC] to-white pb-10 pt-10 md:pt-16 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    {/* Header Text */}
                    <div className="text-center mb-4 md:mb-8">
                        <h2 className="text-xl md:text-2xl font-bold tracking-[0.2em] text-slate-400 uppercase mb-1 font-heading">
                            Cellic
                        </h2>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#2F5C91] uppercase tracking-tight mb-2 font-heading">
                            Bright Matte Sunscreen
                        </h1>
                        <p className="text-sm md:text-base font-semibold text-slate-500 uppercase tracking-wide">
                            <span className="font-extrabold text-[#2276D3]">X10</span> Hiệu quả chống nắng - Tái tạo phục hồi da
                        </p>
                    </div>

                    {/* Hero Visual */}
                    <div className="relative w-full h-[400px] md:h-[500px] mt-8">
                        {/* Water Surface Effect */}
                        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#BDE0FE]/60 to-transparent"></div>

                        <div className="absolute inset-0 flex items-end justify-center">
                            {/* Product Group (Left/Center) */}
                            <div className="relative z-20 transform md:-translate-x-20 mb-10 flex items-end gap-2 md:gap-4">
                                {/* Small Tube */}
                                <div className="w-16 md:w-20 transform -rotate-12 translate-y-4">
                                    <div className="w-full aspect-[2/5] bg-gradient-to-b from-white to-[#E8F4FC] shadow-lg rounded-b-lg opacity-90 border border-blue-100 flex items-center justify-center">
                                        <span className="text-[#2F5C91] text-[8px] font-bold">CELLIC</span>
                                    </div>
                                </div>
                                {/* Main Tube */}
                                <div className="w-24 md:w-32 z-10 transform translate-y-8">
                                    <div className="w-full aspect-[2/5] bg-white shadow-2xl rounded-b-lg border-b-4 border-blue-200 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-[#2F5C91] text-xs md:text-sm font-extrabold">CELLIC</div>
                                            <div className="text-[#2F5C91] text-[8px] md:text-[10px] font-bold mt-1">SPF 50+</div>
                                        </div>
                                    </div>
                                </div>
                                {/* Another Tube */}
                                <div className="w-16 md:w-20 transform rotate-12 translate-y-4">
                                    <div className="w-full aspect-[2/5] bg-gradient-to-b from-white to-[#E8F4FC] shadow-lg rounded-b-lg opacity-90 border border-blue-100 flex items-center justify-center">
                                        <span className="text-[#2F5C91] text-[8px] font-bold">CELLIC</span>
                                    </div>
                                </div>
                                {/* Reflection Shadow */}
                                <div className="absolute -bottom-16 left-0 right-0 h-16 bg-blue-900/20 blur-xl rounded-[100%]"></div>
                            </div>

                            {/* Model (Right) - Placeholder for now */}
                            <div className="absolute right-0 md:right-10 bottom-0 z-10 w-1/2 md:w-1/3 h-[90%] flex items-end">
                                <div className="w-full h-full bg-gradient-to-t from-blue-100 to-transparent rounded-t-full opacity-50"></div>
                            </div>
                        </div>

                        {/* Water Ripples */}
                        <div className="absolute bottom-0 left-0 w-full">
                            <svg
                                className="w-full h-24 text-[#E0F2FE] opacity-80"
                                viewBox="0 0 1440 320"
                                preserveAspectRatio="none"
                            >
                                <path
                                    fill="currentColor"
                                    fillOpacity="1"
                                    d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                                ></path>
                            </svg>
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
            <section className="py-16 px-4 relative z-10">
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
            <section className="py-24 bg-white relative z-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-[#F1F5F9] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
                        {/* Left Visual: Podiums */}
                        <div className="w-full md:w-5/12 relative h-80 flex items-end justify-center">
                            {/* Podium 1 */}
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-t-full rounded-b-lg shadow-lg flex items-end justify-center pb-2 z-10">
                                <div className="mb-4 transform -rotate-12 w-12 h-20 bg-gradient-to-b from-[#2F5C91] to-[#1e3a8a] rounded shadow-md"></div>
                            </div>
                            {/* Podium 2 (Center High) */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-40 bg-white rounded-t-full rounded-b-lg shadow-xl z-20 flex items-end justify-center pb-4">
                                <div className="mb-4 w-16 h-32 bg-white border-2 border-[#2F5C91] rounded shadow-md flex items-center justify-center">
                                    <span className="text-[#2F5C91] text-xs font-bold">CELLIC</span>
                                </div>
                            </div>
                            {/* Podium 3 */}
                            <div className="absolute bottom-0 right-0 w-24 h-16 bg-white rounded-t-full rounded-b-lg shadow-lg flex items-end justify-center pb-2 z-10">
                                <div className="mb-2 transform rotate-12 w-14 h-16 bg-gradient-to-b from-[#2F5C91] to-[#1e3a8a] rounded shadow-md"></div>
                            </div>
                            {/* Floor Shadow */}
                            <div className="absolute -bottom-4 w-full h-8 bg-slate-300/30 blur-lg rounded-full"></div>
                        </div>

                        {/* Right Content */}
                        <div className="w-full md:w-7/12 space-y-8">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F5C91] uppercase tracking-tight font-heading">
                                Thành Phần
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-[#2F5C91] uppercase mb-1 font-heading">
                                        Màng lọc chống nắng hiện đại
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Ultrafine Titanium Dioxide, Nano Zinc Oxide, Uvinul A Plus, Octinoxate
                                    </p>
                                </div>
                                <div className="w-full h-px bg-slate-200"></div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#2F5C91] uppercase mb-1 font-heading">PDRN Thực Vật</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Từ nguyên liệu rau má giúp phục hồi và tái tạo da. Hoa oải hương và kim ngân hoa giúp kháng viêm,
                                        giảm kích ứng.
                                    </p>
                                </div>
                                <div className="w-full h-px bg-slate-200"></div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#2F5C91] uppercase mb-1 font-heading">Propanediol</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Có độ tinh khiết cao và mang lại hiệu quả bền vững.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: PDRN INFO */}
            <section className="py-16 bg-white relative z-10">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F5C91] text-center mb-12 uppercase font-heading">
                        PDRN - Có thể bạn chưa biết?
                    </h2>

                    <div className="flex flex-col gap-6">
                        {/* Bar 1: Skin Tone Gradient */}
                        <div className="flex flex-col md:flex-row overflow-hidden rounded-r-2xl">
                            <div className="md:w-48 h-32 md:h-auto flex-shrink-0 relative bg-gradient-to-br from-blue-100 to-blue-50"></div>
                            <div className="flex-1 bg-gradient-to-r from-[#81C3D7] to-[#A0D2EB] p-6 md:p-8 flex flex-col justify-center text-white md:rounded-r-2xl">
                                <h3 className="text-xl font-bold uppercase mb-2 text-[#164e63] font-heading">
                                    Hỗ trợ tái tạo tế bào da
                                </h3>
                                <p className="text-[#0e7490] font-medium">
                                    Kích thích sự tăng sinh của tế bào sừng và nguyên bào sợi, giúp phục hồi da bị tổn thương.
                                </p>
                            </div>
                        </div>

                        {/* Bar 2: Light Orange Gradient */}
                        <div className="flex flex-col md:flex-row overflow-hidden rounded-l-2xl">
                            <div className="flex-1 bg-gradient-to-r from-[#FBC3BC] to-[#F7D9C4] p-6 md:p-8 flex flex-col justify-center text-white order-2 md:order-1 md:rounded-l-2xl">
                                <h3 className="text-xl font-bold uppercase mb-2 text-[#9a3412] font-heading">
                                    Phục hồi làn da tổn thương (Wound healing)
                                </h3>
                                <p className="text-[#c2410c] font-medium">
                                    Kích hoạt quá trình tăng sinh và tái tạo mô bị tổn thương. Kích thích VEGF và Angiopoietin nhằm
                                    thúc đẩy quá trình khét miệng vết thương.
                                </p>
                            </div>
                            <div className="md:w-48 h-32 md:h-auto flex-shrink-0 relative bg-gradient-to-br from-orange-100 to-orange-50 order-1 md:order-2"></div>
                        </div>

                        {/* Bar 3: Blue Gradient */}
                        <div className="flex flex-col md:flex-row overflow-hidden rounded-r-2xl">
                            <div className="md:w-48 h-32 md:h-auto flex-shrink-0 relative bg-gradient-to-br from-cyan-100 to-cyan-50"></div>
                            <div className="flex-1 bg-gradient-to-r from-[#98C1D9] to-[#E0FBFC] p-6 md:p-8 flex flex-col justify-center text-white md:rounded-r-2xl">
                                <h3 className="text-xl font-bold uppercase mb-2 text-[#1e3a8a] font-heading">Bảo vệ tế bào trước tia UVB</h3>
                                <p className="text-[#1d4ed8] font-medium">
                                    Tăng khả năng sống của tế bào và giảm thiểu tác hại oxy hóa, hỗ trợ củng cố hàng rào da.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: 3C (USES) */}
            <section className="py-24 relative overflow-hidden bg-[#F8FAFC] z-10">
                <div className="absolute -left-20 top-0 text-[20rem] font-black text-[#E2E8F0]/40 leading-none select-none pointer-events-none z-0 font-heading">
                    3
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-16">
                        {/* The "3" title alignment fix */}
                        <div className="w-full md:w-1/3 h-40"></div> {/* Spacer for absolute 3 */}
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl md:text-5xl font-extrabold text-[#2F5C91] uppercase tracking-tight text-right md:text-left font-heading">
                                Công dụng "Không Tưởng"<br />của CELLIC Matte Sunscreen
                            </h2>
                        </div>
                    </div>

                    <div className="bg-[#EBF8FF] rounded-[3rem] p-8 md:p-16 space-y-12">
                        {/* Item 1 */}
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center shrink-0 border-4 border-blue-100">
                                <div className="w-12 h-12 rounded-full bg-[#2F5C91]/20 flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-[#2F5C91] opacity-50" />
                                </div>
                            </div>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                                Chống nắng đạt chuẩn SPF 50+ PA++++, kiềm dầu suốt 8h và cân bằng hệ vi sinh da, duy trì hàng rào bảo
                                vệ tự nhiên.
                            </p>
                        </div>
                        {/* Item 2 */}
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center shrink-0 border-4 border-blue-100">
                                <div className="w-12 h-12 rounded-full bg-[#2F5C91]/20 flex items-center justify-center">
                                    <SunMedium className="w-6 h-6 text-[#2F5C91] opacity-50" />
                                </div>
                            </div>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                                Hiệu ứng soft focus, che phủ khuyết điểm nhẹ nhàng và nâng tone mịn đẹp.
                            </p>
                        </div>
                        {/* Item 3 */}
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center shrink-0 border-4 border-blue-100">
                                <div className="w-12 h-12 rounded-full bg-[#2F5C91]/20 flex items-center justify-center">
                                    <Droplet className="w-6 h-6 text-[#2F5C91] opacity-50" />
                                </div>
                            </div>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                                Công thức chứa PDRN thực vật củng cố và giúp da được nuôi dưỡng ở cấp độ tế bào trong 1 bước chống
                                nắng.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 7: DEEP PROTECTION */}
            <section className="py-20 bg-white relative z-10 w-full">
                <div className="w-[80vw] mx-auto px-4">
                    <div className="bg-[#EFF6FF] rounded-[3rem] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left Visual with Text Overlay */}
                        <div className="relative h-[500px] rounded-[2rem] overflow-hidden group">
                            <div className="w-full h-full bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 transition-transform duration-700 group-hover:scale-105"></div>
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                                <h2 className="text-3xl md:text-5xl font-extrabold text-[#2F5C91] uppercase drop-shadow-lg leading-tight font-heading">
                                    Bảo vệ<br />chuyên sâu và<br />nuôi dưỡng<br />chỉ trong<br />1 bước
                                </h2>
                            </div>
                        </div>

                        {/* Right Text Content */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-[#2F5C91] uppercase mb-2 font-heading">
                                    4 Màng Lọc Chống Nắng Hiện Đại
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Với <span className="font-bold text-[#2F5C91]">2 màng lọc Ultrafine Titanium Dioxide & Nano Zinc Oxide</span>{" "}
                                    chống nắng thế hệ mới mang lại hiệu quả bảo vệ đa tầng:<br />
                                    1. Bảo vệ da trước tác động của tia UVA, UVB, HEV.<br />
                                    2. Bảo vệ khỏi tác động từ ô nhiễm môi trường và bụi mịn.<br />
                                    3. Bảo vệ song song nuôi dưỡng hệ vi sinh.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#2F5C91] uppercase mb-2 font-heading">
                                    Công Nghệ Smart Oil Control Kết Hợp Công Nghệ Hạt Nano
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Duy trì cảm giác thoáng da - ráo mặt - không bóng nhờn suốt 8 giờ. Tạo hiệu ứng soft focus, che phủ
                                    khuyết điểm nhẹ nhàng, cho Finish mỏng nhẹ, mịn đẹp.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#2F5C91] uppercase mb-2 font-heading">Công Nghệ Microbiome</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Làm dịu và cân bằng hệ vi sinh, bảo vệ làn da nhạy cảm.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 8: CERTIFICATE */}
            <section className="py-24 relative overflow-visible z-10">
                <div className="w-[80vw] h-[20vh] mx-auto px-4 relative z-10">
                    {/* Certificate Image - Positioned separately, larger, overlapping left */}
                    <div className="absolute left-[-100px] md:left-[-450px] top-1/2 -translate-y-1/2 z-20 w-[800px] md:w-[1000px] lg:w-[1200px] rounded-lg">
                        <Image
                            src="/landing-page/PAGE 7/43.png"
                            alt="Phiếu Kiểm Nghiệm"
                            width={1200}
                            height={1680}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Text Content with Border - Positioned to the right, image overlaps left */}
                    <div className="relative ml-[300px] md:ml-[400px] lg:ml-[200px] border-2 border-[#3a76a5] rounded-lg p-8 md:p-12 space-y-6 bg-white z-10">
                        <h2 className="section-title font-extrabold uppercase tracking-tight">
                            PHIẾU KIỂM NGHIỆM
                        </h2>
                        <p className="section-content">
                            Phiếu kết quả nghiên cứu và phát triển sản phẩm thiên nhiên cấp vào ngày 28/10/2025, đảm bảo uy tín.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 9: HOW TO USE */}
            <section className="py-20 bg-slate-50 relative z-10 w-full">
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

"use client";

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

export default function StatsBarItem({ label, percentage, color, index, hoveredIndex, hoveredPart, onMouseEnterPercentage1, onMouseLeavePercentage1, onMouseEnterPercentage2, onMouseLeavePercentage2, value1, percentage1, value2, percentage2 }: StatsBarItemProps) {
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
                className="text-slate-500 whitespace-nowrap flex-shrink-0 w-24 text-right font-quicksand"
                style={{ fontSize: '22.3px' }}
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

"use client";

import { useState } from "react";
import StatsBarItem from './StatsBarItem';

interface StatsGraphProps {
    items: Array<{ label: string; percentage: number; color: string; value1: number; percentage1: number; value2: number; percentage2: number }>
}

export default function StatsGraph({ items }: StatsGraphProps) {
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
                    <span className="font-quicksand text-[18px] md:text-[22.3px]">0%</span>
                    <span className="hidden md:inline font-quicksand text-[18px] md:text-[22.3px]">20%</span>
                    <span className="font-quicksand text-[18px] md:text-[22.3px]">40%</span>
                    <span className="hidden md:inline font-quicksand text-[18px] md:text-[22.3px]">60%</span>
                    <span className="font-quicksand text-[18px] md:text-[22.3px]">80%</span>
                    <span className="font-quicksand text-[18px] md:text-[22.3px]">100%</span>
                </div>
            </div>
        </div>
    )
}

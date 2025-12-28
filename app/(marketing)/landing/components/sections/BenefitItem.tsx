"use client";

import Image from 'next/image';

interface BenefitItemProps {
    imageSrc: string
    text: string
}

export default function BenefitItem({ imageSrc, text }: BenefitItemProps) {
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
            <p className="text-body text-center md:text-left px-4 md:px-0 md:pr-30">
                {text}
            </p>
        </div>
    )
}

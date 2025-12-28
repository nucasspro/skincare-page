"use client";

import Image from 'next/image';

interface StepProps {
    imageSrc: string
    alt: string
    text: string
}

export default function Step({ imageSrc, alt, text }: StepProps) {
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

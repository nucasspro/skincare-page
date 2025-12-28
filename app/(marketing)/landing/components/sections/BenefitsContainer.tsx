"use client";

import Image from 'next/image';
import BenefitItem from './BenefitItem';

interface BenefitsContainerProps {
    items: Array<{ imageSrc: string; text: string }>
    backgroundImage: string
}

export default function BenefitsContainer({ items, backgroundImage }: BenefitsContainerProps) {
    return (
        <div className="relative rounded-[3rem] md:p-10 space-y-16 mb-10">
            <div className="hidden md:block absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt=""
                    fill
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

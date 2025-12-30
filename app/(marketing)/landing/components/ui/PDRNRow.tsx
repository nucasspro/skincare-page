"use client";

import Image from 'next/image';

interface PDRNRowProps {
    imageSrc: string
    imageAlt: string
    title: string
    description: string
    imagePosition: 'left' | 'right'
}

export default function PDRNRow({ imageSrc, imageAlt, title, description, imagePosition }: PDRNRowProps) {
    const isImageLeft = imagePosition === 'left';
    const imageOrder = isImageLeft ? 'order-1 md:order-none' : 'order-1 md:order-2';
    const contentOrder = isImageLeft ? 'order-2 md:order-none' : 'order-2 md:order-1';

    return (
        <div className="w-full flex flex-col md:flex-row overflow-hidden bg-gradient-to-b from-[#B2DBED] to-[#C1E0F2] rounded-none md:rounded-[20px] p-0 md:p-6 gap-0 md:gap-6">
            <div className={`w-full md:w-[180px] h-[200px] md:h-[180px] flex-shrink-0 ${imageOrder} justify-center items-center`}>
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-none md:rounded-[20px]"
                    quality={100}
                    unoptimized
                />
            </div>
            <div className={`flex-1 flex flex-col justify-center p-4 md:p-0 ${contentOrder}`}>
                <h3 className="text-body !font-bold mb-1">{title}</h3>
                <p className="text-body text-justify">{description}</p>
            </div>
        </div>
    );
}

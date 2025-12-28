"use client";

import Image from 'next/image';

interface CloudBackgroundProps {
  imageSrc: string;
  scale?: number;
  objectPosition?: string;
}

export default function CloudBackground({
  imageSrc,
  scale = 1,
  objectPosition = "center"
}: CloudBackgroundProps) {
  const getObjectPositionClass = () => {
    if (objectPosition === "right-top") {
      return "object-cover object-center md:object-right-top";
    }
    return "object-cover";
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Image
        src={imageSrc}
        alt="Cloud background"
        fill
        className={getObjectPositionClass()}
        style={{ transform: scale !== 1 ? `scale(${scale})` : undefined }}
        quality={100}
        priority
        unoptimized
      />
    </div>
  );
}

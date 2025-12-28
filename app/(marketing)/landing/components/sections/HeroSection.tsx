"use client";

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center snap-center z-10">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="/landing-page/PAGE 1/1.png"
          alt="Hero background"
          fill
          className="object-cover object-center"
          quality={100}
          unoptimized
          priority
        />
      </div>
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-start pt-[100px] px-10 pb-0">
        <div className="text-center w-full max-w-[1200px] order-1">
          <h1 className="text-heading-2 mb-5">
            CELLIC BRIGHT MATTE SUNCREEN
          </h1>
          <p className="text-body-large mt-4 !leading-[1.1]">
            2 IN 1 CHỐNG NẮNG VÀ PHỤC HỒI TRONG CÙNG 1 SẢN PHẨM
          </p>
        </div>
        <div className="flex items-end justify-center w-full max-w-[650px] order-2 mt-auto pb-0">
          <Image
            src="/landing-page/PAGE 1/2.png"
            alt="Cellic Bright Matte Sunscreen"
            width={800}
            height={1000}
            className="w-full h-full max-h-[70vh] object-contain object-center"
            quality={100}
            unoptimized
            priority
          />
        </div>
      </div>
    </section>
  );
}

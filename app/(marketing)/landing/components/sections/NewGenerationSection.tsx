"use client";

import Image from 'next/image';
import FeatureBadge from '../ui/FeatureBadge';

export default function NewGenerationSection() {
  return (
    <section className="w-full min-h-screen py-[120px] px-10 flex items-center justify-center snap-center">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center gap-8 md:gap-45">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-heading-2">KEM CHỐNG NẮNG THẾ HỆ MỚI</h2>
          <p className="text-body-large">THẤU HIỂU VÀ ĐỒNG HÀNH CÙNG LÀN DA VIỆT</p>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
          <div className="flex-none flex flex-col gap-6 md:gap-10 text-center order-1 md:order-none">
            <FeatureBadge text="4 MÀNG LỌC MỚI" />
            <FeatureBadge text="PDRN" />
            <FeatureBadge text="LÀNH TÍNH DỊU NHẸ" />
          </div>
          <div className="relative flex-none flex items-center justify-center w-[300px] h-[300px] md:w-[550px] md:h-[550px] order-2 md:order-none mt-[30px] md:mt-0">
            <Image
              src="/landing-page/PAGE 2/8.png"
              alt="Water background"
              width={600}
              height={600}
              className="absolute w-full h-full object-contain z-[1]"
              quality={100}
              unoptimized
            />
            <Image
              src="/landing-page/PAGE 2/9.png"
              alt="Cellic Sunscreen Tube"
              width={400}
              height={600}
              className="absolute w-[60%] h-auto object-contain z-[2] top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[4deg]"
              quality={100}
              unoptimized
            />
          </div>
          <div className="flex-none flex flex-col gap-6 md:gap-10 text-center order-3 md:order-none">
            <FeatureBadge text="KIỀM DẦU SUỐT 8H" />
            <FeatureBadge text="NÂNG TONE TỰ NHIÊN" />
            <FeatureBadge text="PHỤC HỒI TỪ GỐC" />
          </div>
        </div>
      </div>
    </section>
  );
}

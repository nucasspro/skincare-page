"use client";

import Image from 'next/image';
import Link from 'next/link';
import NumberedList from '../ui/NumberedList';

export default function ThreeLayerProtectionSection() {
  return (
    <section className="landing__three-layer w-full min-h-screen py-[120px] px-10 flex items-center justify-center snap-y snap-mandatory">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        {/* Title */}
        <h2 className="text-heading-2 mb-10 text-center">TÍNH NĂNG BẢO VỆ 3 LỚP TOÀN DIỆN</h2>

        {/* Card with Numbered List and CTA Button */}
        <div className="bg-[#CCDFED] rounded-[40px] p-4 md:p-6 w-full max-w-[900px] flex flex-col items-center gap-6 md:gap-8">
          {/* Numbered List */}
          <NumberedList
            items={[
              "Bảo vệ da trước tác động của tia UVA, UVB, HEV",
              "Bảo vệ khỏi tác động từ ô nhiễm môi trường và bụi mịn",
              "Bảo vệ song song nuôi dưỡng hệ vi sinh"
            ]}
          />

          {/* CTA Button */}
          <Link href="/" className="relative group w-[200px] h-[40px] md:w-[16vw] md:h-[2.5vw] rounded-full border-[2px] md:border-[0.14vw] border-[#2F5C91] shadow-lg overflow-hidden transition-transform flex items-center justify-center">
              <span className="relative z-10 text-body !font-bold uppercase">
                  Xem thêm
              </span>
          </Link>
        </div>

        {/* Model Image */}
        <div className="w-full flex justify-center">
          <Image
            src="/landing-page/PAGE 3/20.png"
            alt="Model with Cellic sunscreen"
            width={400}
            height={500}
            className="w-full max-w-[400px] md:max-w-[500px] h-auto object-contain"
            quality={100}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

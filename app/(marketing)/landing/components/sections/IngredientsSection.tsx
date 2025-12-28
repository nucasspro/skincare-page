"use client";

import Image from 'next/image';

export default function IngredientsSection() {
  return (
    <section className="landing__ingredients w-full min-h-screen py-[120px] px-10 flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col items-center gap-8 md:gap-12">
        {/* Header - outside card */}
        <h2 className="text-heading-2 text-center">THÀNH PHẦN</h2>

        {/* Background Card */}
        <div className="w-full max-w-[900px] bg-gradient-to-b from-[#C7DBE8] to-[#CDE1F3] rounded-[40px] md:rounded-[60px] p-6 md:p-12 flex flex-col gap-6 md:gap-8 text-left md:text-left">
          <div className="flex flex-col gap-4">
            <h3 className="text-[24px] md:text-[32px] font-bold text-[#3a76a5] leading-[1.2]">MÀNG LỌC CHỐNG NẮNG HIỆN ĐẠI</h3>
            <div className="flex flex-col gap-2">
              <p className="text-body text-[#6BA3C7]">Ultrafine Titanium Dioxide, Nano Zinc Oxide, Uvinul A Plus, Octinoxate</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-[24px] md:text-[32px] font-bold text-[#3a76a5] leading-[1.2]">PDRN THỰC VẬT</h3>
            <p className="text-body text-[#6BA3C7]">
              Từ nguyên liệu rau má giúp phục hồi và tái tạo da. Hoa oải hương và kim ngân hoa giúp kháng viêm, giảm kích ứng
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-[24px] md:text-[32px] font-bold text-[#3a76a5] leading-[1.2]">PROPANEDIOL</h3>
            <p className="text-body text-[#6BA3C7]">
              Có độ tinh khiết cao và mang lại hiệu quả bền vững
            </p>
          </div>
        </div>

        {/* Product Image - below content */}
        <div className="w-full flex justify-center">
          <Image
            src="/landing-page/PAGE 4/product.png"
            alt="Cellic sunscreen products"
            width={600}
            height={750}
            className="w-full max-w-[350px] md:max-w-[500px] h-auto object-contain"
            quality={100}
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

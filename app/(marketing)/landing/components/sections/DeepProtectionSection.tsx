"use client";

import Image from 'next/image';
import CloudBackground from '../ui/CloudBackground';
import NumberedList from '../ui/NumberedList';

export default function DeepProtectionSection() {
  return (
    <section className="landing__deep-protection relative w-full py-[120px] px-10">
      {/* Cloud background for this section - different scale and position */}
      <CloudBackground
        imageSrc="/landing-page/PAGE 5/MÂY BACKGROUND.png"
        scale={1.8}
        objectPosition="right-top"
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        {/* Floating mask image - positioned above and to the left of card */}
        <div className="hidden md:block absolute -top-34 -left-34 z-10 w-[500px] h-auto">
          <Image
            src="/landing-page/PAGE 7/42.png"
            alt="Floating mask"
            width={600}
            height={700}
            className="w-full h-auto object-contain"
            quality={100}
            unoptimized
          />
        </div>

        {/* Main card */}
        <div className="relative bg-[#E1F5FF] rounded-[40px] p-6 md:p-12 mt-8 md:mt-32 flex flex-col md:flex-row">
          {/* Left column - 40% for big title */}
          <div className="basis-2/5 flex-shrink-0 flex items-center justify-center order-1 md:order-none mb-6 md:mb-0">
            <h2 className="text-heading-2 text-center">
              <span className="md:hidden">BẢO VỆ CHUYÊN SÂU VÀ NUÔI DƯỠNG CHỈ TRONG 1 BƯỚC</span>
              <span className="hidden md:block">
                BẢO VỆ<br />
                CHUYÊN SÂU VÀ<br />
                NUÔI DƯỠNG<br />
                CHỈ TRONG<br />
                1 BƯỚC
              </span>
            </h2>
          </div>

          {/* Right column - 60% for detailed content */}
          <div className="basis-3/5 flex-shrink-0 flex flex-col gap-6 md:gap-8 pl-0 md:pl-8 order-2 md:order-none text-left">
            <div className="flex flex-col gap-4">
              <h3 className="text-body !font-bold">
                4 MÀNG LỌC CHỐNG NẮNG HIỆN ĐẠI
              </h3>
              <p className="text-body">
                Với 2 màng lọc <strong>Ultrafine Titanium Dioxide & Nano Zinc Oxide</strong> chống nắng thế hệ mới mang lại hiệu quả bảo vệ đa tầng
              </p>
              <NumberedList
                items={[
                  "Bảo vệ da trước tác động của tia UVA, UVB, HEV.",
                  "Bảo vệ khỏi tác động từ ô nhiễm môi trường và bụi mịn",
                  "Bảo vệ song song nuôi dưỡng hệ vi sinh"
                ]}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-body !font-bold">
                CÔNG NGHỆ SMART OIL CONTROL KẾT HỢP <br/>
                CÔNG NGHỆ HẠT NANO
              </h3>
              <p className="text-body">
                Duy trì cảm giác thoáng da - ráo mặt - không bóng nhờn suốt 8 giờ. Tạo hiệu ứng soft focus, che phủ khuyết điểm nhẹ nhàng, cho Finish mỏng nhẹ, mịn đẹp.
              </p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-body !font-bold">
                CÔNG NGHỆ MICROBIOME
              </h3>
              <p className="text-body">
                Làm dịu và cân bằng hệ vi sinh, bảo vệ làn da nhạy cảm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

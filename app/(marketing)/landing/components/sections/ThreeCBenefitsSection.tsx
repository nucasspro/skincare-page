"use client";

import CloudBackground from '../ui/CloudBackground';
import BenefitsContainer from './BenefitsContainer';

export default function ThreeCBenefitsSection() {
  return (
    <section className="relative py-[60px] md:py-[120px] px-10">
      {/* Cloud background for this section */}
      <CloudBackground imageSrc="/landing-page/PAGE 5/MÂY BACKGROUND.png" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-[1.1vw] text-center">
        <div className="max-w-full md:max-w-[100vw] mx-auto px-0 md:px-[1.1vw] relative">
          {/* Container with 3C, Header and BenefitsContainer - All same width */}
          <div className="max-w-full md:max-w-[100vw] relative">
            {/* Large "3C" - On top, hidden on mobile */}
            <div className="hidden md:block absolute top-[5.5vw] left-[-2vw] text-[#3a76a5] leading-none select-none pointer-events-none z-20" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: '17.7vw' }}>
              3
            </div>
            <div className="hidden md:block absolute top-[8.8vw] left-[8vw] text-[#3a76a5] leading-none select-none pointer-events-none z-20" style={{ fontFamily: 'Montserrat', fontWeight: '900', fontSize: '9vw' }}>
              C
            </div>

            {/* Header - On top, below 3C */}
            <div className="relative z-20 mb-6 md:mb-[4.4vw] pt-0 md:pt-[8.8vw] md:top-[1.1vw] md:left-[15.2vw]">
              <h2 className="text-heading-2 text-center md:text-left">
                <span className="md:hidden">3 CÔNG DỤNG "KHÔNG TƯỞNG" CỦA CELLIC MATTE SUNSCREEN</span>
                <span className="hidden md:block">
                  <span className="text-body-large text-[#2F5C91]">ÔNG DỤNG "KHÔNG TƯỞNG"</span>
                  <br />
                  <span className="text-body-large !font-bold text-[#2F5C91]">CỦA CELLIC MATTE SUNSCREEN</span>
                </span>
              </h2>
            </div>

            {/* BenefitsContainer - Background below */}
            <BenefitsContainer
              backgroundImage="/landing-page/PAGE 6/35.png"
              items={[
                {
                  imageSrc: "/landing-page/PAGE 6/36.png",
                  text: "Chống nắng đạt chuẩn SPF 50+ PA++++, kiềm dầu suốt 8h và cân bằng hệ vi sinh da, duy trì hàng rào bảo vệ tự nhiên."
                },
                {
                  imageSrc: "/landing-page/PAGE 6/37.png",
                  text: "Hiệu ứng soft focus, che phủ khuyết điểm nhẹ nhàng và nâng tone mịn đẹp."
                },
                {
                  imageSrc: "/landing-page/PAGE 6/38.png",
                  text: "Công thức chứa PDRN thực vật củng cố và giúp da được nuôi dưỡng ở cấp độ tế bào trong 1 bước chống nắng.  "
                }
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

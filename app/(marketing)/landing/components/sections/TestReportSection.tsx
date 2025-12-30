"use client";

import Image from 'next/image';
import { useState } from "react";
import ImagePopupModal from '../ui/ImagePopupModal';

export default function TestReportSection() {
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  return (
    <>
      <section className="landing__lab-report w-full py-[60px] md:py-[120px] px-10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-16">
          <h2 className="text-heading-2 text-center">PHIẾU KIỂM NGHIỆM</h2>

          <div className="relative w-full border-2 border-[#3a76a5] rounded-[40px] p-6 md:p-12 min-h-[300px] md:min-h-[500px] flex flex-col md:flex-row md:items-center md:mt-30">
            {/* Lab report image - positioned to overlap left side of border on desktop, on top on mobile */}
            <div
              className="relative md:absolute md:-left-8 md:-top-[50] z-10 w-full max-w-[300px] md:w-[500px] md:max-w-[500px] h-auto order-1 md:order-none mb-6 md:mb-0 cursor-pointer mx-auto md:mx-0"
              onClick={() => setIsImagePopupOpen(true)}
            >
              <Image
                src="/landing-page/PAGE 7/43.png"
                alt="Phiếu kết quả thử nghiệm"
                width={600}
                height={800}
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </div>

            {/* Right content - text description */}
            <div className="w-full md:ml-[480px] flex-1 flex items-center order-2 md:order-none">
              <p className="text-body leading-relaxed text-center md:text-left">
                Phiếu kết quả thử nghiệm  được Viện nghiên cứu và phát triển sản phẩm thiên nhiên cấp vào ngày 28/10/2025, đảm bảo uy tín
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Popup Modal */}
      <ImagePopupModal
        isOpen={isImagePopupOpen}
        imageSrc="/landing-page/PAGE 7/43.png"
        imageAlt="Phiếu kết quả thử nghiệm - Xem toàn màn hình"
        onClose={() => setIsImagePopupOpen(false)}
      />
    </>
  );
}

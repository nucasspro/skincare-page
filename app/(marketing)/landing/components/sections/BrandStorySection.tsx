"use client";

import Image from 'next/image';

export default function BrandStorySection() {
  return (
    <section className="w-full min-h-screen pt-[20px] pb-[40px] md:py-[150px] px-10 flex items-center justify-center">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-[20px] md:gap-[50px]">
        <div className="w-full flex items-center justify-center m-0">
          <Image
            src="/landing-page/PAGE 10/53.png"
            alt="Cellic"
            width={900}
            height={400}
            className="w-full max-w-[1200px] h-auto object-contain"
            quality={100}
            unoptimized
          />
        </div>
        <div className="w-full bg-gradient-to-b from-[#9ED4E5] to-[#f6fbfd] rounded-[40px] md:rounded-[80px] py-[40px] px-6 md:py-[70px] md:px-20 flex flex-col items-center gap-[20px] md:gap-[30px]">
          <h2 className="text-heading-2 text-center">CÂU CHUYỆN THƯƠNG HIỆU</h2>
          <p className="text-body text-center max-w-full md:max-w-[850px]">
            Sự kết hợp giữa "Cell" (Tế bào) và "Clinic" (Phòng khám) với triết lý chăm sóc da từ cấp độ tế bào bằng nền tảng khoa học y học chuẩn xác. Với sự thấu hiểu sâu sắc về làn da của người Việt, Cellic là nơi khoa học gặp gỡ sự yêu thương, nơi mỗi công thức không chỉ hiệu quả, mà còn mang lại sự an tâm trọn vẹn.
          </p>
        </div>
      </div>
    </section>
  );
}

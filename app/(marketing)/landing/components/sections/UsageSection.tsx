"use client";

import Step from '../ui/Step';

export default function UsageSection() {
  return (
    <section className="landing__usage w-full py-[120px] px-10">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-12">
        <h2 className="text-heading-2 text-center">HƯỚNG DẪN SỬ DỤNG</h2>

        <div className="w-full bg-[#D5E5EF] rounded-[40px] p-6 md:p-12">
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-start justify-center">
            <Step
              imageSrc="/landing-page/PAGE 8/47.png"
              alt="Step 1"
              text="Sử dụng một lượng vừa đủ, đảm bảo che phủ toàn mặt và cổ."
            />
            <Step
              imageSrc="/landing-page/PAGE 8/48.png"
              alt="Step 2"
              text="Thao tác thoa dàn trải từ trong ra ngoài, giúp kem dàn đều và thấm vào da."
            />
            <Step
              imageSrc="/landing-page/PAGE 8/49.png"
              alt="Step 3"
              text="Sử dụng trước khi ra nắng 15 phút để có lớp bảo vệ tuyệt đối cho da."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

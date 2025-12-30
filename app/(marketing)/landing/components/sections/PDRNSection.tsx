"use client";

import PDRNRow from '../ui/PDRNRow';

export default function PDRNSection() {
  return (
    <section className="landing__pdrn w-full py-[60px] md:py-[120px] px-10">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-4 md:gap-12">
        {/* Section Title */}
        <h2 className="text-heading-2 text-center">PDRN - CÓ THỂ BẠN CHƯA BIẾT?</h2>

        <PDRNRow
          imageSrc="/landing-page/PAGE 5/31.png"
          imageAlt="PDRN information"
          title="Hỗ trợ tái tạo tế bào da"
          description="Kích thích sự tăng sinh của tế bào sừng và nguyên bào sợi, giúp phục hồi da bị tổn thương."
          imagePosition="left"
        />

        <PDRNRow
          imageSrc="/landing-page/PAGE 5/32.png"
          imageAlt="PDRN benefits"
          title="Cải thiện độ đàn hồi"
          description="Tăng khả năng sống của tế bào và giảm thiểu tác hại oxy hóa, hỗ trợ củng cố hàng rào da."
          imagePosition="right"
        />

        <PDRNRow
          imageSrc="/landing-page/PAGE 5/33.png"
          imageAlt="PDRN protection"
          title="Bảo vệ da khỏi tác hại môi trường"
          description="PDRN tạo lớp bảo vệ tự nhiên, giúp da chống lại các tác động từ môi trường và duy trì độ ẩm cần thiết."
          imagePosition="left"
        />
      </div>
    </section>
  );
}

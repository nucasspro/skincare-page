import Image from 'next/image';
import { MontserratFont } from '../../fonts';

export default function LandingPage() {
  return (
    <main className={`w-full bg-white text-black text-base leading-relaxed ${MontserratFont.variable}`}>
      {/* Section 1: Hero */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
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
            <h1 className="text-heading-1 mb-5">
              CELLIC<br />
              BRIGHT MATTE SUNCREEN
            </h1>
            <p className="text-body-large mt-4">
              <strong>X10</strong> HIỆU QUẢ CHỐNG NẮNG - TÁI TẠO PHỤC HỒI DA
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

      {/* Section 2: New Generation Sunscreen */}
      <section className="w-full min-h-screen py-[120px] px-10 bg-gradient-to-b from-[#E8F4F8] to-white flex items-center justify-center">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center gap-20">
          <div className="text-center flex flex-col gap-5">
            <h2 className="text-heading-1">KEM CHỐNG NẮNG THẾ HỆ MỚI</h2>
            <p className="text-body-large">THẤU HIỂU VÀ ĐỒNG HÀNH CÙNG LÀN DA VIỆT</p>
          </div>
          <div className="w-full flex items-center justify-center gap-20">
            <div className="flex-none flex flex-col gap-4 text-left">
              <p className="text-label">4 MÀNG LỌC<br />THẾ HỆ MỚI</p>
              <p className="text-label">PDRN</p>
              <p className="text-label">LÀNH TÍNH<br />DỊU NHẸ</p>
            </div>
            <div className="relative flex-none flex items-center justify-center w-[550px] h-[550px]">
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
                className="absolute w-[70%] h-auto object-contain z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[8deg]"
                quality={100}
                unoptimized
              />
            </div>
            <div className="flex-none flex flex-col gap-4 text-right">
              <p className="text-label">KIỀM DẦU SUỐT 8H</p>
              <p className="text-label">NÂNG TONE<br />TỰ NHIÊN</p>
              <p className="text-label">PHỤC HỒI<br />TỔN THƯƠNG</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 3-Layer Protection */}
      <section className="landing__three-layer w-full min-h-screen py-[120px] px-10 bg-gradient-to-b from-[#E8F4F8] to-white flex items-center justify-center">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
          {/* Title */}
          <h2 className="text-heading-1 mb-10">TÍNH NĂNG BẢO VỆ 3 LỚP TOÀN DIỆN</h2>

          {/* Numbered List */}
          <div className="flex flex-col gap-5 w-full max-w-[900px] mb-10 mt-10">
            <div className="flex gap-4 items-start">
              <span className="text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2]">1.</span>
              <p className="text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2] flex-1">Bảo vệ da trước tác động của tia UVA, UVB, HEV</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2]">2.</span>
              <p className="text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2] flex-1">Bảo vệ khỏi tác động từ ô nhiễm môi trường và bụi mịn</p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2]">3.</span>
              <p className="text-[32px] font-bold text-[#3a76a5] flex-shrink-0 leading-[1.2] flex-1">Bảo vệ song song nuôi dưỡng hệ vi sinh</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mb-10 mt-10 relative group w-[20.8vw] h-[3.9vw] rounded-full bg-[#CFE5F5] border-[0.14vw] border-[#2F5C91] shadow-lg overflow-hidden transition-transform">
                <div className="absolute inset-[0.2vw] border-[0.14vw] border-white rounded-full pointer-events-none"></div>
                <span className="relative z-10 text-[#2F5C91] font-bold text-[clamp(10px,1.4vw,20px)] uppercase text-heading-3">
                    Xem thêm
                </span>
            </button>

          {/* Model Image */}
          <div className="w-full flex justify-center">
            <Image
              src="/landing-page/PAGE 3/20.png"
              alt="Model with Cellic sunscreen"
              width={600}
              height={800}
              className="w-full max-w-[600px] h-auto object-contain"
              quality={100}
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Section 4: PDRN - Did you know? */}
      <section className="landing__pdrn">
        <h2 className="landing__pdrn-title">PDRN - Did you know?</h2>
        <div className="landing__pdrn-cards">
          <div className="landing__pdrn-card">
            {/* Info card 1 */}
          </div>
          <div className="landing__pdrn-card">
            {/* Info card 2 */}
          </div>
          <div className="landing__pdrn-card">
            {/* Info card 3 */}
          </div>
        </div>
      </section>

      {/* Section 5: 3C Unbelievable Benefits */}
      <section className="landing__threec">
        <div className="landing__threec-graphic">
          <span className="landing__threec-number">3C</span>
        </div>
        <div className="landing__threec-content">
          <h2 className="landing__threec-title">Unbelievable Benefits</h2>
          <p className="landing__threec-description">
            {/* Description text */}
          </p>
        </div>
      </section>

      {/* Section 6: Deep Protection & Nourishment */}
      <section className="landing__deep-protection">
        <div className="landing__deep-protection-image">
          {/* Image on left */}
        </div>
        <div className="landing__deep-protection-content">
          <h2 className="landing__deep-protection-title">Deep Protection & Nourishment</h2>
          <p className="landing__deep-protection-description">
            {/* Description text */}
          </p>
        </div>
      </section>

      {/* Section 7: Test Report */}
      <section className="landing__lab-report">
        <div className="landing__lab-report-image">
          {/* Certificate image */}
        </div>
        <div className="landing__lab-report-content">
          <h2 className="landing__lab-report-title">Test Report</h2>
          <p className="landing__lab-report-description">
            {/* Explanation text */}
          </p>
        </div>
      </section>

      {/* Section 8: Usage Instructions */}
      <section className="landing__usage">
        <h2 className="landing__usage-title">Usage Instructions</h2>
        <div className="landing__usage-steps">
          <div className="landing__usage-step">
            {/* Step 1 */}
          </div>
          <div className="landing__usage-step">
            {/* Step 2 */}
          </div>
          <div className="landing__usage-step">
            {/* Step 3 */}
          </div>
          {/* Additional steps as needed */}
        </div>
      </section>

      {/* Section 9: Customer Reviews */}
      <section className="landing__reviews">
        <h2 className="landing__reviews-title">Customer Reviews</h2>
        <div className="landing__reviews-cards">
          <div className="landing__reviews-card">
            {/* Review card 1 */}
          </div>
          <div className="landing__reviews-card">
            {/* Review card 2 */}
          </div>
          <div className="landing__reviews-card">
            {/* Review card 3 */}
          </div>
        </div>
        <div className="landing__reviews-chart">
          <div className="landing__reviews-chart-item">
            <span className="landing__reviews-chart-label">Efficacy</span>
            <div className="landing__reviews-chart-bar">
              {/* Bar chart for efficacy */}
            </div>
          </div>
          <div className="landing__reviews-chart-item">
            <span className="landing__reviews-chart-label">Moisture</span>
            <div className="landing__reviews-chart-bar">
              {/* Bar chart for moisture */}
            </div>
          </div>
          <div className="landing__reviews-chart-item">
            <span className="landing__reviews-chart-label">Comfort</span>
            <div className="landing__reviews-chart-bar">
              {/* Bar chart for comfort */}
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Brand Story */}
      <section className="w-full min-h-screen py-[150px] px-10 bg-gradient-to-b from-[#E8F4F8] to-white flex items-center justify-center">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-[50px]">
          <div className="w-full flex items-center justify-center m-0">
            <Image
              src="/landing-page/PAGE 10/53.png"
              alt="Cellic"
              width={800}
              height={300}
              className="w-full max-w-[1200px] h-auto object-contain"
              quality={100}
              unoptimized
            />
          </div>
          <div className="w-full bg-gradient-to-b from-[#BEE3F8] to-white rounded-[80px] py-[70px] px-20 flex flex-col items-center gap-[30px]">
            <h2 className="text-heading-1">CÂU CHUYỆN THƯƠNG HIỆU</h2>
            <p className="text-body-large text-center max-w-[850px]">
              Sự kết hợp giữa "Cell" (Tế bào) và "Clinic" (Phòng khám) với triết lý chăm sóc da từ cấp độ tế bào bằng nền tảng khoa học y học chuẩn xác. Với sự thấu hiểu sâu sắc về làn da của người Việt, Cellic là nơi khoa học gặp gỡ sự yêu thương, nơi mỗi công thức không chỉ hiệu quả, mà còn mang lại sự an tâm trọn vẹn.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

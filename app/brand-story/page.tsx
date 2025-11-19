"use client"

import { Footer } from "@/components/layout/footer"
import Navigation from "@/components/navigation/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function BrandStoryPage() {

  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={false} />

      <section className="relative grid min-h-screen md:grid-cols-2 pt-[60px]">
        <div className="flex items-center justify-center bg-stone-50 px-8 py-24 md:px-16">
          <div className="max-w-xl space-y-8">
            <div>
              <h1 className="mb-2 h-heading text-6xl leading-tight md:text-7xl">Cellic</h1>
              <p className="text-lg leading-relaxed p-desc text-pretty">
                Sự kết hợp giữa "Cell" (Tế bào) và "Clinic" (Phòng khám) với triết lý chăm sóc da từ cấp độ tế bào bằng nền tảng khoa học y học chuẩn xác. Với sự thấu hiểu sâu sắc về làn da của mỗi người, Cellic là nơi khoa học gặp gỡ sự yêu thương, nơi mỗi công thức không chỉ hiệu quả, mà còn mang lại sự an tâm trọn vẹn.
              </p>
            </div>
            {/* Removed bullet list per new content */}
          </div>
        </div>

        <div className="relative h-[400px] md:h-auto">
          <Image src="/brand-story/2.png" alt="Brand Story Hero" fill className="object-cover" priority />
        </div>
      </section>

      {/* Section: Việt hóa giải pháp cho làn da */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6">
          <h2 className="h-heading text-3xl leading-tight md:text-4xl text-balance">
            Làn da Việt cần một giải pháp thực sự dành riêng cho mình.
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-pretty p-desc">
              Kế thừa hơn 16 năm kinh nghiệm làm việc trong công nghệ sinh học và y sinh học từ Geneworld, với định hướng ứng dụng các công nghệ tiên tiến trong sản phẩm y tế và chăm sóc da. Chúng tôi thấu hiểu sức khỏe làn da chịu ảnh hưởng mạnh mẽ từ khí hậu và môi trường sống. Hầu hết các sản phẩm chăm sóc da trên thị trường hiện nay được phát triển cho thị trường toàn cầu - nghĩa là công thức chung cho mọi loại da, mọi khí hậu, mọi môi trường. Với khí hậu nhiệt đới ẩm nóng, tác động mạnh mẽ từ môi trường sống và chỉ số UV cao gấp đôi Hàn Quốc, Châu Âu - làn da Việt đang phải đối mặt những thách thức hoàn toàn riêng biệt.
            </p>
            <p className="text-pretty p-desc">
              Thực tế ngày nay, phụ nữ Việt gặp ít nhất một trong những vấn đề: mụn ẩn, mụn viêm, da khô, da nhạy cảm - không phải vì họ chưa đủ cố gắng, mà vì họ đang sử dụng những giải pháp chăm sóc da "không được tạo ra cho họ". Mỗi người Việt xứng đáng có một làn da khỏe đẹp. Và để có được điều đó, họ cần một giải pháp thực sự dành riêng cho mình.
            </p>
            <p className="text-pretty p-desc">
              Cellic ra đời không như một thương hiệu mỹ phẩm thông thường, mà là một giải pháp khoa học được nghiên cứu riêng, phát triển riêng, và tạo riêng cho làn da Việt.
            </p>
          </div>
        </div>
      </section>

      <section className="relative h-[500px] w-full md:h-[500px]">
        <Image
          src="/brand-story/5.JPG"
          alt="Brand Story Visual"
          fill
          className="object-cover"
          style={{ objectPosition: "50% 85%" }}
        />
      </section>

      {/* Section: Sứ mệnh của chúng tôi */}
      <section className="grid md:grid-cols-2">
        <div className="relative h-[380px] md:h-[580px]">
          <Image src="/brand-story/2.png" alt="Our Mission Visual" fill className="object-cover" />
        </div>
        <div className="flex items-center bg-stone-50 px-8 py-16 md:px-16 md:py-24">
          <div className="space-y-4 md:space-y-6">
            <h2 className="h-heading text-3xl leading-tight md:text-4xl text-balance">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Cellic là sự kết hợp giữa "Cell" (Tế bào) và "Clinic" (Phòng khám) mang ý nghĩa chăm sóc da từ cấp độ tế bào bằng nền tảng khoa học y học chuẩn xác.
            </p>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Tự hào là một thương hiệu Việt, được tạo nên bởi người Việt, Cellic cam kết mang lại một giải pháp chăm sóc sức khỏe làn da đúng cách, thực sự khỏe mạnh và bền vững cho làn da Việt.
            </p>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Sứ mệnh của Cellic không dừng lại ở Việt Nam. Chúng tôi hướng đến xây dựng một thương hiệu dược mỹ phẩm Việt sánh ngang chuẩn quốc tế, để mỗi người Việt không chỉ tự tin với làn da mình, mà còn tự hào khi sử dụng một sản phẩm "Made by Vietnam, Made for Vietnam".
            </p>
          </div>
        </div>
      </section>

      {/* Section: Giá trị cốt lõi - Triết lý thành phần */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-5 md:space-y-6">
          <h2 className="h-heading text-4xl leading-tight md:text-5xl text-balance text-center">
            Giá trị cốt lõi
          </h2>
          <h3 className="h-heading text-2xl leading-tight md:text-3xl text-balance">
            Triết lý thành phần
          </h3>
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-pretty p-desc">
              Cellic sử dụng các loại thành phần đều được truy xuất nguồn gốc, kiểm định độ tinh khiết và chọn lọc từ các nhà cung cấp đáng tin cậy.
            </p>
            <p className="text-pretty p-desc">
              Chúng tôi kế thừa kết quả hợp tác giữa Geneworld cùng các bệnh viện Đại học y Dược, Bệnh viện 108 đảm bảo tiêu chuẩn khoa học trong từng sản phẩm phù hợp cho làn da Việt.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Hình ảnh 4.png */}
      <section className="relative h-[400px] w-full md:h-[500px]">
        <Image src="/brand-story/4.png" alt="Brand Story Visual 2" fill className="object-cover" />
      </section>

      {/* Section: Cam kết minh bạch */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-5 md:space-y-6">
          <h2 className="h-heading text-3xl leading-tight md:text-4xl text-balance">
            Cam kết minh bạch toàn bộ quy trình kiểm nghiệm
          </h2>
          <p className="text-lg leading-relaxed p-desc text-pretty">
            Với Cellic, bạn có quyền biết tất cả. Từ nguồn gốc nguyên liệu với đầy đủ chứng nhận và quy trình sản xuất chuẩn GMP được kiểm nghiệm nghiêm ngặt, đến hiệu quả được chứng minh qua nghiên cứu lâm sàng độc lập - chúng tôi công khai từng kết quả thực tế. Bạn không cần phải "tin" - bạn chỉ cần "thấy". Vì sự minh bạch tuyệt đối chính là cách Cellic tôn trọng và đồng hành cùng bạn trên hành trình chăm sóc sức khỏe làn da đúng cách.
          </p>
        </div>
      </section>

      {/* Section: Hình ảnh 1.jpg (thấp, có toạ độ) */}
      <section className="relative h-[300px] w-full md:h-[500px]">
        <Image
          src="/brand-story/1.jpg"
          alt="Brand Story Visual 3"
          fill
          className="object-cover"
          style={{ objectPosition: "50% 33%" }}
        />
      </section>

      {/* Section: Chăm sóc và yêu thương */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-5 md:space-y-6">
          <h2 className="h-heading text-3xl leading-tight md:text-4xl text-balance">
            Chăm sóc và yêu thương trong từng chi tiết
          </h2>
          <p className="text-lg leading-relaxed p-desc text-pretty">
            Với Cellic không chỉ dừng lại ở việc bán sản phẩm. Chúng tôi đồng hành cùng bạn trên suốt hành trình chăm sóc sức khỏe làn da - từ lúc bạn còn băn khoăn, đến khi bạn thấy làn da thay đổi tích cực. Chúng tôi cam kết tạo nên những công thức an toàn, không cồn, không paraben, không gây bít tắc lỗ chân lông và phù hợp với làn da để bạn yên tâm khi sử dụng mỗi ngày. Quan trọng hơn, Cellic luôn sẵn sàng lắng nghe, hỗ trợ và mang đến cảm giác được quan tâm thật sự trong từng trải nghiệm.
          </p>
        </div>
      </section>

      {/* CTA Card: Trải nghiệm sự khác biệt */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-stone-100 px-6 py-10 md:px-10 md:py-12 text-center">
            <h3 className="h-heading text-3xl leading-tight md:text-4xl">Trải nghiệm sự khác biệt</h3>
            <p className="p-desc text-lg text-stone-700 mt-4">
              Khám phá bộ sưu tập sản phẩm chăm sóc da được phát triển bởi các chuyên gia da liễu
            </p>
            <div className="mt-6">
              <Link href="/products">
                <Button size="lg" className="rounded-full px-8">
                  Khám phá thêm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

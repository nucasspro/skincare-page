"use client"

import { Footer } from "@/components/layout/footer"
import Navigation from "@/components/navigation/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function BrandStoryPage() {

  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={false} />

      <section className="relative grid min-h-screen md:grid-cols-2 pt-[86px]">
        <div className="flex items-center justify-center bg-stone-50 px-8 py-24 md:px-16">
          <div className="max-w-xl space-y-8">
            <div>
              <h1 className="mb-2 h-heading text-6xl leading-tight md:text-7xl">CELLIC</h1>
              <p className="text-xl slogan">Từ tiếng Pháp 'Ánh sáng'</p>
            </div>
            <div className="space-y-3 border-l-2 border-stone-300 pl-6">
              <p className="text-lg leading-relaxed p-desc">Khoa học được chứng minh lâm sàng</p>
              <p className="text-lg leading-relaxed p-desc">Thành phần tự nhiên tinh khiết</p>
              <p className="text-lg leading-relaxed p-desc">Cam kết bền vững</p>
              <p className="text-lg leading-relaxed p-desc">Không thử nghiệm trên động vật</p>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] md:h-auto">
          <img src="/brand-story/ANH1.jpg" alt="Brand Story Hero" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            <span className="text-sm uppercase tracking-wider tag-small">
              Chương Một
            </span>
            <h2 className="h-heading text-4xl leading-tight md:text-5xl text-balance">
              Nơi mọi thứ bắt đầu
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-pretty p-desc">
                Năm 2015, người sáng lập của chúng tôi, một bác sĩ da liễu với hơn 20 năm kinh nghiệm, nhận thấy một khoảng trống trong thị trường chăm sóc da. Bệnh nhân đang tìm kiếm các sản phẩm kết hợp hiệu quả lâm sàng với thành phần tự nhiên nhẹ nhàng.
              </p>
              <p className="text-pretty p-desc">
                Quan sát này đã khơi dậy một sứ mệnh: tạo ra một dòng sản phẩm chăm sóc da kết nối khoảng cách giữa khoa học da liễu và trí tuệ của thiên nhiên. Mỗi công thức sẽ được phát triển với sự nghiêm ngặt như các sản phẩm dược phẩm, nhưng khai thác sức mạnh của các thành phần thực vật.
              </p>
              <p className="text-pretty p-desc">
                Những gì bắt đầu trong một phòng thí nghiệm nhỏ đã phát triển thành một phong trào toàn cầu, chạm đến cuộc sống của hàng triệu người tin rằng chăm sóc da hiệu quả không nên ảnh hưởng đến sự an toàn hoặc tính bền vững.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative h-[400px] md:h-[600px]">
          <img src="/brand-story/ANH1.jpg" alt="Our Mission" className="h-full w-full object-cover" />
        </div>
        <div className="flex items-center bg-stone-50 px-8 py-16 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider tag-small">
              Chương Hai
            </span>
            <h2 className="h-heading text-3xl leading-tight md:text-4xl text-balance">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Chúng tôi tin rằng mọi người đều xứng đáng được tiếp cận với sản phẩm chăm sóc da hiệu quả. Sứ mệnh của chúng tôi là dân chủ hóa chuyên môn da liễu thông qua các sản phẩm vừa hiệu quả vừa dễ tiếp cận.
            </p>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Mỗi sản phẩm trải qua thử nghiệm lâm sàng nghiêm ngặt và được điều chế với các thành phần có hiệu quả đã được chứng minh. Chúng tôi không bao giờ thỏa hiệp về chất lượng, và chúng tôi không bao giờ thử nghiệm trên động vật.
            </p>
          </div>
        </div>
      </section>

      <section className="relative h-[600px] w-full md:h-[700px]">
        <img
          src="/brand-story/ANH1.jpg"
          alt="Ingredients Philosophy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center text-white">
            <span className="mb-4 block text-sm uppercase tracking-wider opacity-90 tag-small">
              Chương Ba
            </span>
            <h2 className="mb-6 h-heading text-4xl leading-tight md:text-5xl text-balance">
              Triết lý thành phần
            </h2>
            <p className="text-lg leading-relaxed opacity-90 md:text-xl text-pretty p-desc">
              Chúng tôi tìm nguồn các thành phần tốt nhất từ khắp nơi trên thế giới, kết hợp các thực vật đã được kiểm chứng theo thời gian với các hoạt chất tiên tiến. Mỗi thành phần được chọn lựa vì lợi ích đã được chứng minh và nguồn gốc bền vững.
            </p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="order-2 flex items-center bg-stone-100 px-8 py-16 md:order-1 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider tag-small">
              Chương Bốn
            </span>
            <h2 className="h-heading text-3xl leading-tight md:text-4xl text-balance">
              Cam kết bền vững
            </h2>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Cam kết của chúng tôi với hành tinh mạnh mẽ như cam kết với làn da của bạn. Chúng tôi sử dụng bao bì có thể tái chế, giảm thiểu chất thải trong quy trình sản xuất và hợp tác với các nhà cung cấp chia sẻ giá trị môi trường của chúng tôi.
            </p>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Đến năm 2025, chúng tôi hướng tới mục tiêu đạt được trung hòa carbon trong toàn bộ chuỗi cung ứng. Mỗi giao dịch mua hàng đóng góp vào các dự án tái trồng rừng và làm sạch đại dương.
            </p>
            <Button className="mt-4 group">
              Tìm hiểu về tác động của chúng tôi
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        <div className="relative order-1 h-[400px] md:order-2 md:h-[600px]">
          <img src="/brand-story/4.png" alt="Sustainability" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative h-[400px] md:h-[600px]">
          <img
            src="/brand-story/4.png"
            alt="Expert Collaboration"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center bg-stone-50 px-8 py-16 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider tag-small">
              Chương Năm
            </span>
            <h2 className="h-heading text-3xl leading-tight md:text-4xl text-balance">
              Hợp tác với chuyên gia
            </h2>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Chúng tôi hợp tác với các bác sĩ da liễu, nhà khoa học và chuyên gia chăm sóc da hàng đầu để phát triển các công thức đáp ứng nhu cầu thực sự của làn da.
            </p>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Mỗi sản phẩm được thử nghiệm lâm sàng và được chứng nhận bởi các chuyên gia da liễu độc lập. Chúng tôi tin vào sức mạnh của khoa học và chuyên môn.
            </p>
          </div>
        </div>
      </section>

      <section className="relative h-[600px] w-full md:h-[700px]">
        <img src="/brand-story/4.png" alt="Future of Skincare" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center text-white">
            <span className="mb-4 block text-sm uppercase tracking-wider opacity-90 tag-small">
              Chương Sáu
            </span>
            <h2 className="mb-6 h-heading text-4xl leading-tight md:text-5xl text-balance">
              Tương lai của chăm sóc da
            </h2>
            <p className="text-lg leading-relaxed opacity-90 md:text-xl text-pretty p-desc">
              Chúng tôi không ngừng đổi mới và nghiên cứu để mang đến những giải pháp chăm sóc da tốt nhất. Tầm nhìn của chúng tôi là trở thành thương hiệu chăm sóc da được tin cậy nhất, nơi khoa học và thiên nhiên hòa quyện hoàn hảo.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 h-heading text-4xl md:text-5xl text-balance">Giá trị cốt lõi</h2>
            <p className="text-lg p-desc text-pretty">Những nguyên tắc định hướng mọi việc chúng tôi làm</p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-900/10">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="h-heading text-2xl">Dựa trên khoa học</h3>
              <p className="leading-relaxed p-desc text-pretty">
                Mỗi công thức được phát triển với nghiên cứu lâm sàng và thử nghiệm hiệu quả
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-900/10">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="h-heading text-2xl">Lấy cảm hứng từ thiên nhiên</h3>
              <p className="leading-relaxed p-desc text-pretty">
                Chúng tôi khai thác sức mạnh của các thành phần thực vật với lợi ích đã được chứng minh
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-900/10">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="h-heading text-2xl">Bền vững</h3>
              <p className="leading-relaxed p-desc text-pretty">
                Cam kết bảo vệ hành tinh cho các thế hệ tương lai
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[500px] w-full">
        <img src="/brand-story/4.png" alt="Explore Products" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="max-w-2xl text-center text-white">
            <h2 className="mb-6 h-heading text-4xl leading-tight md:text-5xl text-balance">
              Trải nghiệm sự khác biệt
            </h2>
            <p className="mb-8 text-lg leading-relaxed opacity-90 text-pretty p-desc">
              Khám phá bộ sưu tập sản phẩm chăm sóc da được phát triển bởi bác sĩ da liễu
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary" className="group">
                Mua sắm sản phẩm
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

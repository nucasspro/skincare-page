"use client"

import { Footer } from "@/components/layout/footer"
import Navigation from "@/components/navigation/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Beaker, Building2, Heart, Leaf, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {

  const stats = [
    {
      icon: Award,
      number: "#1",
      label: "Thương hiệu được yêu thích",
      description: "9 năm liên tiếp"
    },
    {
      icon: Building2,
      number: "47",
      label: "Bệnh viện",
      description: "Sử dụng sản phẩm"
    },
    {
      icon: Building2,
      number: "4,100+",
      label: "Phòng khám",
      description: "Tin dùng"
    },
    {
      icon: Users,
      number: "49",
      label: "Bác sĩ da liễu",
      description: "Hợp tác"
    }
  ]

  const values = [
    {
      icon: Beaker,
      title: "Dựa trên khoa học",
      description: "Mỗi công thức được phát triển với nghiên cứu lâm sàng và thử nghiệm hiệu quả"
    },
    {
      icon: Leaf,
      title: "Lấy cảm hứng từ thiên nhiên",
      description: "Chúng tôi khai thác sức mạnh của các thành phần thực vật với lợi ích đã được chứng minh"
    },
    {
      icon: Heart,
      title: "Bền vững",
      description: "Cam kết bảo vệ hành tinh cho các thế hệ tương lai"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation isTransparent={false} />

      {/* Hero Section */}
      <section className="relative grid min-h-[70vh] md:items-center pt-[86px]">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white" />
        <div className="relative z-10 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <span className="text-sm uppercase tracking-wider tag-small">
              Về CELLIC
            </span>
            <h1 className="h-heading text-5xl md:text-6xl lg:text-7xl leading-tight">
              Nơi khoa học gặp gỡ thiên nhiên
            </h1>
            <p className="text-xl md:text-2xl p-desc max-w-2xl mx-auto leading-relaxed">
              CELLIC - từ tiếng Pháp "Ánh sáng", là thương hiệu chăm sóc da cao cấp kết hợp
              khoa học da liễu tiên tiến với sức mạnh của thiên nhiên.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            <span className="text-sm uppercase tracking-wider tag-small block">
              Câu chuyện của chúng tôi
            </span>
            <h2 className="h-heading text-4xl leading-tight md:text-5xl text-balance">
              Nơi mọi thứ bắt đầu
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-pretty p-desc">
                Năm 2015, người sáng lập của chúng tôi, một bác sĩ da liễu với hơn 20 năm kinh nghiệm,
                nhận thấy một khoảng trống trong thị trường chăm sóc da. Bệnh nhân đang tìm kiếm các
                sản phẩm kết hợp hiệu quả lâm sàng với thành phần tự nhiên nhẹ nhàng.
              </p>
              <p className="text-pretty p-desc">
                Quan sát này đã khơi dậy một sứ mệnh: tạo ra một dòng sản phẩm chăm sóc da kết nối
                khoảng cách giữa khoa học da liễu và trí tuệ của thiên nhiên. Mỗi công thức được phát
                triển với sự nghiêm ngặt như các sản phẩm dược phẩm, nhưng khai thác sức mạnh của các
                thành phần thực vật.
              </p>
              <p className="text-pretty p-desc">
                Những gì bắt đầu trong một phòng thí nghiệm nhỏ đã phát triển thành một phong trào toàn cầu,
                chạm đến cuộc sống của hàng triệu người tin rằng chăm sóc da hiệu quả không nên ảnh hưởng
                đến sự an toàn hoặc tính bền vững.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-24 md:py-32 bg-stone-50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 h-heading text-4xl md:text-5xl text-balance">
              Thành tích của chúng tôi
            </h2>
            <p className="text-lg p-desc text-pretty max-w-2xl mx-auto">
              Những con số nói lên sự tin cậy và hiệu quả của sản phẩm CELLIC
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-900/10">
                  <stat.icon className="h-8 w-8 text-stone-900" />
                </div>
                <div className="space-y-2">
                  <div className="h-heading text-4xl md:text-5xl font-bold">
                    {stat.number}
                  </div>
                  <div className="h-heading text-xl">{stat.label}</div>
                  <div className="p-desc text-sm text-stone-600">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2">
        <div className="relative h-[400px] md:h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=1200&fit=crop&q=80"
            alt="Our Mission"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex items-center bg-white px-8 py-16 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider tag-small">
              Sứ mệnh
            </span>
            <h2 className="h-heading text-3xl leading-tight md:text-4xl text-balance">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Chúng tôi tin rằng mọi người đều xứng đáng được tiếp cận với sản phẩm chăm sóc da hiệu quả.
              Sứ mệnh của chúng tôi là dân chủ hóa chuyên môn da liễu thông qua các sản phẩm vừa hiệu quả vừa dễ tiếp cận.
            </p>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Mỗi sản phẩm trải qua thử nghiệm lâm sàng nghiêm ngặt và được điều chế với các thành phần có
              hiệu quả đã được chứng minh. Chúng tôi không bao giờ thỏa hiệp về chất lượng, và chúng tôi không
              bao giờ thử nghiệm trên động vật.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-24 md:py-32 bg-stone-50">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 h-heading text-4xl md:text-5xl text-balance">
              Giá trị cốt lõi
            </h2>
            <p className="text-lg p-desc text-pretty max-w-2xl mx-auto">
              Những nguyên tắc định hướng mọi việc chúng tôi làm
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {values.map((value, index) => (
              <div key={index} className="space-y-4 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-900/10">
                  <value.icon className="h-8 w-8 text-stone-900" />
                </div>
                <h3 className="h-heading text-2xl">{value.title}</h3>
                <p className="leading-relaxed p-desc text-pretty">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Collaboration */}
      <section className="grid md:grid-cols-2">
        <div className="order-2 flex items-center bg-white px-8 py-16 md:order-1 md:px-16 md:py-24">
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-wider tag-small">
              Hợp tác chuyên gia
            </span>
            <h2 className="h-heading text-3xl leading-tight md:text-4xl text-balance">
              Hợp tác với chuyên gia
            </h2>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Chúng tôi hợp tác với các bác sĩ da liễu, nhà khoa học và chuyên gia chăm sóc da hàng đầu
              để phát triển các công thức đáp ứng nhu cầu thực sự của làn da.
            </p>
            <p className="text-lg leading-relaxed p-desc text-pretty">
              Mỗi sản phẩm được thử nghiệm lâm sàng và được chứng nhận bởi các chuyên gia da liễu độc lập.
              Chúng tôi tin vào sức mạnh của khoa học và chuyên môn.
            </p>
          </div>
        </div>
        <div className="relative order-1 h-[400px] md:order-2 md:h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=1200&fit=crop&q=80"
            alt="Expert Collaboration"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Sustainability */}
      <section className="relative h-[600px] w-full md:h-[700px]">
        <Image
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&h=800&fit=crop&q=80"
          alt="Sustainability"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center text-white">
            <span className="mb-4 block text-sm uppercase tracking-wider opacity-90 tag-small">
              Cam kết bền vững
            </span>
            <h2 className="mb-6 h-heading text-4xl leading-tight md:text-5xl text-balance">
              Cam kết bền vững
            </h2>
            <p className="text-lg leading-relaxed opacity-90 md:text-xl text-pretty p-desc">
              Cam kết của chúng tôi với hành tinh mạnh mẽ như cam kết với làn da của bạn. Chúng tôi sử dụng
              bao bì có thể tái chế, giảm thiểu chất thải trong quy trình sản xuất và hợp tác với các nhà
              cung cấp chia sẻ giá trị môi trường của chúng tôi.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <h2 className="h-heading text-4xl md:text-5xl text-balance">
            Trải nghiệm sự khác biệt
          </h2>
          <p className="text-lg md:text-xl p-desc text-pretty max-w-2xl mx-auto">
            Khám phá bộ sưu tập sản phẩm chăm sóc da được phát triển bởi bác sĩ da liễu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="group">
                Mua sắm sản phẩm
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/brand-story">
              <Button size="lg" variant="outline" className="group">
                Đọc câu chuyện đầy đủ
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

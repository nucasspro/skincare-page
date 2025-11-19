"use client"

import { Footer } from "@/components/layout/footer"
import Navigation from "@/components/navigation/navigation"
import { getProductDescriptionFont, getProductTitleFont } from "@/lib/utils/font-utils"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation isTransparent={false} />

      <main className="pt-[86px] pb-16 sm:pb-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className={getProductTitleFont("text-2xl sm:text-3xl md:text-4xl text-gray-900 uppercase tracking-tight text-center")}>
            CHÍNH SÁCH MUA HÀNG VÀ VẬN CHUYỂN
          </h1>

          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Đối tác đảm nhận việc giao hàng của Chúng tôi: Shopee Express.
            </p>
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Các đơn hàng khu vực nội thành Hà Nội và Hồ Chí Minh sẽ được giao trong vòng từ 2 - 3 ngày kể từ thời điểm Quý Khách Hàng xác nhận Đơn hàng.
            </p>
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Các đơn hàng khu vực ngoại thành sẽ được giao trong vòng từ 4 - 5 ngày kể từ thời điểm Quý Khách Hàng xác nhận Đơn hàng.
            </p>
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Chi phí vận chuyển các đơn hàng nội thành và ngoại thành đồng giá 30.000 VNĐ. Các đơn hàng có trị giá trên 150K được miễn phí vận chuyển.
            </p>
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Khi nhận hàng từ nhân viên vận chuyển, Quý Khách hàng lưu ý phải kiểm tra thông tin đơn hàng hàng trước khi nhận gồm: thông tin người nhận, tên sản phẩm, số lượng sản phẩm hàng hóa.
            </p>
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Khách hàng không được kiểm tra hàng khi nhận hàng.
            </p>
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Trường hợp khi nhận hàng, Quý Khách hàng phát hiện hàng hóa bàn giao thiếu, lỗi, giao nhầm liên hệ trực tiếp đường dây chăm sóc khách hàng của Chúng tôi để được hỗ trợ.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mt-8 sm:mt-10">
            <h2 className={getProductTitleFont("text-xl sm:text-2xl text-gray-900 uppercase tracking-wide")}>
              1. Điều kiện đổi trả
            </h2>
            <div className="mt-3 sm:mt-4 space-y-3">
              <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả hàng trong vòng 3 ngày tính từ thời điểm giao/nhận hàng trong những trường hợp sau:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.
                </li>
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  Không đủ số lượng, không đúng mô tả như trong đơn hàng.
                </li>
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  Tình trạng bên ngoài bị ảnh hưởng trong quá trình vận chuyển, như rách bao bì, bong tróc, bể vỡ…
                </li>
              </ul>
              <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Khách hàng có trách nhiệm cung cấp video bằng chứng chứng minh sự thiếu sót trên để hoàn thành việc hoàn trả/đổi trả hàng hóa.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mt-8 sm:mt-10">
            <h2 className={getProductTitleFont("text-xl sm:text-2xl text-gray-900 uppercase tracking-wide")}>
              2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả
            </h2>
            <div className="mt-3 sm:mt-4 space-y-3">
              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.
                </li>
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  Thời gian gửi chuyển trả sản phẩm: trong vòng 72 ngày kể từ khi nhận sản phẩm.
                </li>
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  Địa điểm đổi trả sản phẩm: Sau khi nhận được xác nhận thu hồi hàng từ chúng tôi, Khách hàng gửi đơn hàng đổi trả lại cho nhân viên vận chuyển để hoàn thành việc hoàn trả/ đổi trả hàng hoá.
                </li>
              </ul>
              <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}



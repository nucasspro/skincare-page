"use client"

import Navigation from "@/components/navigation/navigation"
import { Footer } from "@/components/layout/footer"
import { getProductDescriptionFont, getProductTitleFont } from "@/lib/utils/font-utils"

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation isTransparent={false} />
      <main className="pt-[86px] pb-16 sm:pb-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={getProductTitleFont("text-2xl sm:text-3xl md:text-4xl text-gray-900 uppercase tracking-tight text-center")}>
            Hướng dẫn mua hàng
          </h1>

          {/* Intro */}
          <div className="mt-6 sm:mt-8 space-y-4">
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed text-center")}>
              Quy trình mua hàng tại Cellic được tối ưu để nhanh chóng, đơn giản và an toàn. Vui lòng làm theo các bước dưới đây.
            </p>
          </div>

          {/* Bước 1 */}
          <div className="mt-10 sm:mt-12">
            <h2 className={getProductTitleFont("text-xl sm:text-2xl text-gray-900 uppercase tracking-wide")}>
              BƯỚC 1: TÌM KIẾM VÀ CHỌN SẢN PHẨM YÊU THÍCH TRÊN WEBSITE
            </h2>
            <div className="mt-3 sm:mt-4 space-y-3">
              <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Tìm kiếm sản phẩm theo 2 cách:
              </p>
              <ol className="list-decimal pl-5 sm:pl-6 space-y-2">
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  Gõ tên sản phẩm vào thanh tìm kiếm.
                </li>
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  Tìm theo danh mục sản phẩm trên thanh menu.
                </li>
              </ol>
              <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Sau khi tìm kiếm và lựa chọn được sản phẩm ưng ý, hãy truy cập trang chi tiết để xem sản phẩm. Tại đây, chọn số lượng và nhấn{" "}
                <span className={getProductTitleFont("text-gray-900")}>“THÊM VÀO GIỎ”</span> rồi chọn{" "}
                <span className={getProductTitleFont("text-gray-900")}>“MUA HÀNG”</span> để tiến hành thanh toán hoặc tiếp tục mua sắm.
              </p>
              <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Khi đã đủ sản phẩm, nhấn vào biểu tượng giỏ hàng ở góc phải màn hình, chọn{" "}
                <span className={getProductTitleFont("text-gray-900")}>“THANH TOÁN”</span> để đặt hàng online.
              </p>
            </div>
          </div>

          {/* Bước 2 */}
          <div className="mt-10 sm:mt-12">
            <h2 className={getProductTitleFont("text-xl sm:text-2xl text-gray-900 uppercase tracking-wide")}>
              BƯỚC 2: TIẾN HÀNH ĐẶT HÀNG ONLINE VÀ THANH TOÁN ĐƠN HÀNG
            </h2>

            {/* Thông tin giao hàng */}
            <div className="mt-5 sm:mt-6">
              <h3 className={getProductTitleFont("text-lg sm:text-xl text-gray-900 uppercase")}>
                I. THÔNG TIN GIAO HÀNG
              </h3>
              <div className="mt-3 sm:mt-4 space-y-4">
                {/* Bước 1 */}
                <div>
                  <p className={getProductTitleFont("text-base sm:text-lg text-gray-900")}>
                    Bước 1: Điền thông tin cơ bản
                  </p>
                  <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                    Đối với khách hàng chưa có tài khoản, điền đầy đủ thông tin tại ô Họ và tên, Số điện thoại và địa chỉ cụ thể.
                  </p>
                </div>
                {/* Bước 2 */}
                <div>
                  <p className={getProductTitleFont("text-base sm:text-lg text-gray-900")}>
                    Bước 2: Chọn phương thức thanh toán
                  </p>
                  <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                    <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                      Thanh toán khi nhận hàng (COD): nhấp “Thanh toán khi nhận hàng (COD)”.
                    </li>
                    <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                      Chuyển khoản ngân hàng: nhấp “Chuyển khoản qua ngân hàng”.
                    </li>
                  </ul>
                </div>
                {/* Bước 3 */}
                <div>
                  <p className={getProductTitleFont("text-base sm:text-lg text-gray-900")}>
                    Bước 3: Thêm mã giảm giá (nếu có)
                  </p>
                  <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                    Nhập mã ưu đãi của bạn để nhận khuyến mại tương ứng.
                  </p>
                </div>
                {/* Bước 4 */}
                <div>
                  <p className={getProductTitleFont("text-base sm:text-lg text-gray-900")}>
                    Bước 4: Xác nhận đơn hàng
                  </p>
                  <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                    Nhấn nút “Xác nhận đơn hàng” để hoàn tất việc mua hàng.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Link tham khảo chính sách */}
          <div className="mt-10 sm:mt-12">
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Vui lòng tham khảo thêm{" "}
              <a href="/shipping" className="underline">Chính sách mua hàng & vận chuyển</a>{" "}
              để nắm rõ thời gian giao hàng và phí vận chuyển.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}



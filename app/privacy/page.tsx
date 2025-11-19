"use client"

import Navigation from "@/components/navigation/navigation"
import { Footer } from "@/components/layout/footer"
import { getProductDescriptionFont, getProductTitleFont } from "@/lib/utils/font-utils"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation isTransparent={false} />

      <main className="pt-[86px] pb-16 sm:pb-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className={getProductTitleFont("text-2xl sm:text-3xl md:text-4xl text-gray-900 uppercase tracking-tight text-center")}>
            CHÍNH SÁCH BẢO MẬT
          </h1>

          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Cellic Việt Nam cam kết nghiêm túc thực hiện trách nhiệm của mình liên quan đến bảo mật thông tin, quyền riêng tư của khách hàng khi bạn tham gia giao dịch với chúng tôi theo các quy định của pháp luật Việt Nam. Chúng tôi nhận biết tầm quan trọng của dữ liệu cá nhân mà bạn đã tin tưởng cung cấp và chúng tôi có trách nhiệm quản lý, thực hiện các biện pháp để bảo vệ trong quá trình sử dụng, tiết lộ với bất kỳ bên thứ ba nào trong phạm vi cho phép và xử lý dữ liệu cá nhân của bạn một cách thích hợp. Cellic Việt Nam tạo ra chính sách bảo mật này để quý khách có thể hiểu hơn về những cam kết mà Cellic thực hiện trong việc thu thập, sử dụng và chia sẻ thông tin cũng như việc bảo mật thông tin khách hàng.
            </p>
          </div>

          {/* 1. Mục đích, phạm vi sử dụng... */}
          <div className="mt-8 sm:mt-10 space-y-4">
            <h2 className={getProductTitleFont("text-xl sm:text-2xl text-gray-900 uppercase tracking-wide")}>
              1. Mục đích, phạm vi sử dụng và thời gian lưu trữ thông tin
            </h2>

            <h3 className={getProductTitleFont("text-lg sm:text-xl text-gray-900 uppercase")}>
              1.1. Mục đích, phạm vi sử dụng thông tin
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
              {[
                "Để phục vụ quản lý, điều hành, xem xét và/hoặc xử lý đơn đặt hàng/giao dịch của bạn với chúng tôi hoặc với các bên thứ ba thông qua các đơn vị dịch vụ trung gian.",
                "Để giải quyết hoặc tạo điều kiện thuận lợi cho dịch vụ chăm sóc khách hàng, chúng tôi có thể sử dụng các thông tin này để hỗ trợ kịp thời theo các yêu cầu từ bạn.",
                "Để phục vụ mục đích xác minh, đánh giá pháp lý hoặc để nhận biết khách hàng.",
                "Để lập số liệu thống kê, nghiên cứu nhằm duy trì sổ sách nội bộ hoặc nhằm mục đích phát triển, nâng cao chất lượng phục vụ khách hàng.",
                "Để đáp ứng các thủ tục pháp lý hoặc các yêu cầu của cơ quan nhà nước có thẩm quyền khi được yêu cầu mà việc tiết lộ thông tin là cần thiết, đúng với pháp luật.",
                "Chúng tôi sẽ có thể thu thập, sử dụng, xử lý dữ liệu cá nhân của bạn phụ thuộc vào từng hoàn cảnh cụ thể mà mục đích đó có thể không được liệt kê ở trên. Tuy nhiên, Cellic Việt Nam sẽ thông báo cho bạn về mục đích đó tại thời điểm chúng tôi xin sự cho phép của bạn, trừ khi được phép theo các quy định của pháp luật.",
              ].map((text, i) => (
                <li key={`mucdich-${i}`} className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  {text}
                </li>
              ))}
            </ul>

            <h3 className={getProductTitleFont("text-lg sm:text-xl text-gray-900 uppercase")}>
              1.2. Những người hoặc tổ chức có thể được tiếp cận với thông tin đó
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Cellic Việt Nam biết rằng việc bảo mật thông tin cá nhân của khách hàng là rất quan trọng. Chúng tôi sẽ áp dụng các biện pháp để bảo mật thông tin của bạn. Chúng tôi chỉ cho phép nhân viên của Cellic, các đối tác của chúng tôi là các đơn vị dịch vụ trung gian như dịch vụ vận chuyển, dịch vụ thanh toán trung gian hoặc theo lệnh của tòa án hay bất kỳ cơ quan nhà nước có thẩm quyền nhằm (i) tuân thủ quy định của pháp luật; (ii) thực thi nghĩa vụ theo các điều khoản quy định tại hợp đồng/giao dịch; (iii) đáp ứng các yêu cầu của bạn về dịch vụ khách hàng; (iv) bảo vệ quyền, tài sản hoặc sự an toàn của chúng tôi và của bạn.
              </li>
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Chúng tôi sẽ có thể thu thập, sử dụng, tiết lộ hoặc xử lý dữ liệu cá nhân của bạn phụ thuộc vào từng hoàn cảnh cụ thể mà những cá nhân, tổ chức đó có thể không được liệt kê ở trên. Tuy nhiên, Cellic sẽ thông báo cho bạn về người tiếp cận và mục đích đó tại thời điểm chúng tôi xin sự cho phép của bạn, trừ khi được phép theo quy định của pháp luật. Các đối tác của chúng tôi cam kết chỉ sử dụng các thông tin này vào mục đích thực thi nghĩa vụ, có lợi cho khách hàng mà không được sử dụng vào mục đích thương mại hay mục đích khác khi chưa có sự đồng ý của chúng tôi và của bạn.
              </li>
            </ul>

            <h3 className={getProductTitleFont("text-lg sm:text-xl text-gray-900 uppercase")}>
              1.3. Chúng tôi sẽ có thể thu thập dữ liệu cá nhân của bạn khi
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
              {[
                "Bạn đăng ký tài khoản trên Website với chúng tôi;",
                "Khi bạn đồng ý hoặc cung cấp các tài liệu, thông tin liên quan trong lúc tương tác giữa bạn với chúng tôi bao gồm nhưng không giới hạn qua các cuộc gọi điện thoại từ số hotline của Cellic (có thể được ghi âm lại), email, ứng dụng truyền thông xã hội, thư từ, gặp gỡ trực tiếp.",
                "Khi bạn liên kết tài khoản Cellic với tài khoản mạng xã hội, các tài khoản bên ngoài khác hoặc sử dụng các tính năng mạng xã hội phù hợp với các chính sách của nhà cung cấp.",
                "Khi bạn cung cấp ý kiến phản hồi hoặc gửi khiếu nại cho chúng tôi.",
                "Các trường hợp trên không nhằm mục đích liệt kê đầy đủ các trường hợp mà chỉ đưa ra một số trường hợp phổ biến về thời điểm dữ liệu cá nhân của bạn có thể bị thu thập.",
              ].map((text, i) => (
                <li key={`thu-thap-${i}`} className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  {text}
                </li>
              ))}
            </ul>

            <h3 className={getProductTitleFont("text-lg sm:text-xl text-gray-900 uppercase")}>
              1.4. Phạm vi thu thập dữ liệu
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Dữ liệu cá nhân mà Cellic có thể thu thập bao gồm: họ tên; địa chỉ email; địa chỉ giao nhận hàng hóa và/hoặc thanh toán; tài khoản ngân hàng và thông tin thanh toán; số điện thoại; hình ảnh, âm thanh hoặc video mở hàng/kiểm tra hàng; các thông tin khác về người dùng khi bạn đăng nhập để sử dụng các dịch vụ liên kết chính thống tại Website của chúng tôi hoặc bất kỳ thông tin nào mà chúng tôi đã thông báo xin sự cung cấp và cho phép từ bạn.
              </li>
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Nếu bạn không muốn chúng tôi thu thập thông tin/dữ liệu cá nhân nói trên, bạn có thể không cung cấp hoặc vào bất kỳ lúc nào bằng cách thông báo bằng văn bản hoặc qua email đến chúng tôi. Tuy nhiên, lưu ý rằng việc từ chối hoặc hủy bỏ cho phép chúng tôi thu thập, sử dụng hoặc xử lý dữ liệu cá nhân của bạn có thể làm ảnh hưởng đến giao dịch của bạn với chúng tôi và/hoặc ảnh hưởng đến việc bạn sử dụng các dịch vụ với nền tảng được liên kết tại Website.
              </li>
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Chúng tôi không cố ý thu thập thông tin cá nhân của trẻ em dưới 13 tuổi mà không có sự kiểm soát của cha mẹ hoặc người giám hộ hợp pháp. Nếu quý khách dưới 13 tuổi, xin vui lòng không cung cấp cho chúng tôi bất kỳ thông tin cá nhân gì. Nếu chúng tôi xác định được người dùng có độ tuổi dưới 13 và đã gửi thông tin cá nhân mà không có sự kiểm soát của người giám hộ, chúng tôi sẽ xoá bỏ thông tin cá nhân này khỏi dữ liệu của chúng tôi mà không cần thông báo trước.
              </li>
            </ul>

            <h3 className={getProductTitleFont("text-lg sm:text-xl text-gray-900 uppercase")}>
              1.5. Thời gian lưu trữ và cam kết bảo mật
            </h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Thời gian lưu trữ là 2 năm kể từ thời điểm đơn hàng cuối cùng phát sinh.
              </li>
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Chúng tôi thực hiện các biện pháp bảo mật khác nhau và luôn nỗ lực để đảm bảo sự an toàn dữ liệu cá nhân của bạn trên các hệ thống quản lý của chúng tôi. Dữ liệu cá nhân của bạn sẽ được lưu trữ bằng các mạng bảo mật và chỉ có thể truy cập được bởi một số nhân viên được quyền truy cập đặc biệt. Tuy nhiên, chúng tôi không thể có sự đảm bảo an ninh tuyệt đối bởi các sự cố phát sinh, trường hợp có sự cố xảy ra chúng tôi sẽ dùng mọi biện pháp để khắc phục và hạn chế rủi ro nhất.
              </li>
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Chúng tôi cam kết thực hiện duy trì dữ liệu cá nhân đúng quy định của pháp luật. Trong trường hợp cần thiết và trong phạm vi cho phép của pháp luật, chúng tôi có thể tiêu hủy dữ liệu cá nhân của bạn một cách an toàn mà không cần thông báo trước.
              </li>
            </ul>
          </div>

          {/* 2. Thương hiệu và bản quyền */}
          <div className="mt-8 sm:mt-10 space-y-3">
            <h2 className={getProductTitleFont("text-xl sm:text-2xl text-gray-900 uppercase tracking-wide")}>
              2. Thương hiệu và bản quyền
            </h2>
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký) bao gồm nhưng không giới hạn nội dung thông tin và tất cả các thiết kế, văn bản, đồ họa, phần mềm, hình ảnh, video, âm nhạc, âm thanh, biên dịch phần mềm, mã nguồn và phần mềm cơ bản đều là tài sản của chúng tôi. Toàn bộ nội dung của trang web được bảo vệ bởi luật pháp Việt Nam và các công ước quốc tế.
            </p>
          </div>

          {/* 3. Quy định sửa đổi thông tin và xoá tài khoản */}
          <div className="mt-8 sm:mt-10 space-y-3">
            <h2 className={getProductTitleFont("text-xl sm:text-2xl text-gray-900 uppercase tracking-wide")}>
              3. Quy định sửa đổi thông tin và xoá tài khoản
            </h2>
            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Nếu quý khách muốn thay đổi các thông tin cá nhân trên tài khoản đã đăng ký, quý khách có thể đăng nhập và cập nhật, sửa đổi trên tài khoản của mình ở website cellic.vn hoặc liên hệ với chúng tôi qua email, số hotline của Cellic để được hướng dẫn và hỗ trợ.
              </li>
              <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Nếu quý khách muốn xoá tài khoản và toàn bộ thông tin cá nhân, lịch sử mua hàng trên website, vui lòng liên hệ với chúng tôi qua email:{" "}
                <Link href="mailto:support@cellic.vn" className="underline">
                  support@cellic.vn
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Thay đổi về chính sách */}
          <div className="mt-8 sm:mt-10 space-y-3">
            <h2 className={getProductTitleFont("text-xl sm:text-2xl text-gray-900 uppercase tracking-wide")}>
              4. Thay đổi về chính sách
            </h2>
            <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
              Chính sách bảo mật thông tin này có thể được thay đổi để phù hợp với nhu cầu của Cellic cũng như của khách hàng và phù hợp với các quy định của pháp luật mà không cần thông báo trước (nếu có).
            </p>
          </div>

          {/* 5. Đơn vị thu thập, quản lý thông tin */}
          <div className="mt-8 sm:mt-10 space-y-3">
            <h2 className={getProductTitleFont("text-xl sm:text-2xl text-gray-900 uppercase tracking-wide")}>
              5. Đơn vị thu thập, quản lý thông tin
            </h2>
            <div className="space-y-2">
              <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Công ty TNHH CELLIC
              </p>
              <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Trụ sở chính: Lô số 3, Ngõ 12 An Hoà, Phường Hà Đông, Hà Nội, Việt Nam
              </p>
              <p className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                Nếu quý khách có bất kỳ thắc mắc hoặc khiếu nại nào về các quy định bảo mật thông tin khách hàng của chúng tôi hoặc phát hiện thông tin cá nhân của mình bị sử dụng sai mục đích, bị vi phạm thì vui lòng liên hệ qua các kênh như sau để được giải đáp và hỗ trợ:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed break-words")}>
                  Fanpage: <Link href="https://www.facebook.com/Cellicvn/" className="underline break-words">https://www.facebook.com/Cellicvn/</Link>
                </li>
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed")}>
                  Hotline: 0966923469 (9:00-18:00 từ thứ 2 đến thứ 7)
                </li>
                <li className={getProductDescriptionFont("text-base sm:text-lg text-stone-700 leading-relaxed break-words")}>
                  Email: <Link href="mailto:support@cellic.vn" className="underline">support@cellic.vn</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}



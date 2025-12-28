"use client";

import ReviewCard from '../ui/ReviewCard';
import StatsGraph from '../ui/StatsGraph';

export default function ReviewsSection() {
  return (
    <section className="landing__reviews w-full py-[120px] px-10">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-12">
        <h2 className="text-heading-2 text-center">ĐÁNH GIÁ TỪ KHÁCH HÀNG</h2>

        <div className="bg-gray-50 rounded-[40px] p-8 shadow-md">
          <div className="flex flex-col md:flex-row gap-8">
            <ReviewCard
              rating={5}
              review="Tone lên nhẹ, hợp dùng buổi sáng đi làm. Da mình hơi xỉn nên rất thích kiểu nâng tone nhẹ như em này. Không bị trắng bệch như mấy dòng Hàn, mà sáng kiểu tự nhiên, kiểu healthy skin. Mình hay makeup nhẹ sau đó, lớp nền bám khá ổn. Nếu Cellic có thêm phiên bản chống nước thì chắc mình chấm 5 sao luôn."
              author="Kiều Oanh"
              date="1 tuần trước"
            />
            <ReviewCard
              rating={4.5}
              review="Tốt nhưng nên cải thiện tốc độ thấm. Chống nắng ổn, không bị rát da khi ra nắng gắt, mà da cũng đỡ đổ dầu hơn. Tuy nhiên lúc mới bôi thì hơi dính nhẹ tầm 1-2 phút đầu mới set hẳn. Dù vậy, tổng thể rất đáng tiền, đặc biệt là vì cảm giác dịu nhẹ không gây kích ứng."
              author="Thảo Trang"
              date="1 tháng trước"
            />
            <ReviewCard
              rating={5}
              review="Finish đẹp, mịn lì mà vẫn ẩm nhẹ. Ấn tượng đầu tiên là chất kem mịn, tán ra mượt, không để lại vệt trắng. Da mình dầu vùng T nhưng dùng cả buổi vẫn thấy kiềm dầu tốt, không bị loang như mấy loại trước. Mùi dễ chịu, kiểu rất nhẹ. Mình chỉ mong hãng ra thêm bản lớn để xài được lâu hơn."
              author="Diệu Linh"
              date="3 tuần trước"
            />
          </div>
        </div>

        {/* Stats Graph */}
        <StatsGraph
          items={[
            { label: "Hiệu Quả", percentage: 92.3, color: "#a7c1d3", value1: 12, percentage1: 92.3, value2: 1, percentage2: 7.7 },
            { label: "Dưỡng ẩm", percentage: 88.9, color: "#a7c1d3", value1: 8, percentage1: 88.9, value2: 1, percentage2: 11.1 },
            { label: "Kích ứng", percentage: 4, color: "#a7c1d3", value1: 1, percentage1: 4, value2: 12, percentage2: 96 },
          ]}
        />
      </div>
    </section>
  );
}

import { Metadata } from "next";
import Image from "next/image";

const homePageImage = "/assets/images/homepage.png";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: 'Trang chủ - Pawbloom',
  description: 'Pawbloom – Nơi kết nối những trái tim yêu thương với những chú thú cưng cần được yêu thương. Chúng tôi giúp tạo dựng mái ấm mới và mang lại cơ hội thứ hai cho thú cưng từ các trạm cứu trợ.',
  keywords: ['Pawbloom', 'nhận nuôi thú cưng', 'trạm cứu trợ', 'yêu thương thú cưng', 'mái ấm thú cưng'],
  openGraph: {
    title: 'Pawbloom - Tìm kiếm thú cưng cho bạn',
    description: 'Khám phá những bé thú cưng dễ thương đang cần mái ấm. Hãy để Pawbloom giúp bạn tìm thấy người bạn đồng hành hoàn hảo!',
    images: '/assets/images/homepage.png',
    url: 'https://pawbloom.com',
    type: 'website',
  },
});


export default function Home() {
  // Dữ liệu cho các phần giống nhau
  const stats = [
    { value: "50+", label: "Trạm cứu trợ" },
    { value: "100+", label: "Bé thú cưng" },
    { value: "200+", label: "Sản phẩm" },
  ];

  const svgDecorations = [
    { src: "/assets/icons/dots.svg", alt: "dot", style: { top: "10%", left: "5%" } },
    { src: "/assets/icons/paw.svg", alt: "paw", style: { top: "50%", left: "10%" } },
  ];



  return (
    <div className="flex gap-[100px] p-16">
      {/* {svgDecorations.map((item, index) => (
        <Image
          key={index}
          src={item.src}
          alt={item.alt}
          width={50} // Adjust size as needed
          height={50}
          className="absolute z-0 opacity-80"
        />
      ))} */}
      <section className="flex flex-1 flex-col gap-10">
        <h2 className="font-medium italic text-brand-200">#cơ hội thứ 2, mái ấm mãi mãi</h2>
        <h1 className="text-5xl font-bold">Tìm Kiếm Thú Cưng Cho Bạn</h1>
        <p className="text-xl font-medium text-gray-500">
          Pawbloom – Nơi kết nối những trái tim yêu thương với những chú thú cưng cần được yêu thương.
          Chúng tôi giúp tạo dựng mái ấm mới, mang lại cơ hội thứ hai cho thú cưng từ các trạm cứu trợ.
        </p>
        {/* Render từ mảng stats */}
        <div className="flex items-center gap-10">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-[10px]">
              <h1 className="text-4xl font-semibold text-brand">{stat.value}</h1>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="relative flex-1">
        <Image src={homePageImage} alt="pet" width={500} height={500} />
      </div>
    </div>
  );
}

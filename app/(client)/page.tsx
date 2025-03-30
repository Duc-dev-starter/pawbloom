import { LayoutBGFlicker } from "@/components/bg";
import FeaturePost from "@/components/blog/FeaturePost";
import { CarouselCustom } from "@/components/customCarousel";
import MeetPets from "@/components/pet/MeetPet";
import PetFilter from "@/components/pet/PetFilter";
import WatchMoreButton from "@/components/WatchMoreButton";
import Path from "@/constants/paths";
import EventCard from "@/sections/home/EventCard";
import ProductList from "@/sections/home/ProductList";
import { Metadata } from "next";
import Image from "next/image";

const homePageImage = "/assets/images/homepage.png";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: 'Trang chủ | Pawbloom',
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


const eventData = [
  {
    id: "1",
    title: "Pawbloom Pet Care Day",
    date: "20/12/2024",
    location: "TP. Hồ Chí Minh",
    description: "Một sự kiện dành cho thú cưng và người yêu thú cưng.",
  },
  {
    id: "2",
    title: "Ngày hội nhận nuôi thú cưng",
    date: "25/12/2024",
    location: "Hà Nội",
    description: "Cơ hội tìm thấy người bạn bốn chân cho gia đình bạn.",
  },
  {
    id: "3",
    title: "Hội chợ đồ chơi thú cưng",
    date: "30/12/2024",
    location: "Đà Nẵng",
    description: "Khám phá các sản phẩm mới nhất cho thú cưng của bạn.",
  },
];

export default function Home() {
  // Dữ liệu cho các phần giống nhau
  const stats = [
    { value: "50+", label: "Trạm cứu trợ" },
    { value: "100+", label: "Bé thú cưng" },
    { value: "200+", label: "Sản phẩm" },
  ];

  // const svgDecorations = [
  //   { src: "/assets/icons/dots.svg", alt: "dot", style: { top: "10%", left: "5%" } },
  //   { src: "/assets/icons/paw.svg", alt: "paw", style: { top: "50%", left: "10%" } },
  // ];



  return (
    <>

      <section className="md:px-28 md:py-16">

        <div className="absolute">
          <LayoutBGFlicker
            className=" inset-0 z-0 size-full [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
            squareSize={4}
            gridGap={1}
            color="#f5bfc1"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={450}
          />
        </div>
        <div className="relative flex flex-col gap-5 lg:flex-row lg:gap-x-10">

          <div className="relative z-10 flex flex-1 flex-col gap-6">
            <h2 className="text-center font-medium italic text-brand-200 lg:text-left">
              #cơ hội thứ 2, mái ấm mãi mãi
            </h2>
            <h1 className="text-center text-3xl font-semibold md:text-5xl lg:text-left">
              Tìm kiếm thú cưng cho bạn
            </h1>
            <p className="text-center text-lg font-medium text-gray-500 md:text-xl lg:text-left">
              Pawbloom – Nơi kết nối những trái tim yêu thương với những chú thú cưng cần được yêu thương.
              Chúng tôi giúp tạo dựng mái ấm mới, mang lại cơ hội thứ hai cho thú cưng từ các trạm cứu trợ.
            </p>

            <div className="flex justify-center gap-10 lg:justify-start">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center gap-2 lg:items-start">
                  <h1 className="text-3xl font-bold text-brand md:text-4xl">{stat.value}</h1>
                  <p className="text-sm text-gray-600 font-medium md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex flex-1 justify-center">
            <Image
              src={homePageImage}
              alt="pet"
              width={500}
              height={500}
              className="h-auto max-w-full rounded-md object-cover"
            />
          </div>
        </div>



      </section>
      <section className="border-t-2 border-brand p-10">
        <h1 className="mb-10 text-center text-4xl font-semibold text-brand-200">Về Chúng Tôi</h1>
        <div className="flex flex-col items-center gap-10 md:flex-row">
          <div className="flex flex-1 justify-center">
            <Image src={homePageImage} alt="pet" width={500} height={500} className="rounded-md object-cover" />
          </div>

          {/* Nội dung bên phải */}
          <div className="flex flex-1 flex-col justify-center gap-4">
            <h2 className="text-center text-3xl font-semibold leading-normal md:text-left">
              Vì một tương lai tốt đẹp cho những người bạn bốn chân
            </h2>
            <p className="text-center text-xl font-medium text-gray-500 md:text-left">
              PawBloom được thành lập với mục tiêu kết nối những trạm cứu trợ động vật với những người có lòng yêu thương,
              sẵn sàng trao cho các bé một mái ấm mới. Chúng tôi tin rằng mỗi chú chó, chú mèo đều xứng đáng có một cuộc sống tốt đẹp hơn...
            </p>
            <div className="text-center md:text-left">
              <WatchMoreButton href={Path.ABOUT} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-brand p-16">
        <h1 className="mb-10 text-center text-4xl font-semibold text-brand-200">Nhận nuôi</h1>
        <div className="flex flex-col gap-6">
          <p className="p-text-gray text-center">Nhiều động vật được chúng tôi cứu sẽ không thể được nhận nuôi vì tuổi già, vấn đề sức khỏe hoặc khuyết tật. Điều đó có nghĩa là chúng tôi cần có khả năng chi trả chi phí thức ăn, nơi trú ẩn và chăm sóc y tế cho chúng trong suốt quãng đời còn lại!</p>
          <p className="p-text-gray text-center">Bạn có thể giúp họ bằng cách trở thành nhà tài trợ hàng tháng.
            Hãy gặp gỡ những con vật của chúng tôi bên dưới!</p>
          <div>
            <MeetPets />
          </div>
          <div className="mt-8 text-center">
            <WatchMoreButton href={Path.ADOPT} />
          </div>
        </div>
      </section>

      <section className="border-t-2 border-brand p-16">
        <h1 className="mb-10 text-center text-4xl font-semibold text-brand-200">Sản phẩm</h1>
        <div className="">
          <ProductList />
        </div>
        <div className="text-center">
          <WatchMoreButton href={Path.PRODUCT} />
        </div>
      </section>

      <section className="border-t-2 border-brand p-16">
        <h1 className="mb-10 text-center text-4xl font-semibold text-brand-200">Sự Kiện</h1>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <CarouselCustom
            pauseOnHover
            className="[--duration:60s]"
          >
            {eventData.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </CarouselCustom>
        </div>
        <div className="text-center">
          <WatchMoreButton href="/event" />
        </div>
      </section>

      <section className="border-t-2 border-brand p-16">
        <h1 className="mb-10 text-center text-4xl font-semibold text-brand-200">Tin Tức</h1>
        <div className="">
          <FeaturePost />
          <div className="mt-4 text-center">
            <WatchMoreButton href={Path.BLOG} />
          </div>
        </div>
      </section>
    </>
  );
}

import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import { cn } from '@/lib/utils'
import { ChevronRight, ImageIcon, Package2, PanelLeft } from 'lucide-react'
import Image from 'next/image'

const featureList = [
    {
        title: "Lý do thành lập",
        description: "PawBloom ra đời nhằm giải quyết vấn đề ngày càng tăng về thú cưng bị bỏ rơi dẫn đến những ảnh hưởng đến tính mạng của các bé và khó khăn trong việc kết nối những người nhận nuôi với các trung tâm cứu hộ. Cách tạo ra một nền tảng tập trung, giúp quá trình nhận nuôi nên dễ dàng và nhanh chóng hơn.",
        icon: <ImageIcon className='size-6' strokeWidth={1.5} />
    },
    {
        title: "Vì tương lai tốt đẹp cho những người bạn bốn chân",
        description: "PawBloom được thành lập với mục tiêu kết nối những trạm cứu trợ động vật với những người có lòng yêu thương, sẵn sàng trao cho các bé một mái ấm mới Chúng tôi tin rằng mỗi chú chó, chú mèo đều xứng đáng có một cuộc sống tốt đẹp hơn và nhiệm vụ của chúng tôi là trở thành cầu nối giúp hiện thực hóa ước mơ đó.",
        icon: <Package2 className='size-6' strokeWidth={1.5} />
    },
    {
        title: "Sứ mệnh",
        description: "Sứ mệnh của Pawbloom là tạo ra một nền tàng đơn giản và nhân văn, kết nối thú cưng cần nhà với những người yêu thương chúng. Bằng cách cung cấp dịch vụ toàn diện để sử dụng. Pawbloom mong muốn giảm thiểu số lượng thú cưng vô gia cư và thúc đẩy việc nuôi dưỡng thú cưng có trách nhiệm",
        icon: <PanelLeft className='size-6' strokeWidth={1.5} />
    },
]


const Features = () => {
    return (
        <section id='features' className='w-full py-32 flex flex-col items-center justify-center'>
            <div className='container px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative'>
                <div className='col-span-full space-y-4'>
                    <AnimatedGradientText className='ml-0 bg-background backdrop-blur-0'>
                        <span
                            className={cn(
                                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                            )}
                        >
                            Introducing Magic UI
                        </span>
                        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedGradientText>
                    <h2 className='text-2xl font-bold xs:text-3xl sm:text-4xl'>Unlock unlimited possibilities</h2>
                    <p className='text-sm text-muted-foreground xs:text-base lg:max-w-[75%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, iure ipsum corrupti ad deserunt voluptates sequi architecto, harum eligendi porro nulla pariatur cupiditate rem quos aliquid, facilis nemo maxime autem.</p>
                </div>

                <div className='order-2 flex flex-col items-start justify-start lg:order-1'>
                    {
                        featureList.map(feature => (
                            <div key={feature.title} className='flex items-start gap-2 rounded-lg py-8 sm:gap-4 lg:p-12'>
                                <span className='rounded-md p-0 text-foreground sm:bg-foreground sm:p-2 sm:text-background'>{feature.icon}</span>
                                <div>
                                    <h3 className='text-xl font-medium sm:text-2xl'>{feature.title}</h3>
                                    <p className='text-sm text-muted-foreground xs:text-base'>{feature.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className={cn("h-fit lg:sticky top-32 pl-16 pt-16 rounded-lg border border-r-gray-300 border-b-gray-300 animate-gradient bg-gradient-to-r from-[#627fab] via-[#b95480] to-[#627fab] bg-[length:var(--bg-size)_100%] [--bg-size:400%] order-1 lg:order-2")}>
                    <Image src="/assets/images/homepage.png" alt='test' width={120} height={120} className='w-full h-auto rounded-tl-lg' />
                </div>
            </div>
        </section>
    )
}

export default Features
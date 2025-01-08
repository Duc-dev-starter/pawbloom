import { Footer, Header } from '@/components/common'
import { Button } from '@/components/ui/button'
import Path from '@/constants/paths'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <Header />
            <div className="flex h-[50vh] w-screen items-center justify-around px-12">
                <div className='flex flex-col gap-3'>
                    <h2 className='h2'>Đường dẫn bạn truy cập không thể tìm thấy</h2>
                    <p>Xin lỗi, trang bạn tìm kiếm không thể được tìm thấy.</p>
                    <Link href={Path.HOME}>
                        <Button className='bg-brand-100 hover:bg-brand-200'>
                            Quay lại trang chủ
                        </Button>
                    </Link>
                </div>

                <div className='hidden md:block'>
                    <Image src="/assets/images/homepage.png" alt='not-found-image' width={200} height={200} />
                </div>
            </div>
            <Footer />
        </>
    )
}

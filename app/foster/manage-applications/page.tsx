import ManageApplicationsComponent from '@/components/foster/manage-applications/manage-applications-component';
import { Metadata } from 'next';
import React from 'react'

export const generateMetadata = async (): Promise<Metadata> => ({
	title: 'Quản lý các đơn nhận nuôi thú cưng của trạm',
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


function PageManageApplication() {
	return (
		<div>
			<ManageApplicationsComponent />
		</div>
	)
}

export default PageManageApplication
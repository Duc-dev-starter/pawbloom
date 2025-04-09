import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Blog } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


interface CardNewsProps {
	blog: Blog;
}

function CardNews({ blog }: CardNewsProps) {
	return (
		<Card>
			<CardHeader>
				<Image src="/assets/images/newspost.png" alt={blog.title} width={100} height={100} className='w-full h-full object-cover' />
			</CardHeader>
			<CardContent>
				<CardTitle className='text-2xl'>{blog.title}</CardTitle>
				<CardDescription>
					{blog.description || blog.content.substring(0, 100) + '...'}
				</CardDescription>
			</CardContent>
			<CardFooter>
				<Link href={`/blog/${blog.id}`}>
					<Button>Đọc thêm</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}

export default CardNews;
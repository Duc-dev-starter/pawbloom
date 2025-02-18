import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

function CardNews() {
	return (
		<Card>
			<CardHeader>
				<Image src="/assets/images/newspost.png" alt="test" width={100} height={100} className='w-full h-full object-cover' />
			</CardHeader>
			<CardContent>
				<CardTitle className='text-2xl'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</CardTitle>
				<CardDescription>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</CardDescription>
			</CardContent>
			<CardFooter>
				<Button>
					Read More
				</Button>
			</CardFooter>
		</Card>
	)
}

export default CardNews

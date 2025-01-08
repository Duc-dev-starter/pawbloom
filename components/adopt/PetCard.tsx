"use client"
import React from 'react'
import { Button } from '../ui/button'
import { FaBookBookmark, FaHeart } from 'react-icons/fa6'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Pet } from '@/types/pet'
import { useRouter } from 'next/navigation'

const PetCard = ({ pet }: { pet: Pet }) => {
    const router = useRouter();
    return (
        <div className='relative p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 bg-white rounded-tl-xl rounded-tr-xl'>
                    <Button className={`p-2 size-10 text-xl text-gray-300 border-gray-300 flex items-center justify-center rounded-full border-2`}><FaHeart /></Button>
                    <Button className={`p-2 size-10 text-xl text-gray-300 border-gray-300 flex items-center justify-center rounded-full border-2`}><FaBookBookmark /></Button>
                </div>
                <Button className={`p-2 size-10 text-xl text-gray-300 border-gray-300 flex items-center justify-center rounded-full border-2
                    hover:bg-[#00b894] hover:border-transparent hover:text-white transition-all duration-300 ease-in-out`}
                    onClick={() => router.push(`/pet/${pet.id}`)}><ArrowRight /></Button>
            </div>
            <div className='flex gap-4'>
                <div className='flex-1'>
                    <Image src={pet?.images[0]} alt={pet.name} width={200} height={200} className='object-contain' />
                </div>
                <div className='flex-1 flex flex-col items-center justify-center gap-4'>
                    <div className='mb-2 flex gap-2'>
                        <p className='text-xs uppercase font-semibold text-gray-500'>50kg</p>
                    </div>
                    <h2 className='text-2xl text-gray-800 capitalize font-bold text-center'>Test</h2>
                    <div className='flex justify-center gap-2'>
                        <p className='text-xs uppercase font-semibold text-white px-5 py-1 rounded-full'>Husky</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PetCard
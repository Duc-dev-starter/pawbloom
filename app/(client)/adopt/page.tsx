import SearchPet from '@/components/adopt/SearchPet'
import React from 'react'

const AdoptPage = () => {
    return (
        <section className='min-h-[91vh]'>
            <SearchPet />
            <div className='px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

            </div>
        </section>
    )
}

export default AdoptPage
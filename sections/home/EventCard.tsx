import Image from 'next/image'
import React from 'react'

type Event = {
    title: string;
    date: string;
    location: string;
    description: string;
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    return (
        <div className="flex flex-col items-center gap-4 rounded-md border p-4 shadow-lg">
            <div>
                <Image src="/assets/images/homepage.png" alt="Event" width={120} height={120} className="rounded-md" />
            </div>
            <div className="flex flex-col gap-2 text-center">
                <p className="text-lg font-bold">{event.title}</p>
                <p>{event.date}</p>
                <p>{event.location}</p>
                <p className="text-gray-500">{event.description}</p>
            </div>
        </div>
    )
}

export default EventCard
'use client'
import { CalendarPicker } from '@/components/common'
import React from 'react'

import { PieChartComponent } from './component/PieChartComponent'
import { BarChartComponent } from './component/BarChartComponent'

const Dashboard = () => {


    return (
        <div>
            <div className='flex justify-end mr-5 my-5'>
                <CalendarPicker />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <PieChartComponent />
                    <BarChartComponent />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>

        </div>
    )
}

export default Dashboard
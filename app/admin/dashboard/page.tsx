'use client'
import { CalendarPicker } from '@/components/common'
import React from 'react'

import { PieChartComponent } from './component/PieChartComponent'
import { BarChartComponent } from './component/BarChartComponent'
import { CustomAreaChart } from '@/sections/admin/chart/AreaChart'
import { AreaChartInteractiveCustom } from '@/components/admin/dashboard/AreaChartInteractiveCustom'

const Dashboard = () => {

    return (
        <div>
            <div className='my-5 mr-5 flex justify-end'>
                <CalendarPicker />
            </div>
            <div className="flex flex-1 flex-col gap-10 p-4 pt-0">
                <AreaChartInteractiveCustom />
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <PieChartComponent />
                    <BarChartComponent />
                    <CustomAreaChart />
                </div>
                <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>

        </div>
    )
}

export default Dashboard
import Dropdown from '@/components/Dropdown'
import React from 'react'

const testDropdown = [
    {
        label: "Delete",
        value: "delete"
    }
]

const Home = () => {
    return (
        <div>Home
            <Dropdown actions={testDropdown} />
        </div>
    )
}

export default Home
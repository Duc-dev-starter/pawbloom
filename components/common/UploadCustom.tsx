import { CloudUpload } from 'lucide-react'
import React from 'react'

const UploadCustom = () => {
  return (
    <div className='mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center'>
          <CloudUpload className='size-10' />
          <h2 className='font-bold text-lg'>Upload Image</h2>
          <p className=''>Click button select image</p>
        </div>

        <div></div>
      </div>
    </div>
  )
}

export default UploadCustom
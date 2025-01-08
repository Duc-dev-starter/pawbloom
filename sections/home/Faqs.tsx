import faqs from '@/constants/faqs'
import { Tag } from 'lucide-react'
import React from 'react'

const Faqs = () => {
  return (
    <section className='container'>
      <Tag>Faqs</Tag>
      <h2>Questions? We&apos;ve got <span>answer</span></h2>
      <div>
        {faqs.map(faq => (
          <div key={faq.question}>
            <div>
              <h3>{faq.question}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Faqs
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import { faqs } from '@/constants/about'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

const Question = ({ question, answer }: { question: string, answer: string }) => {
    return <AccordionItem value={question}>
        <AccordionTrigger className='text-left'>{question}</AccordionTrigger>
        <AccordionContent className='text-muted-foreground'>
            {answer}
        </AccordionContent>
    </AccordionItem>
}

const Faqs = () => {
    return (
        <section id='faqs' className='w-full pt-20 pb-28 px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto flex flex-col items-center justify-center overflow-hidden'>
            <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                <span
                    className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                    )}
                >
                    FAQS
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
            <h2 className='mt-4 text-2xl font-bold xs:text-3xl sm:text-4xl'>Những câu hỏi thường gặp</h2>
            <p className='mt-4 text-center text-base text-muted-foreground lg:max-w-[75%]'>Đây là 1 số câu hỏi mà chúng tôi thường gặp</p>

            <Accordion type='single' collapsible className='w-full max-w-4xl mx-auto mt-16'>
                {
                    faqs.map((faq) => (
                        <Question key={faq.question} {...faq} />
                    ))
                }
            </Accordion>
        </section>
    )
}

export default Faqs
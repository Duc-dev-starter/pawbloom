"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sendFeedback } from "@/app/actions/feedback"
import { CheckCircle, Loader2 } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    subject: z.string().min(1, { message: "Vui lòng chọn chủ đề" }),
    message: z.string().min(10, { message: "Tin nhắn phải có ít nhất 10 ký tự" }),
})

type FormValues = z.infer<typeof formSchema>

export default function FeedbackForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true)
        setError(null)

        try {
            await sendFeedback(data)
            setIsSuccess(true)
            form.reset()
        } catch (err) {
            setError("Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại sau.")
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="rounded-lg border border-green-100 bg-green-50 p-6 text-center">
                <div className="mb-4 flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-green-800">Phản hồi đã được gửi!</h3>
                <p className="mb-4 text-green-700">
                    Cảm ơn bạn đã gửi phản hồi. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.
                </p>
                <Button onClick={() => setIsSuccess(false)} className="bg-green-600 hover:bg-green-700">
                    Gửi phản hồi khác
                </Button>
            </div>
        )
    }

    return (
        <div className="rounded-lg border p-6 shadow-sm">
            {error && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-red-800">
                    <p>{error}</p>
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Họ tên</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nguyễn Văn A" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chủ đề</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn chủ đề phản hồi" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="general">Phản hồi chung</SelectItem>
                                        <SelectItem value="adoption">Nhận nuôi thú cưng</SelectItem>
                                        <SelectItem value="donation">Quyên góp</SelectItem>
                                        <SelectItem value="volunteer">Tình nguyện viên</SelectItem>
                                        <SelectItem value="other">Khác</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nội dung</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Nhập nội dung phản hồi của bạn..." className="min-h-[150px]" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Vui lòng cung cấp càng nhiều thông tin càng tốt để chúng tôi có thể hỗ trợ bạn tốt nhất.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Đang gửi...
                            </>
                        ) : (
                            "Gửi phản hồi"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

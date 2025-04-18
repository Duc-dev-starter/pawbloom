"use server"

import { z } from "zod"
import nodemailer from "nodemailer"

const feedbackSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(10),
})

type FeedbackData = z.infer<typeof feedbackSchema>

export async function sendFeedback(data: FeedbackData) {
    // Validate the data
    const validatedData = feedbackSchema.parse(data)

    // Create a test account if you don't have real credentials
    // For production, use your actual SMTP credentials
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number.parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    // Get the recipient email from environment variables or use a default
    const recipientEmail = process.env.FEEDBACK_EMAIL || "leminhduck@gmail.com"

    // Format the subject based on the selected category
    const subjectMap: Record<string, string> = {
        general: "Phản hồi chung",
        adoption: "Phản hồi về nhận nuôi thú cưng",
        donation: "Phản hồi về quyên góp",
        volunteer: "Phản hồi về tình nguyện viên",
        other: "Phản hồi khác",
    }

    const emailSubject = `[Pawbloom] ${subjectMap[validatedData.subject] || "Phản hồi mới"}`

    // Create the email content
    const mailOptions = {
        from: `"Pawbloom Website" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        subject: emailSubject,
        text: `
      Phản hồi mới từ website Pawbloom
      
      Họ tên: ${validatedData.name}
      Email: ${validatedData.email}
      Chủ đề: ${subjectMap[validatedData.subject] || validatedData.subject}
      
      Nội dung:
      ${validatedData.message}
    `,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #f5bfc1; border-bottom: 2px solid #f5bfc1; padding-bottom: 10px;">Phản hồi mới từ website Pawbloom</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Họ tên:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${validatedData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">
              <a href="mailto:${validatedData.email}" style="color: #f5bfc1; text-decoration: none;">${validatedData.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Chủ đề:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${subjectMap[validatedData.subject] || validatedData.subject}</td>
          </tr>
        </table>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333;">Nội dung:</h3>
          <p style="white-space: pre-line; margin-bottom: 0;">${validatedData.message}</p>
        </div>
        
        <p style="font-size: 12px; color: #777; text-align: center; margin-top: 30px;">
          Email này được gửi tự động từ website Pawbloom. Vui lòng không trả lời email này.
        </p>
      </div>
    `,
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions)

    return { success: true, messageId: info.messageId }
}

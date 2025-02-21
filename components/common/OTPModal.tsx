"use client"
import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from "next/image";
import { Button } from "../ui/button";

const OTPModal = ({ email }: { email: string }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log(e.target)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleResendOTP = async () => {

    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader className="relative flex justify-center">
                    <AlertDialogTitle className="h2 text-center">Nhập mã OTP</AlertDialogTitle>
                    <Image src="/assets/icons/close-dark.svg" alt="close" className="otp-close-button"
                        width={20} height={20} onClick={() => setIsOpen(false)} />
                    <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                        Chúng tôi đã gửi mã OTP về<span className="pl-1 text-brand-100">{email}</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <InputOTP maxLength={6} value={password} onChange={setPassword}>
                    <InputOTPGroup className="shad-otp">
                        <InputOTPSlot index={0} className="shad-otp-slot" />
                        <InputOTPSlot index={1} className="shad-otp-slot" />
                        <InputOTPSlot index={2} className="shad-otp-slot" />
                        <InputOTPSlot index={3} className="shad-otp-slot" />
                        <InputOTPSlot index={4} className="shad-otp-slot" />
                        <InputOTPSlot index={5} className="shad-otp-slot" />
                    </InputOTPGroup>
                </InputOTP>
                <AlertDialogFooter>
                    <div className="flex w-full flex-col gap-4">
                        <AlertDialogAction onClick={handleSubmit} className="shad-submit-btn h-12" type="button">
                            Xác nhận
                            {isLoading && (
                                <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24} className="ml-2 animate-spin" />
                            )}
                        </AlertDialogAction>
                        <div className="subtitle-2 mt-2 text-center">
                            Chưa nhận được mã?
                            <Button type="button" variant="link" className="pl-1 text-brand-100" onClick={handleResendOTP}>
                                Ấn vào để gửi lại
                            </Button>
                        </div>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default OTPModal;
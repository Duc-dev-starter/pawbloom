"use client"; // Dòng này giữ nguyên vì component chạy trên client

import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider } from "@/lib/firebase";
import axios from "axios";
import { Button } from "@/components/ui/button";

const FacebookLoginButton = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLoginWithFacebook = async () => {
        if (!isClient) return; // Chặn nếu chưa render trên client
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const idToken = await result.user.getIdToken();

            console.log("Facebook ID Token:", idToken);

            const response = await axios.post("https://your-backend.com/api/auth", {
                provider: "facebook",
                idToken,
            });

            console.log("Backend response:", response.data);
        } catch (error) {
            console.error("Facebook login error:", error);
        }
    };

    return (
        <Button onClick={handleLoginWithFacebook}>
            Đăng nhập với Facebook
        </Button>
    );
};

export default FacebookLoginButton;

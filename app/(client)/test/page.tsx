"use client"

import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider } from "@/lib/firebase";
import axios from "axios";
import { Button } from "@/components/ui/button";

const handleLoginWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const idToken = await result.user.getIdToken(); // Lấy ID token từ Firebase

        console.log("Facebook ID Token:", idToken);

        // Gửi ID Token đến backend
        const response = await axios.post("https://your-backend.com/api/auth", {
            provider: "facebook",
            idToken: idToken,
        });

        console.log("Backend response:", response.data);
    } catch (error) {
        console.error("Facebook login error:", error);
    }
};


const FacebookLoginButton = () => {
    return (
        <Button onClick={handleLoginWithFacebook}>
            Đăng nhập với Facebook
        </Button>
    );
};

export default FacebookLoginButton;

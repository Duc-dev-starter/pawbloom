"use client"
import { AuthForm } from '@/components/common'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const SignInComponent = ({ pageProps = {} }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { session, ...restPageProps } = pageProps;

    return (
        <SessionProvider session={session}>
            <AuthForm type="sign-in" {...restPageProps} />
        </SessionProvider>
    )
}

export default SignInComponent
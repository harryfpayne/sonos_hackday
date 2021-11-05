import React from "react";
import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Toaster position="bottom-center" />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;

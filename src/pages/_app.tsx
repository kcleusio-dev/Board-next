import React from "react";
import { Header } from "@/components/Header";
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { AppProps } from "next/app";

import '../styles/global.scss'

import { SessionProvider as NextAuthProvider } from "next-auth/react"


const initialOptions = {
  'clientId': "Ae9pGYej0ToYH5qYBbFU0xLkBPi08coIy-5CV6wpbK2SgFjVtAdMGVbudq5uUuCZnQgPenfilS8ucYxg",
  currency: "USD",
  intent: 'capture'
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={ initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>


    </NextAuthProvider>
  )
}

export default MyApp;
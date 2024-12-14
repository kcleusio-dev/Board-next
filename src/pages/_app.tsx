import React from "react";
import { Header } from "@/components/Header";
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { AppProps } from "next/app";

import '../styles/global.scss'

import { SessionProvider as NextAuthProvider } from "next-auth/react"


const initialOptions = {
  'clientId': "AWPF1t-BaphgnM-zlADdMNv5KzRUbroxPPnibpd5chY93GXGo6x30XWfuE6wvAfj_NhhoNEbgf_vWxjr",
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
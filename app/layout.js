"use client"
import { Inter } from "next/font/google";
import { useEffect } from 'react';
import "./globals.css";
import "./style.css";
import Head from 'next/head'
import { Provider } from "react-redux";
import { store } from "./api/store";
import { Suspense } from "react";

// export const metadata = {
//   title: "SwiftSwap - Your Trusted Delivery Service",
//   description: "Delivering your second-hand treasures with care and efficiency.",
// };

export default function RootLayout({ children }) {

  // Adding Tawk.to Chat widget
  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/66fabfb74cbc4814f7e0fe4e/1i91nppdv';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error=()=>{};
  return (
    <html title="SnabbDeal - Your Trusted Local Delivery Service for Marketplace Items" lang="en">
      <Head>
        <meta name="Need fast and secure delivery for your marketplace finds? SnabbDeal delivers items from Facebook Marketplace, OfferUp, Craigslist, and more. Let us handle your pickups!" keywords="SnabbDeal, marketplace delivery, Facebook Marketplace delivery, Craigslist delivery service, OfferUp delivery, local delivery service, secondhand item delivery, used items delivery, affordable pickup and delivery, package delivery, local pickup, fast local delivery, delivery for marketplace items, secure delivery service, Boston delivery service" content="SnabbDeal, marketplace delivery, Facebook Marketplace delivery, Craigslist delivery service, OfferUp delivery, local delivery service, secondhand item delivery, used items delivery, affordable pickup and delivery, package delivery, local pickup, fast local delivery, delivery for marketplace items, secure delivery service, Boston delivery service" />
        <link
          rel="icon"
          href="/logo/favicon.ico"
          type="ico"
          sizes={40}
        />
      </Head>
      <body>
        <Provider store={store}>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}

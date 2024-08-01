
//import { useState } from 'react'
// import { NextIntlClientProvider } from 'next-intl';
//import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Inter } from "next/font/google";
import Header from '../common/Header';



const inter = Inter({ subsets: ["latin"] });



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  //const messages = await getMessages();

  //const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* <NextIntlClientProvider messages={messages}> */}
          <div className="h-full bg-gradient-to-b from-indigo-950 to-white via-indigo-300">
            <Header />
            {children}
          </div>
        {/* </NextIntlClientProvider> */}
      </body>
    </html>
  );
}

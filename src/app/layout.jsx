/* eslint-disable react/prop-types */
"use client";

import { useRouter } from "next/navigation";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { IntlProvider } from "next-intl";
import enMessages from "../dictionaries/en/common.json";
import kaMessages from "../dictionaries/ka/common.json";

// The RootLayout component that dynamically loads language files
export default function RootLayout({ children }) {
  const { locale } = useRouter();

  // Load the appropriate messages based on the locale
  const messages = locale === "ka" ? kaMessages : enMessages;

  return (
    <html lang={locale}>
      <UserProvider>
        <body>
          <div id="root">
            <IntlProvider messages={messages} locale={locale}>
              {children}
            </IntlProvider>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}

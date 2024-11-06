import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

/* eslint-disable react/prop-types */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <div id="root">{children}</div>
        </body>
      </UserProvider>
    </html>
  );
}

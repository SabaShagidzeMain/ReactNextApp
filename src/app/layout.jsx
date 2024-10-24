/* eslint-disable react/prop-types */
import AuthChecker from "@/Utilities/AuthChecker";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Gaming App</title>
      </head>
      <body>
        <div id="root"><AuthChecker>{children}</AuthChecker></div>
      </body>
    </html>
  );
}

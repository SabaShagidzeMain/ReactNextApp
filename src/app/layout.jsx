/* eslint-disable react/prop-types */
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Gaming App</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

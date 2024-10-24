import "./globals.css";

export const metadata = {
  title: "Gaming App",
  description: "Web site created with Next.js.",
};

/* eslint-disable react/prop-types */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

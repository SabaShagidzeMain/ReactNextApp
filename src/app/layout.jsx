/* eslint-disable react/prop-types */
import "./globals.css";

export const metadata = {
  title: "Gaming App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
  );
}

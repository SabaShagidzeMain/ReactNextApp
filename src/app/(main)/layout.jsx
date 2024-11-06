import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
/* eslint-disable react/prop-types */
export default function MainLayout({ children }) {
  return (
    <>
        <Header />
        <main>{children}</main>
        <Footer />
    </>
  );
}

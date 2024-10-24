import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import AuthChecker from "@/Utilities/AuthChecker";

export const metadata = {
  title: "Gaming App",
};

/* eslint-disable react/prop-types */
export default function MainLayout({ children }) {
  return (
    <>
      <AuthChecker>
        <Header />
        <main>{children}</main>
        <Footer />
      </AuthChecker>
    </>
  );
}

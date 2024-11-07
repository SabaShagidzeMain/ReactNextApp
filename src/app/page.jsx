"use client";

import "./page.css";
import "./globals.css";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import LanguageSwitcher from "@/Components/LanguageSwitcher/LanguageSwitcher";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("landing");

  return (
    <>
      <Header />
      <main className="main landing-main">
        <LanguageSwitcher />
        <div className="landing-bot bg-white dark:bg-custom-gray">
          <h1 className="landing-header text-custom-gray dark:text-white">
            Game Store
          </h1>
          <p className="landing-desc text-custom-gray dark:text-white">
            {t("desc")}
          </p>
          <button className="landing-button">{t("button")}</button>
        </div>
      </main>
      <Footer />
    </>
  );
}

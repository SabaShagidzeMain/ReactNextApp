"use client";

import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();

  const switchLanguage = (lang) => {
    router.push(`/${lang}`); // This will change the URL to /en or /ka
  };

  return (
    <div>
      <button onClick={() => switchLanguage("en")}>English</button>
      <button onClick={() => switchLanguage("ka")}>Georgian</button>
    </div>
  );
}

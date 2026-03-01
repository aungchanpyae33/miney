import { outputBaseUrl } from "@/lib/outputBaseUrl";
import ContextTextBoxLoading from "@/ui/loading/ContextTextBoxLoading";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata() {
  const meta = await getTranslations("MetaData");

  return {
    title: meta("cookiePage.title"),
    description: meta("cookiePage.description"),
    metadataBase: outputBaseUrl(),
    openGraph: {
      title: meta("cookiePage.title"),
      description: meta("cookiePage.description"),
      url: "/cookie",
      type: "website",
      siteName: "Miney",
    },
  };
}

async function CookieContent() {
  const t = await getTranslations("Cookie");
  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold mb-2">{t("title")}</h1>
        <p className="text-ink-400 text-sm">
          {t("lastUpdated")}
          {t("date")}
        </p>
      </header>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section1.title")}</h2>
        <p className="mt-1">{t("section1.desc")}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section2.title")}</h2>
        <ul className="list-disc ml-6 mt-1">
          <li>{t("section2.list").split("\n")[0]}</li>
          <li>{t("section2.list").split("\n")[1]}</li>
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section3.title")}</h2>
        <p className="mt-1">{t("section3.desc")}</p>
      </section>

      <section className="mt-4">
        {" "}
        <h2 className="text-lg font-medium">{t("section4.title")}</h2>{" "}
        <p>
          {t("section4.contact")}
          <a
            className="text-blue-600 underline"
            href={`mailto:${t("section4.email")}`}
          >
            {t("section4.email")}
          </a>
        </p>
      </section>
    </>
  );
}

function Page() {
  return (
    <div className="py-12">
      <div
        id="cookie-policy"
        className="max-w-3xl mx-auto md:p-5 p-2  py-5 bg-cardcontainer rounded-2xl shadow-lg font-sans"
      >
        <Suspense fallback={<ContextTextBoxLoading />}>
          <CookieContent />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;

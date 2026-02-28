import { outputBaseUrl } from "@/lib/outputBaseUrl";
import ContextTextBoxLoading from "@/ui/loading/ContextTextBoxLoading";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata() {
  const meta = await getTranslations("MetaData");

  return {
    title: meta("termsPage.title"),
    description: meta("termsPage.description"),
    metadataBase: outputBaseUrl(),
    openGraph: {
      title: meta("termsPage.title"),
      description: meta("termsPage.description"),
      url: "/terms",
      type: "website",
      siteName: "Miney",
    },
  };
}

async function TermsContent() {
  const t = await getTranslations("Terms");

  const renderList = (text: string) => {
    return text
      .split("\n")
      .map((line, idx) => <li key={idx}>{line.replace(/^•\s*/, "")}</li>);
  };
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
        <p>{t("intro")}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section1.title")}</h2>
        <p className="mt-1">{t("section1.desc")}</p>
        <div className="text-ink-400 my-3 border border-bordersoft p-3 rounded-lg">
          <p>{t("section1.warning")}</p>
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section2.title")}</h2>
        <ul className="list-disc ml-6 mt-1">
          {renderList(t("section2.items"))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section3.title")}</h2>
        <p>{t("section3.desc")}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section4.title")}</h2>
        <ul className="list-disc ml-6 mt-1">
          {renderList(t("section4.items"))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section5.title")}</h2>
        <p>{t("section5.desc")}</p>
      </section>

      <section className="mt-4">
        {" "}
        <h2 className="text-lg font-medium">{t("section6.title")}</h2>{" "}
        <p>
          {t("section6.contact")}
          <a
            className="text-blue-600 underline"
            href={`mailto:${t("section6.email")}`}
          >
            {t("section6.email")}
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
        id="terms-conditions"
        className="max-w-3xl mx-auto md:p-5 p-2  py-5 bg-cardcontainer rounded-2xl shadow-lg font-sans"
      >
        <Suspense fallback={<ContextTextBoxLoading />}>
          <TermsContent />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;

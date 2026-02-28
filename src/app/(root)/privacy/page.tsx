import { outputBaseUrl } from "@/lib/outputBaseUrl";
import ContextTextBoxLoading from "@/ui/loading/ContextTextBoxLoading";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata() {
  const meta = await getTranslations("MetaData");

  return {
    title: meta("privacyPage.title"),
    description: meta("privacyPage.description"),
    metadataBase: outputBaseUrl(),
    openGraph: {
      title: meta("privacyPage.title"),
      description: meta("privacyPage.description"),
      url: "/privacy",
      type: "website",
      siteName: "Miney",
    },
  };
}

async function PrivacyContent() {
  const t = await getTranslations("Privacy");

  // helper to split strings by newline into <li>
  const renderList = (text: string) => {
    return text.split("\n").map((line, idx) => <li key={idx}>{line}</li>);
  };
  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold mb-4">{t("title")}</h1>
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

        <p className="font-semibold mt-2">Mandatory Information:</p>
        <ul className="list-disc ml-6">
          {renderList(t("section1.mandatory"))}
        </ul>

        <p className="font-semibold mt-3">Optional Information:</p>
        <ul className="list-disc ml-6">{renderList(t("section1.optional"))}</ul>

        <p className="mt-2">
          <strong>{t("section1.media")}</strong>
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section2.title")}</h2>
        <ul className="list-disc ml-6 mt-1">{renderList(t("section2.use"))}</ul>
        <p className="italic mt-2">{t("section2.no").split("\n")[0]}</p>
        <ul className="list-disc ml-6">
          {t("section2.no")
            .split("\n")
            .slice(1)
            .map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section3.title")}</h2>
        {t("section3.desc")
          .split("\n")
          .map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section4.title")}</h2>
        <p>{t("section4.desc")}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section5.title")}</h2>
        <p>{t("section5.desc")}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section6.title")}</h2>
        <p>{t("section6.desc")}</p>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">{t("section7.title")}</h2>
        <p>{t("section7.desc")}</p>
      </section>

      <section className="mt-4">
        {" "}
        <h2 className="text-lg font-medium">{t("section8.title")}</h2>{" "}
        <p>
          {t("section8.contact")}
          <a
            className="text-blue-600 underline"
            href={`mailto:${t("section8.email")}`}
          >
            {t("section8.email")}
          </a>
        </p>
      </section>
    </>
  );
}

async function Page() {
  return (
    <div className="py-12">
      <div
        id="privacy-policy"
        className="max-w-3xl mx-auto md:p-5 p-2  py-5 bg-cardcontainer rounded-2xl shadow-lg font-sans"
      >
        <Suspense fallback={<ContextTextBoxLoading />}>
          <PrivacyContent />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;

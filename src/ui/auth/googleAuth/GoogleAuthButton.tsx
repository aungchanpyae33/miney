import Button from "@/components/button/Button";
import { createClient } from "@/database/server";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import { GoogleIcon } from "@/ui/profile/formChild/icons";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

async function GoogleAuthButton({
  displayText,
}: {
  displayText: "signInWithGoogle" | "signUpWithGoogle";
}) {
  const au = await getTranslations("Auth");
  async function handleGoogleSignIn() {
    "use server";
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${outputBaseUrl().toString()}/auth/callback`,
      },
    });
    if (error) {
      redirect("/auth/error");
    } else if (data.url) {
      redirect(data.url);
    }
  }
  return (
    <Button
      className="flex items-end p-2 gap-2 mx-auto w-2/3 justify-center "
      onClick={handleGoogleSignIn}
    >
      <span>
        <GoogleIcon className="size-8" />
      </span>
      {au(displayText)}
    </Button>
  );
}

export default GoogleAuthButton;

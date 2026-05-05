"use client";
import { FormProvider, useForm } from "react-hook-form";
import { supabase } from "@/database/supabaseClient";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";
import { isAuthApiError } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { authErrorReturn } from "@/lib/auth/authErrorReturn";
import EmailInput from "../loginForm/EmailInput";
import RootErrorText from "../loginForm/RootErrorText";
import SubmitButton from "../loginForm/SubmitButton";
import { useNaviSet } from "@/lib/CustomHooks/useNaviSet";
type ForgotPasswordFormValue = {
  email: string;
};
function ForgotPasswordContainer() {
  const router = useRouter();
  const loader = useTopLoader();
  const [isNavigating, setIsNavigating] = useNaviSet();
  const e = useTranslations("ErrorMsg");
  const methods = useForm<ForgotPasswordFormValue>();
  async function resetAction(data: ForgotPasswordFormValue) {
    if (isNavigating) return;
    try {
      loader.start();
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setIsNavigating(true);
      router.push("/auth/forgot-password/check-email");
    } catch (error: unknown) {
      if (isAuthApiError(error)) {
        const message = authErrorReturn(error);
        methods.setError("root", {
          type: "manual",
          message: e(`${message}`),
        });
      } else {
        methods.setError("root", {
          type: "manual",
          message: e("wentWrong"),
        });
      }
      setIsNavigating(false);
      loader.done();
    }
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(resetAction)} className="space-y-5">
        <EmailInput />
        <RootErrorText />
        <SubmitButton
          actionText="sendResetLink"
          isPending={
            isNavigating ||
            methods.formState.isValidating ||
            methods.formState.isSubmitting
          }
        />
      </form>
    </FormProvider>
  );
}

export default ForgotPasswordContainer;

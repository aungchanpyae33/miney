"use client";
import { FormProvider, useForm } from "react-hook-form";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import { supabase } from "@/database/supabaseClient";
import { useTopLoader } from "nextjs-toploader";
import RootErrorText from "./RootErrorText";
import { isAuthApiError } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { authErrorReturn } from "@/lib/auth/authErrorReturn";
import { useNaviSet } from "@/lib/CustomHooks/useNaviSet";
type LoginValues = {
  email: string;
  password: string;
};
function LoginFormContainer() {
  const loader = useTopLoader();
  const [isNavigating, setIsNavigating] = useNaviSet();
  const e = useTranslations("ErrorMsg");
  const methods = useForm<LoginValues>();
  async function loginAction(data: LoginValues) {
    try {
      loader.start();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      setIsNavigating(true);
      window.location.href = "/";
    } catch (error: unknown) {
      if (isAuthApiError(error) && error.code) {
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
      <form onSubmit={methods.handleSubmit(loginAction)} className=" space-y-5">
        <EmailInput />
        <PasswordInput />
        <RootErrorText />
        <SubmitButton
          actionText="login"
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

export default LoginFormContainer;

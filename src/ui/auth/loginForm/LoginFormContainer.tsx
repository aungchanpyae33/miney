"use client";
import { FormProvider, useForm } from "react-hook-form";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import { supabase } from "@/database/supabaseClient";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";
import RootErrorText from "./RootErrorText";
import { isAuthApiError } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { authErrorReturn } from "@/lib/auth/authErrorReturn";
import { useState } from "react";
type LoginValues = {
  email: string;
  password: string;
};
function LoginFormContainer() {
  const router = useRouter();
  const loader = useTopLoader();
  const [isNavigating, setIsNavigating] = useState(false);
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
      router.push("/");
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

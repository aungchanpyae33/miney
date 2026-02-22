"use client";
import { FormProvider, useForm } from "react-hook-form";
import { supabase } from "@/database/supabaseClient";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";
import { isAuthApiError } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { authErrorReturn } from "@/lib/auth/authErrorReturn";
import EmailInput from "../loginForm/EmailInput";
import PasswordInput from "../loginForm/PasswordInput";
import RootErrorText from "../loginForm/RootErrorText";
import SubmitButton from "../loginForm/SubmitButton";
import { useState } from "react";
type SignUpValues = {
  email: string;
  password: string;
};
function SignUpFormContainer() {
  const router = useRouter();
  const loader = useTopLoader();
  const [isNavigating, setIsNavigating] = useState(false);
  const e = useTranslations("ErrorMsg");
  const methods = useForm<SignUpValues>();
  async function loginAction(data: SignUpValues) {
    if (isNavigating) return;
    try {
      loader.start();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      });

      if (error) throw error;
      setIsNavigating(true);
      router.push("/auth/sign-up-success");
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
      <form
        onSubmit={methods.handleSubmit(loginAction)}
        onKeyDown={(e) => {
          // Prevent Enter from submitting the form
          if (e.key === "Enter") {
            const target = e.target as HTMLElement;
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
              e.preventDefault();
            }
          }
        }}
        className=" space-y-5"
      >
        <EmailInput />
        <PasswordInput />
        <RootErrorText />
        <SubmitButton
          actionText="signup"
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

export default SignUpFormContainer;

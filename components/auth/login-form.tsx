"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import LoadingSpinner from "../ui/loading";
import { login } from "@/actions/login";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { twoFactorVerificationLogin } from "@/actions/two-factor";

export function Login() {
  const [state, action] = useFormState(login, undefined);
  const [confirmState, confirmAction] = useFormState(
    twoFactorVerificationLogin,
    undefined
  );

  const onClick = (provider: "google" | "github") => {
    // signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    signIn(provider, { callbackUrl: "/" });
  };

  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with other provider!!!"
      : "";

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" className="w-full">
        {pending ? <LoadingSpinner /> : "Login"}
      </Button>
    );
  }

  function SubmitFactorButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" className="w-full">
        {pending ? <LoadingSpinner /> : "Confirm"}
      </Button>
    );
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state?.twoFactor && (
          <form action={confirmAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Two Factor Code</Label>
              <Input id="code" name="code" placeholder="123456" required />

              <Input
                id="email"
                name="email"
                type="hidden"
                value={state.email}
              />

              <Input
                id="password"
                name="password"
                type="hidden"
                value={state.password}
              />
            </div>
            <SubmitFactorButton />
            {confirmState?.error || urlError}
          </form>
        )}
        {!state?.twoFactor && (
          <form action={action} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/reset"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>

            <SubmitButton />
            {state?.error || urlError || state?.success}
          </form>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="grid gap-2">
            <Button
              onClick={() => onClick("google")}
              variant="outline"
              className="w-full"
            >
              <FcGoogle className="w-5 h-5" />
            </Button>
          </div>
          <div className="grid gap-2">
            <Button
              onClick={() => onClick("github")}
              variant="outline"
              className="w-full"
            >
              <FaGithub className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

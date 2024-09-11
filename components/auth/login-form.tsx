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
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { twoFactorVerificationLogin } from "@/actions/two-factor";
import { googleLogin } from "@/actions/google-login";
import { githubLogin } from "@/actions/github-login";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function Login() {
  const [state, action] = useFormState(login, undefined);
  const [confirmState, confirmAction] = useFormState(
    twoFactorVerificationLogin,
    undefined
  );

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with other provider!!!"
      : "";

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" className="w-full">
        {pending ? <LoadingSpinner /> : "Sign in"}
      </Button>
    );
  }

  function SubmitGoogleButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" variant="outline" className="w-full">
        <p className="mr-2">Login with Google</p>
        {pending ? <LoadingSpinner /> : <FcGoogle className="w-5 h-5" />}
      </Button>
    );
  }

  function SubmitGithubButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" variant="outline" className="w-full">
        <p className="mr-2">Login with Github</p>
        {pending ? <LoadingSpinner /> : <FaGithub className="w-5 h-5" />}
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
        <CardTitle className="text-2xl">
          {state?.twoFactor ? "" : "Login"}
        </CardTitle>
        <CardDescription>
          {state?.twoFactor
            ? "Please introduce the 6 digit code we sent via email."
            : "Enter your email and password below to login to your account."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state?.twoFactor && (
          <form action={confirmAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Two Factor Code</Label>

              <InputOTP name="code" id="code" maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              {confirmState?.errors?.code && (
                <p className="text-red-600">{confirmState.errors.code}</p>
              )}

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

              <Input
                id="callbackUrl"
                name="callbackUrl"
                type="hidden"
                value={callbackUrl || DEFAULT_LOGIN_REDIRECT}
              />
            </div>
            <SubmitFactorButton />

            {confirmState?.error && (
              <p className="text-red-600">{confirmState?.error}</p>
            )}

            {urlError && <p className="text-red-600">{urlError}</p>}
          </form>
        )}
        {!state?.twoFactor && (
          <>
            <form action={action} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {state?.errors?.email && <p>{state.errors.email}</p>}
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
                <Input id="password" name="password" type="password" />

                {state?.errors?.password && (
                  <p className="text-red-600">{state.errors.password}</p>
                )}

                <Input
                  id="callbackUrl"
                  name="callbackUrl"
                  type="hidden"
                  value={callbackUrl || DEFAULT_LOGIN_REDIRECT}
                />
              </div>

              <SubmitButton />
              {state?.error && <p className="text-red-600">{state.error}</p>}
              {urlError && <p className="text-red-600">{urlError}</p>}
              {state?.success && (
                <p className="text-green-600">{state.success}</p>
              )}
            </form>
            <div className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <form action={googleLogin}>
                  <Input
                    type="hidden"
                    name="callbackUrl"
                    id="callbackUrl1"
                    value={callbackUrl || DEFAULT_LOGIN_REDIRECT}
                  />
                  <SubmitGoogleButton />
                </form>
              </div>
              <div className="grid gap-2">
                <form action={githubLogin}>
                  <Input
                    type="hidden"
                    name="callbackUrl"
                    id="callbackUrl2"
                    value={callbackUrl || DEFAULT_LOGIN_REDIRECT}
                  />
                  <SubmitGithubButton />
                </form>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="underline">
                Sign up
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

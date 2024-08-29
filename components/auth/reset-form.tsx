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
import { useFormState, useFormStatus } from "react-dom";
import LoadingSpinner from "../ui/loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reset } from "@/actions/reset";

export function ResetForm() {
  const [state, action] = useFormState(reset, undefined);

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" className="w-full">
        {pending ? <LoadingSpinner /> : "Send Reset Email"}
      </Button>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Dont fret! Just type in your email and we will send you a code to
            reset your password!
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {state?.errors?.email && (
                <p className="text-red-600">{state.errors.email}</p>
              )}
            </div>
            <SubmitButton />
            {state?.error && <p className="text-red-600">{state.error}</p>}

            {state?.success && (
              <p className="text-green-600">{state.success}</p>
            )}
          </form>

          <div className="mt-4 text-center text-sm">
            <Link href="/auth/login" className="underline">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { newVerification } from "@/actions/new-verification";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();

  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something Went Wrong!!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">New Verification Form</CardTitle>
          <CardDescription className="text-center">
            Confirming your verification!!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 text-center text-sm">
            {!success && !error ? <BeatLoader /> : ""}
            <div>{!success && <p>{error}</p>}</div>
          </div>

          <div className="mt-4 text-center text-sm">
            <Link href="/auth/login" className="underline">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

"use client";

import { newVerification } from "@/actions/new-verification";
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
    if(success || error) return
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
  }, [token , success , error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div>
      <h1 className="mb-2">New Verification Form</h1>
      <p className="mb-2">Confirming your verification!!</p>

      {/* <div className="flex w-full items-center justify-center p-8"> */}

      {!success && !error ? <BeatLoader /> : ""}

      <div>{!success && <p>{error}</p>}</div>
      {/* </div> */}
      <Link href="/auth/login">Back to login</Link>
    </div>
  );
};

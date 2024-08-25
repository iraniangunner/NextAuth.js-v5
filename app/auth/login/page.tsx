import { Login } from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <Suspense>
        <Login />
      </Suspense>
    </div>
  );
}

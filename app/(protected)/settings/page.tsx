"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFormState, useFormStatus } from "react-dom";
import LoadingSpinner from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { settings } from "@/actions/settings";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const [state, action] = useFormState(settings, undefined);

  const user = useCurrentUser();
  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" className="w-full">
        {pending ? <LoadingSpinner /> : "Save"}
      </Button>
    );
  }
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">o Settings</p>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Enter your new name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user?.name || undefined}
              required
            />
          </div>

          <SubmitButton />
          {state?.error || state?.success}
          {/* {confirmState?.error || urlError} */}
        </form>
      </CardContent>
    </Card>
  );
}

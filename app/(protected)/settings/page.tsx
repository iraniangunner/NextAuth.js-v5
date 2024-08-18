"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFormState, useFormStatus } from "react-dom";
import LoadingSpinner from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { settings } from "@/actions/settings";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormControl, FormMessage } from "@/components/ui/form";
import { UserRole } from "@prisma/client";
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="string"
              defaultValue={user?.name || undefined}
              // required
            />
          </div>
          {state?.errors?.name && <p>{state.errors.name}</p>}

          {user?.isOAuth === false && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={user?.email || undefined}
                  // required
                />
              </div>
              {state?.errors?.email && <p>{state.errors.email}</p>}

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  // defaultValue={undefined}
                  placeholder="123456"
                  // required
                />
              </div>

              {state?.errors?.password && (
                <div>
                  <p>Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  // defaultValue={undefined}
                  placeholder="123456"
                  // required
                />
              </div>
              {state?.errors?.newPassword && (
                <div>
                  <p>Password must:</p>
                  <ul>
                    {state.errors.newPassword.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select defaultValue={user?.role || undefined} name="role">
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                <SelectItem value={UserRole.USER}>User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {state?.errors?.role && <p>{state.errors.role}</p>}

          {user?.isOAuth === false && (
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="twoFactorEnabled"
                  name="twoFactorEnabled"
                  defaultChecked={user?.isTwoFactorEnabled}
                  // value={}
                  // defaultValue="false"
                />
                <Label htmlFor="twoFactorEnabled">Two factor Enabled</Label>
              </div>
            </div>
          )}

          <SubmitButton />
          {state?.error || state?.success}
        </form>
      </CardContent>
    </Card>
  );
}

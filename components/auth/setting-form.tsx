"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFormState, useFormStatus } from "react-dom";
import LoadingSpinner from "@/components/ui/loading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { settings } from "@/actions/settings";
import { UserRole } from "@prisma/client";
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const SettingForm = ({ user }: { user: any }) => {
  const [state, action] = useFormState(settings, undefined);

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button type="submit" className="w-full">
        {pending ? <LoadingSpinner /> : "Change"}
      </Button>
    );
  }
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
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
            />
          </div>

          {user?.isOAuth === false && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={user?.email || undefined}
                />
              </div>

              {state?.errors?.email && (
                <p className="text-red-600">{state.errors.email}</p>
              )}

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                />
              </div>

              {state?.errors?.password && (
                <div className="text-red-600">
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
                  placeholder="******"
                />
              </div>

              {state?.errors?.newPassword && (
                <div className="text-red-600">
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

          {user?.isOAuth === false && (
            <div className="grid gap-2">
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <p>Two Factor Authentication</p>
                  <p className="text-sm">
                    Enable two factor authention for your account
                  </p>
                </div>
                <Switch
                  id="twoFactorEnabled"
                  name="twoFactorEnabled"
                  defaultChecked={user?.isTwoFactorEnabled}
                />
              </div>
            </div>
          )}
          {state?.error && <p className="text-red-600">{state.error}</p>}
          {state?.success && <p className="text-green-600">{state.success}</p>}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
};

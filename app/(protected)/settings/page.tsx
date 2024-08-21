import { SettingForm } from "@/components/auth/setting-form";
import { currentUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await currentUser();
  return <SettingForm user={user} />;
}

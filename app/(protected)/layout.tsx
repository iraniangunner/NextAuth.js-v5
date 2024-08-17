import { SettingsNavbar } from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[100vh] w-full flex flex-col gap-y-10 items-center justify-center bg-sky-500">
      <SettingsNavbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;

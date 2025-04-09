import { RegisterForm } from "@/components/register-form";

export function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        <RegisterForm />
      </div>
    </div>
  );
}
import { TestConnection } from "../TestConnection";

export function TestConnectionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <TestConnection />
      </div>
    </div>
  );
}
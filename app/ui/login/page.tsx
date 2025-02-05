import PageLayout from "@/app/components/PageLayout";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <LoginForm />
        </div>
      </div>
    </PageLayout>
  );
}

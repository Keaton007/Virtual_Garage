import PageLayout from "@/app/components/PageLayout";
import RegisterForm from "./register-form";

export default function RegisterPage() {
    return (
        <PageLayout>
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                    <RegisterForm />
                </div>
            </div>
        </PageLayout>
    );
}
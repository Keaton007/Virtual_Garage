
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("/minimalist-garage-example.jpg")', 
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-[7px]"></div>
      <div className="flex items-center justify-center min-h-screen z-10 relative">
        <LoginForm />
      </div>
    </div>
  );
}

import { Mouse } from "@/constant";
import { Link } from "@/components/atoms";
import { LoginForm } from "@/components/organisms";

const LoginTemplate = () => {
  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <Link href="/login">
        <div className="text-foreground font-semibold text-2xl tracking-tight mx-auto flex items-center gap-2">
          <Mouse className="w-6 h-6" />
          <span>Task Nest</span>
        </div>
      </Link>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border border-white/20 shadow-sm rounded-lg lg:rounded-xl">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6">Login</h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;

import { useState } from "react";
import { Link } from "./Link";
import { FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      window.location.href = "/board";
    } catch {
      setError("Email ou senha incorretos");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-family-inter relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
          >
            <span className="text-xl font-semibold">
              Boardly
            </span>
          </Link>
          <Link
            to="/"
            className="text-zinc-400 hover:text-zinc-50 transition-colors duration-200"
          >
            Voltar ao início
          </Link>
        </div>
      </nav>

      {/* Login Container */}
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">
          <div className="bg-zinc-950/60 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Bem-vindo de volta
              </h1>
              <p className="text-zinc-400">
                Entre na sua conta para continuar
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="user@email.com"
                    className="w-full border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-lime-300/50 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <FiLock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-lime-300/50  transition-all duration-200"
                  />
                </div>
              </div>


              {error && (
                <div className="text-danger text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lime-300 hover:bg-lime-400 backdrop-blur-md text-zinc-950 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-800/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-center mt-8 text-zinc-400">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-lime-500 hover:text-lime-400 font-medium transition-colors duration-200">
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

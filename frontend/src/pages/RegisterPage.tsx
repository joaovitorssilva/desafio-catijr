import { useState } from "react";
import { Link } from "./Link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await register(name, email, password);
      window.location.href = "/board";
    } catch {
      setError("Falha ao registrar. Email possivelmente já está em uso");
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
            <span className="text-xl ml-6 font-semibold">
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

      {/* Register Container */}
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Criar conta
              </h1>
              <p className="text-zinc-400">
                Junte-se ao Boardly hoje mesmo
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                  Nome
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <FiUser className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Seu nome"
                    className="w-full border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-lime-300/50 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zic-300 mb-2">
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
                    className="w-full border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zin-50 placeholder-zinc-500 focus:outline-none focus:border-lime-300/50 transition-all duration-200"
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
                    minLength={6}
                    placeholder="••••••••"
                    className="w-full border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-lime-300/50 transition-all duration-200"
                  />
                </div>
              </div>

              {error && (
                <div className="text-danger text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lime-300 hover:bg-lime-400 backdrop-blur-md border border-lime-300 text-zinc-950 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer "
              >
                {isSubmitting ? "Criando conta..." : "Criar conta"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-8 text-zinc-400">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-lime-500 hover:text-lime-400 font-medium transition-colors duration-200">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

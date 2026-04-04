import { Link } from "./Link";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 scroll-smooth text-zinc-50 font-family-inter relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto  py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold hover:opacity-80 cursor-pointer">
              Boardly
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/board"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Ir para o App
            </Link>
            <Link
              to="/board"
              className="bg-lime-300 hover:bg-lime-400 backdrop-blur-md text-lime-950 px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-out "
            >
              Começar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Details */}
        {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-900/20 rounded-full blur-3xl"></div> */}

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2  border border-zinc-800 rounded-full px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5  bg-lime-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-lime-400">Gratuito para todos</span>
          </div>

          {/* Headline */}
          <h1 className="text-[3.4rem] sm:text-7xl font-bold leading-none text-balance  mb-6">
            Pare de se perder em
            <span className="whitespace-nowrap italic text-lime-300">
              <span className="font-family-merriweather"> tarefas </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Boardly ajuda você a organizar suas tarefas facilmente. Sem complexidade, sem curva de aprendizado.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/board"
              className="bg-lime-300 hover:bg-lime-400 backdrop-blur-md text-zinc-950 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ease-out"
            >
              Começar Gratuitamente
            </Link>
            <Link
              to="/board"
              className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-medium transition-all duration-200"
            >
              Veja como funciona →
            </Link>
          </div>

          {/* Social Proof */}
          <p className="mt-12 text-zinc-500 text-sm">
            Junte-se a <span className="text-zinc-50 font-semibold">2.000+</span> pessoas que recuperaram seu tempo
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center">
          <p className="text-sm text-zinc-500">
            © 2026 Boardly. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

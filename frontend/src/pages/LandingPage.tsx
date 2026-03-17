import { Link } from "./Link";
import { FiZap, FiStar, FiUsers, FiCreditCard, FiBriefcase, FiBook, FiPenTool } from "react-icons/fi";

const features = [
  {
    icon: <FiZap className="w-8 h-8" />,
    title: "Ultra Rápido",
    description: "Sem bagunça, sem lentidão. Você e suas tarefas, instantaneamente."
  },
  {
    icon: <FiStar className="w-8 h-8" />,
    title: "Extremamente Simples",
    description: "Uma interface escura que agrada os olhos. Foque no que importa."
  },
  {
    icon: <FiUsers className="w-8 h-8" />,
    title: "Funciona em Todos os Lugares",
    description: "Suas tarefas sincronizam em todos os dispositivos. Comece no celular, termine no computador."
  },
  {
    icon: <FiCreditCard className="w-8 h-8" />,
    title: "Grátis Para Sempre",
    description: "Sem cartão de crédito, taxas escondidas. Uma ferramenta poderosa que permanece gratuita."
  }
];

const useCases = [
  {
    icon: <FiBriefcase className="w-10 h-10" />,
    title: "O Profissional Ocupado",
    description: "Gerencie projetos, acompanhe prazos e nunca mais perca uma entrega."
  },
  {
    icon: <FiBook className="w-10 h-10" />,
    title: "O Estudante",
    description: "Acompanhe tarefas, provas e atividades extracurriculares em um só lugar."
  },
  {
    icon: <FiPenTool className="w-10 h-10" />,
    title: "O Criativo",
    description: "Organize ideias, acompanhe o progresso de projetos e leve sua visão à vida."
  }
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white font-family-poppins relative">
      {/* Global Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Blur Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-900/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-emerald-800/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-emerald-700/3 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 right-1/3 w-[350px] h-[350px] bg-emerald-900/4 rounded-full blur-[90px]"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]"></div>

        {/* Lines */}
        <div className="absolute top-[40%] left-0 w-32 h-px bg-linear-to-r from-emerald-800/0 via-emerald-700/20 to-emerald-800/0"></div>
        <div className="absolute top-[70%] right-0 w-40 h-px bg-linear-to-l from-emerald-800/0 via-emerald-700/15 to-emerald-800/0"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">

            <span className="text-xl ml-6 font-semibold">Boardly</span>
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
              className="bg-emerald-900/80 hover:bg-emerald-800/40 backdrop-blur-md text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
            >
              Começar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Details */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-900/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-800/10 border border-emerald-800/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span>
            <span className="text-sm text-emerald-600">Gratuito para todos</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Pare de se perder
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-emerald-400">
              em tarefas
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Boardly ajuda você a organizar suas tarefas facilmente. Sem complexidade, sem curva de aprendizado.
            Apenas um quadro limpo que funciona.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/board"
              className="bg-emerald-900/80 hover:bg-emerald-800/40 backdrop-blur-md  text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-800/25"
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
          <p className="mt-12 text-gray-500 text-sm">
            Junte-se a <span className="text-white font-semibold">2.000+</span> pessoas que recuperaram seu tempo
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#0D0D0F] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-800/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Tudo que você precisa
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
            Recursos poderosos envolvidos em uma interface simples e bonita.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-[#18181B]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-800/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-emerald-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-emerald-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-emerald-900/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Feito para todos
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
            Seja gerenciando uma equipe ou apenas sua vida, Boardly se adapta ao seu fluxo.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-[#18181B]/60 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-emerald-800/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center text-emerald-500">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{useCase.title}</h3>
                <p className="text-gray-400 leading-relaxed text-center">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-800/10 rounded-full blur-3xl"></div>

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="bg-linear-to-b from-[#18181B] to-[#0D0D0F] border border-white/5 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para se organizar?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Leva 30 segundos para começar. Sem necessidade de criar conta.
            </p>
            <Link
              to="/board"
              className="inline-block bg-emerald-900/80 hover:bg-emerald-800/40 backdrop-blur-md text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-800/25"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm ml-6 text-gray-500">Boardly</span>
          </div>

          <p className="text-sm  text-gray-600">
            © 2026 Boardly. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} AI Assistant Dashboard. Prueba Técnica Frontend.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="https://github.com/jmblack15/AI-Assistant-dashboard" className="hover:text-blue-600 cursor-pointer transition-colors">Documentación</Link>
            <Link href="https://www.linkedin.com/in/jose-manuel-osorio" className="hover:text-blue-600 cursor-pointer transition-colors">Sobre mí</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
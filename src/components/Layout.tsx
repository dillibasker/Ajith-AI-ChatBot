import React, { ReactNode } from 'react';
import { Film, Github, Instagram, Twitter } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="glass-panel sticky top-0 z-50 px-4 sm:px-6 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Film className="h-6 w-6 text-primary-400" />
            <h1 className="font-display text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Ajith AI
            </h1>
          </div>
          <nav>
            <ul className="flex items-center space-x-1 sm:space-x-4">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Films
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Gallery
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full container mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      <footer className="glass-panel mt-auto py-6 px-4 sm:px-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-400">
            © 2025 Ajith AI - An interactive fan experience
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Github size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
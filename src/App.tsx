import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Ticket } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="card bg-base-100 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-6 animate-fadeIn">
              <Ticket className="w-8 h-8 text-primary animate-pulse" />
              <div>
                <h1 className="text-3xl font-bold">Registro para Sorteo</h1>
                <p className="text-base-content/70">
                  Complete el formulario para participar en nuestro increíble sorteo
                </p>
              </div>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
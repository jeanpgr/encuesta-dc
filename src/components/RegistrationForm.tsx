import React, { useState } from 'react';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import TermsModal from './TermsModal';

interface FormData {
  nombreCompleto: string;
  email: string;
  telefono: string;
  direccion: string;
}

interface FormErrors {
  [key: string]: string;
}

interface RegistrationResponse {
  codigo: string;
  mensaje: string;
}

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registrationCode, setRegistrationCode] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    nombreCompleto: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = 'Se requiere nombres y apellidos';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Se requiere correo electrónico';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Se requiere teléfono';
    }
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'Se requiere dirección';
    }
    if (!acceptedTerms) {
      newErrors.terms = 'Debe aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://tu-api-endpoint.com/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: RegistrationResponse = await response.json();

      if (response.ok) {
        setSuccess(true);
        setRegistrationCode(data.codigo);
        toast.success('¡Registro exitoso!');
      } else {
        throw new Error(data.mensaje || 'Error en el registro');
      }
    } catch (error) {
      toast.error('Hubo un error al procesar tu registro. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4 animate-fadeIn">
          <CheckCircle className="w-16 h-16 text-success mx-auto animate-bounce" />
          <h2 className="text-2xl font-bold text-success">¡Felicitaciones!</h2>
          <p className="text-lg">Tu registro ha sido exitoso</p>
          <div className="bg-base-200 p-4 rounded-lg">
            <p className="text-sm text-base-content/70">Tu código de participación es:</p>
            <p className="text-xl font-mono font-bold">{registrationCode}</p>
          </div>
          <p className="text-sm text-base-content/70">
            Guarda este código para futuras referencias
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-3xl mx-auto p-6 animate-slideIn">
        <div className="bg-info/10 rounded-lg p-4 mb-6">
          <p className="text-info-content text-sm">
            <AlertCircle className="inline-block w-4 h-4 mr-2" />
            Este formulario es exclusivo para personas mayores de edad que deseen participar en nuestro sorteo.
          </p>
        </div>

        <div className="space-y-2">
          <label className="label" htmlFor="nombreCompleto">
            <span className="label-text">Nombres y Apellidos</span>
          </label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            className={`input input-bordered w-full transition-all duration-200 ${errors.nombreCompleto ? 'input-error' : ''}`}
            value={formData.nombreCompleto}
            onChange={handleChange}
            placeholder="Ingrese sus nombres y apellidos completos"
          />
          {errors.nombreCompleto && (
            <span className="text-error text-sm">{errors.nombreCompleto}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="label" htmlFor="email">
            <span className="label-text">Correo electrónico</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`input input-bordered w-full transition-all duration-200 ${errors.email ? 'input-error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
          />
          {errors.email && (
            <span className="text-error text-sm">{errors.email}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="label" htmlFor="telefono">
            <span className="label-text">Teléfono</span>
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            className={`input input-bordered w-full transition-all duration-200 ${errors.telefono ? 'input-error' : ''}`}
            value={formData.telefono}
            onChange={handleChange}
            placeholder="+51 999 999 999"
          />
          {errors.telefono && (
            <span className="text-error text-sm">{errors.telefono}</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="label" htmlFor="direccion">
            <span className="label-text">Dirección</span>
          </label>
          <textarea
            id="direccion"
            name="direccion"
            className={`textarea textarea-bordered w-full h-24 transition-all duration-200 ${errors.direccion ? 'textarea-error' : ''}`}
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Ingrese su dirección completa"
          />
          {errors.direccion && (
            <span className="text-error text-sm">{errors.direccion}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => {
                setAcceptedTerms(e.target.checked);
                if (errors.terms) {
                  setErrors(prev => ({
                    ...prev,
                    terms: ''
                  }));
                }
              }}
              className="checkbox checkbox-primary"
            />
            <span className="label-text">
              Acepto los {' '}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => (document.getElementById('terms-modal') as HTMLDialogElement)?.showModal()}
              >
                términos y condiciones
              </button>
            </span>
          </label>
          {errors.terms && (
            <span className="text-error text-sm mt-1">{errors.terms}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full hover:scale-105 transition-transform duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Procesando...
            </>
          ) : (
            'Participar en el sorteo'
          )}
        </button>
      </form>
      
      <TermsModal modalId="terms-modal" />
    </>
  );
}
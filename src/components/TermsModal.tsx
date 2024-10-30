import React from 'react';

interface TermsModalProps {
  modalId: string;
}

export default function TermsModal({ modalId }: TermsModalProps) {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box prose max-w-3xl">
        <h3 className="font-bold text-lg">Términos y Condiciones del Sorteo</h3>
        <div className="py-4">
          <p>Al participar en este sorteo, usted acepta las siguientes condiciones:</p>
          <ul>
            <li>Debe ser mayor de edad (18 años o más) para participar.</li>
            <li>Los datos proporcionados serán utilizados exclusivamente para los fines del sorteo.</li>
            <li>Autoriza el uso de sus datos personales para:</li>
            <ul>
              <li>Contacto en caso de resultar ganador</li>
              <li>Verificación de identidad</li>
              <li>Entrega de premios</li>
            </ul>
            <li>Sus datos serán tratados con confidencialidad y no serán compartidos con terceros.</li>
            <li>El ganador será contactado a través de los datos proporcionados.</li>
          </ul>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cerrar</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
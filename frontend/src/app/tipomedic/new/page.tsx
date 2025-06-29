'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CrearTipoMedic() {
  const router = useRouter();
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:3001/api/tipomedic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descripcion })
      });

      router.push('/tipomedic');
    } catch (error) {
      console.error('Error al crear tipo de medicamento:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-semibold">Nuevo Tipo de Medicamento</h2>
      <input
        className="border p-2 w-full"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}

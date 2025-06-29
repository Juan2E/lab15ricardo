'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditarTipoMedic({ params }) {
  const router = useRouter();
  const [descripcion, setDescripcion] = useState('');

  const fetchTipo = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/tipomedic/${params.id}`);
      const data = await res.json();
      setDescripcion(data.descripcion);
    } catch (error) {
      console.error('Error al cargar tipo:', error);
    }
  };

  useEffect(() => {
    fetchTipo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3001/api/tipomedic/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion })
      });

      router.push('/tipomedic');
    } catch (error) {
      console.error('Error al editar tipo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-semibold">Editar Tipo de Medicamento</h2>
      <input
        className="border p-2 w-full"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Guardar cambios
      </button>
    </form>
  );
}

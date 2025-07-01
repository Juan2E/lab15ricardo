'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditarAutor({ params }) {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');

  const fetchAutor = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/autores/${params.id}`);
      const data = await res.json();
      setNombre(data.Nombre);
      setNacionalidad(data.Nacionalidad);
    } catch (error) {
      console.error('Error al cargar autor:', error);
    }
  };

  useEffect(() => {
    fetchAutor();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3001/api/autores/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Nombre: nombre, Nacionalidad: nacionalidad })
      });

      router.push('/autor');
    } catch (error) {
      console.error('Error al editar autor:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-semibold">Editar Autor</h2>
      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Nacionalidad"
        value={nacionalidad}
        onChange={(e) => setNacionalidad(e.target.value)}
      />
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Guardar cambios
      </button>
    </form>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditarLibro({ params }) {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [añoPublicacion, setAñoPublicacion] = useState('');
  const [autorID, setAutorID] = useState('');
  const [autores, setAutores] = useState([]);

  const fetchLibro = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/libros/${params.id}`);
      const data = await res.json();
      setTitulo(data.Titulo);
      setAñoPublicacion(data.AñoPublicacion);
      setAutorID(data.AutorID);
    } catch (error) {
      console.error('Error al cargar libro:', error);
    }
  };

  const fetchAutores = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/autores');
      const data = await res.json();
      setAutores(data);
    } catch (error) {
      console.error('Error al cargar autores:', error);
    }
  };

  useEffect(() => {
    fetchLibro();
    fetchAutores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3001/api/libros/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Titulo: titulo,
          AñoPublicacion: parseInt(añoPublicacion),
          AutorID: parseInt(autorID)
        })
      });

      router.push('/libro');
    } catch (error) {
      console.error('Error al editar libro:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-semibold">Editar Libro</h2>
      <input
        className="border p-2 w-full"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Año de publicación"
        value={añoPublicacion}
        onChange={(e) => setAñoPublicacion(e.target.value)}
      />
      <select
        className="border p-2 w-full"
        value={autorID}
        onChange={(e) => setAutorID(e.target.value)}
      >
        <option value="">Seleccione un autor</option>
        {autores.map((autor) => (
          <option key={autor.AutorID} value={autor.AutorID}>
            {autor.Nombre}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
        Guardar cambios
      </button>
    </form>
  );
}

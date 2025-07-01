'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CrearLibro() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [añoPublicacion, setAñoPublicacion] = useState('');
  const [autorID, setAutorID] = useState('');
  const [autores, setAutores] = useState([]);

  // Función para obtener autores
  const fetchAutores = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/autores');
      if (!res.ok) {
        console.error('Error en la respuesta:', res.status);
        return;
      }
      const data = await res.json();
      setAutores(data);
    } catch (error) {
      console.error('Error al obtener autores:', error);
    }
  };

  // Función para eliminar un autor (aunque aquí no se usa, la agrego por si la necesitas)
  const eliminarAutor = async (AutorID) => {
    if (!confirm('¿Estás seguro de eliminar este autor?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/autores/${AutorID}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        alert('Autor eliminado');
        fetchAutores();
      } else {
        const data = await res.json();
        alert(`Error al eliminar: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al eliminar autor:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:3001/api/libros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Titulo: titulo,
          AñoPublicacion: parseInt(añoPublicacion),
          AutorID: parseInt(autorID),
        }),
      });

      router.push('/libro');
    } catch (error) {
      console.error('Error al crear libro:', error);
    }
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-semibold">Nuevo Libro</h2>
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}

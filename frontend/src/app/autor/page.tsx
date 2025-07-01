'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AutorPage() {
  const [autores, setAutores] = useState([]);
  const router = useRouter();

  const fetchAutores = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/autores'); // plural
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

  const eliminarAutor = async (AutorID) => {
    if (!confirm('¿Estás seguro de eliminar este autor?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/autores/${AutorID}`, { // plural
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

  useEffect(() => {
    fetchAutores();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Autores</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/autores/new')} // plural
      >
        + Agregar Autor
      </button>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Nacionalidad</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autores.map((autor) => (
            <tr key={autor.AutorID} className="text-center">
              <td className="p-2 border">{autor.AutorID}</td>
              <td className="p-2 border">{autor.Nombre}</td>
              <td className="p-2 border">{autor.Nacionalidad}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => router.push(`/autores/${autor.AutorID}/edit`)} // plural
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarAutor(autor.AutorID)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {autores.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No hay autores registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

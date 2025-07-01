'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LibroPage() {
  const [libros, setLibros] = useState([]);
  const router = useRouter();

  const fetchLibros = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/libros'); // plural
      if (!res.ok) {
        console.error('Error en la respuesta:', res.status);
        return;
      }
      const data = await res.json();
      setLibros(data);
    } catch (error) {
      console.error('Error al obtener libros:', error);
    }
  };

  const eliminarLibro = async (LibroID) => {
    if (!confirm('¿Estás seguro de eliminar este libro?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/libros/${LibroID}`, { // plural
        method: 'DELETE',
      });

      if (res.status === 204) {
        alert('Libro eliminado');
        fetchLibros();
      } else {
        const data = await res.json();
        alert(`Error al eliminar: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al eliminar libro:', error);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Libros</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/libro/new')} // plural para crear
      >
        + Agregar Libro
      </button>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Título</th>
            <th className="p-2 border">Año</th>
            <th className="p-2 border">Autor</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.LibroID} className="text-center">
              <td className="p-2 border">{libro.LibroID}</td>
              <td className="p-2 border">{libro.Titulo}</td>
              <td className="p-2 border">{libro.AñoPublicacion}</td>
              <td className="p-2 border">{libro.Autor?.Nombre || 'Sin autor'}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => router.push(`/libros/${libro.LibroID}/edit`)}
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarLibro(libro.LibroID)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {libros.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No hay libros registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

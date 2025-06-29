'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MedicamentoPage() {
  const [medicamentos, setMedicamentos] = useState([]);
  const router = useRouter();

  const fetchMedicamentos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/medicamento');
      const data = await res.json();
      setMedicamentos(data);
    } catch (error) {
      console.error('Error al obtener medicamentos:', error);
    }
  };

  const eliminarMedicamento = async (CodMedicamento) => {
    const confirmar = confirm('¿Estás seguro de eliminar este medicamento?');
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3001/api/medicamento/${CodMedicamento}`, {
        method: 'DELETE',
      });

      if (res.status === 204) {
        alert('Medicamento eliminado');
        fetchMedicamentos();
      } else {
        const data = await res.json();
        alert(`Error al eliminar: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al eliminar medicamento:', error);
    }
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Medicamentos</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/medicamento/new')}
      >
        + Agregar Medicamento
      </button>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Código</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">F. Fab</th>
            <th className="p-2 border">F. Venc</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => (
            <tr key={med.CodMedicamento} className="text-center">
              <td className="p-2 border">{med.CodMedicamento}</td>
              <td className="p-2 border">{med.descripcionMed}</td>
              <td className="p-2 border">{med.fechaFabricacion}</td>
              <td className="p-2 border">{med.fechaVencimiento}</td>
              <td className="p-2 border">{med.stock}</td>
              <td className="p-2 border">S/ {med.precioVentaUni}</td>
              <td className="p-2 border">{med.TipoMedic?.descripcion || 'Sin tipo'}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => router.push(`/medicamento/${med.CodMedicamento}/edit`)}
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarMedicamento(med.CodMedicamento)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {medicamentos.length === 0 && (
            <tr>
              <td colSpan="8" className="p-4 text-center">
                No hay medicamentos registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CrearMedicamento() {
  const router = useRouter();
  const [tipos, setTipos] = useState([]);

  const [form, setForm] = useState({
    descripcionMed: '',
    fechaFabricacion: '',
    fechaVencimiento: '',
    stock: '',
    precioVentaUni: '',
    CodTipoMed: ''
  });

  const fetchTipos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/tipomedic');
      const data = await res.json();
      setTipos(data);
    } catch (error) {
      console.error('Error al cargar tipos:', error);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:3001/api/medicamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descripcionMed: form.descripcionMed,
          fechaFabricacion: form.fechaFabricacion,
          fechaVencimiento: form.fechaVencimiento,
          stock: parseInt(form.stock),
          precioVentaUni: parseFloat(form.precioVentaUni),
          CodTipoMed: parseInt(form.CodTipoMed)
        })
      });

      router.push('/medicamento');
    } catch (error) {
      console.error('Error al crear medicamento:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-4">
      <h2 className="text-xl font-semibold">Nuevo Medicamento</h2>

      <input
        className="border p-2 w-full"
        placeholder="Descripción"
        value={form.descripcionMed}
        onChange={(e) => setForm({ ...form, descripcionMed: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="date"
        value={form.fechaFabricacion}
        onChange={(e) => setForm({ ...form, fechaFabricacion: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="date"
        value={form.fechaVencimiento}
        onChange={(e) => setForm({ ...form, fechaVencimiento: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        type="number"
        step="0.01"
        placeholder="Precio Unitario"
        value={form.precioVentaUni}
        onChange={(e) => setForm({ ...form, precioVentaUni: e.target.value })}
      />
      <select
        className="border p-2 w-full"
        value={form.CodTipoMed}
        onChange={(e) => setForm({ ...form, CodTipoMed: e.target.value })}
      >
        <option value="">Seleccione tipo</option>
        {tipos.map((tipo) => (
          <option key={tipo.CodTipoMed} value={tipo.CodTipoMed}>
            {tipo.descripcion}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}

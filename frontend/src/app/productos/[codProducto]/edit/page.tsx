'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // ✅ para rutas dinámicas en App Router
import { updateProducto } from "@/lib/api";

export default function EditProductoPage() {
  const { codProducto } = useParams(); // ⬅️ obtiene el parámetro dinámico
  const router = useRouter();

  const [form, setForm] = useState({
    nomPro: '',
    precioProducto: '',
    stockProducto: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!codProducto) {
      alert("Código de producto no encontrado.");
      return;
    }

    await updateProducto(codProducto, {
      nomPro: form.nomPro,
      precioProducto: parseFloat(form.precioProducto),
      stockProducto: parseInt(form.stockProducto)
    });

    router.push('/productos');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        value={form.nomPro}
        onChange={e => setForm({ ...form, nomPro: e.target.value })}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Precio"
        type="number"
        step="0.01"
        value={form.precioProducto}
        onChange={e => setForm({ ...form, precioProducto: e.target.value })}
        required
      />
      <input
        className="border p-2 w-full"
        placeholder="Stock"
        type="number"
        value={form.stockProducto}
        onChange={e => setForm({ ...form, stockProducto: e.target.value })}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Guardar Cambios
      </button>
    </form>
  );
}

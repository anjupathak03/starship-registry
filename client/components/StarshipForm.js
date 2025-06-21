'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Starship } from '../lib/api';
import clsx from 'clsx';

export default function StarshipForm({ initial = {}, isEdit = false }) {
  const [form, setForm] = useState({
    registryNumber: '',
    name: '',
    class: '',
    commissioned: '',
    status: 'ACTIVE',
    ...initial
  });
  const [error, setError] = useState('');
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isEdit) {
        await Starship.update(initial.registryNumber, form);
      } else {
        await Starship.create(form);
      }
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {error && <p className="text-red-400">{error}</p>}
      {[
        { label: 'Registry Number', name: 'registryNumber', disabled: isEdit },
        { label: 'Name', name: 'name' },
        { label: 'Class', name: 'class' },
        { label: 'Commissioned (YYYY-MM-DD)', name: 'commissioned', type: 'date' }
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-sm mb-1">{f.label}</label>
          <input
            type={f.type || 'text'}
            name={f.name}
            value={form[f.name] ?? ''}
            onChange={handleChange}
            disabled={f.disabled}
            className={clsx(
              'w-full rounded bg-slate-900 p-2',
              f.disabled && 'opacity-60 cursor-not-allowed'
            )}
            required
          />
        </div>
      ))}

      <div>
        <label className="block text-sm mb-1">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full rounded bg-slate-900 p-2"
        >
          {['ACTIVE', 'MUSEUM', 'DESTROYED'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <button
        className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500"
        type="submit"
      >
        {isEdit ? 'Save Changes' : 'Register Starship'}
      </button>
    </form>
  );
}
    
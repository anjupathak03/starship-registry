"use client"

import Link from 'next/link';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Starship } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function StarshipCard({ ship }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`De-commission ${ship.name}?`)) return;
    await Starship.remove(ship.registryNumber);
    router.refresh(); // revalidate cache
  }

  return (
    <div className="rounded-lg bg-slate-800 p-4 flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold">{ship.name}</h2>
        <p className="text-slate-400">{ship.registryNumber} · {ship.class}</p>
        <p className="mt-1 text-sm">
          Commissioned&nbsp;
          {new Date(ship.commissioned).toLocaleDateString()} &mdash;
          <span className="font-medium">{ship.status}</span>
        </p>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/starships/${ship.registryNumber}/edit`}
          className="p-1 hover:bg-slate-700 rounded"
        >
          <PencilIcon className="h-5 w-5" />
        </Link>
        <button onClick={handleDelete} className="p-1 hover:bg-red-600/20 rounded">
          <TrashIcon className="h-5 w-5 text-red-400" />
        </button>
      </div>
    </div>
  );
}

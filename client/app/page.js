import StarshipCard from '../components/StarshipCard';
import { api } from '../lib/api';

export const dynamic = 'force-dynamic'; // always SSR so we see latest data

export default async function Home() {
  const ships = await api('/starships');   // server-side fetch

  return (
    <div className="space-y-4">
      {ships.length === 0 && <p>No starships yet. Add one!</p>}
      {ships.map((s) => <StarshipCard key={s.registryNumber} ship={s} />)}
    </div>
  );
}

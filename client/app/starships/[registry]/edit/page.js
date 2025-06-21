import StarshipForm from '../../../../components/StarshipForm';
import { api } from '../../../../lib/api';

export default async function EditStarshipPage({ params }) {
  const ship = await api(`/starships/${params.registry}`);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit {ship.name}</h1>
      <StarshipForm initial={ship} isEdit />
    </>
  );
}

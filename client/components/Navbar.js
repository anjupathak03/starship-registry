import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-black/20 backdrop-blur sticky top-0 z-10">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <Link href="/" className="font-bold text-xl tracking-wide">
          🖖 Starfleet Registry
        </Link>
        <Link
          href="/starships/new"
          className="rounded bg-blue-600 px-3 py-1 text-sm hover:bg-blue-500"
        >
          + New Starship
        </Link>
      </nav>
    </header>
  );
}

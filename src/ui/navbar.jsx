import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      {' '}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-stone-200 bg-slate-800 bg-opacity-60 px-4 py-3 text-white shadow-md sm:p-3">
        <div className="flex justify-between">
          <Link
            to="/"
            className="font-luxurious m-auto px-5 text-xl font-semibold uppercase tracking-widest text-zinc-200"
          >
            Movie <span className="text-amber-200">Cards</span>
          </Link>
        </div>
      </header>
    </>
  );
}

export default Navbar;

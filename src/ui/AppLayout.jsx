import { Outlet } from 'react-router-dom';
import Navbar from './navbar';

function AppLayout() {
  return (
    <div className="h-full bg-teal-950 xl:h-full">
      <Navbar />
      <div className="relative">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

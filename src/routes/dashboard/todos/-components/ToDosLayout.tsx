import { Link, Outlet } from "@tanstack/react-router";

interface ToDosLayoutProps {}

export function ToDosLayout({}: ToDosLayoutProps) {

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <nav className="w-full border-b border-primary flex items-center gap-2">
        <Link to="/dashboard/todos">
          <h1 className="btn btn-sm btn-link">Todos</h1>
        </Link>
        <Link to="/dashboard/todos/tracking">
          <h1 className="btn btn-sm btn-link">Trackong</h1>
        </Link>
        <Link to="/dashboard/todos/tracking/load">
          <h1 className="btn btn-sm btn-link">Load Trackong</h1>
        </Link>
      </nav>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </div>
  );
}

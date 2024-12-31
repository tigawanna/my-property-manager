import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { Link, Outlet } from "@tanstack/react-router";

interface ToDosLayoutProps {}

export function ToDosLayout({}: ToDosLayoutProps) {
  const { role } = useViewer();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      {role === "staff" && (
        <nav className="flex w-full items-center gap-2 border-b border-primary">
          <Link to="/dashboard/todos">
            <h1 className="btn btn-link btn-sm">Todos</h1>
          </Link>
          <Link to="/dashboard/todos/tracking">
            <h1 className="btn btn-link btn-sm">Trackong</h1>
          </Link>
          <Link to="/dashboard/todos/tracking/load">
            <h1 className="btn btn-link btn-sm">Load Trackong</h1>
          </Link>
        </nav>
      )}
      <div className="h-full w-full">
        <Outlet />
      </div>
    </div>
  );
}

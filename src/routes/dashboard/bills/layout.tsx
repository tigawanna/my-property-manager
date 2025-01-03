import { createFileRoute, Outlet,Link } from '@tanstack/react-router'

export const Route = createFileRoute("/dashboard/bills")({
  component: BillsLayout,
});

function BillsLayout(){
return (
  <div className="flex h-full w-full flex-col">
    <div className="flex h-full w-full justify-evenly gap-2">
      <Link to="/dashboard/bills" className="btn btn-link">
        monthly bills
      </Link>
      <Link to="/dashboard/bills/shopsbills" className="btn btn-link">
        shops bills
      </Link>
    </div>
    <Outlet />
  </div>
);
}

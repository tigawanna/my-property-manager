import { ShopsContainer } from "./list/ShopsContainer";

interface ShopsPageProps {}

export function ShopsPage({}: ShopsPageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <ShopsContainer/>
    </div>
  );
}

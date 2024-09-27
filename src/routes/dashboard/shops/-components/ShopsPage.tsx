import { ShopsContainer } from "./list/ShopsContainer";

interface ShopsPageProps {}

export function ShopsPage({}: ShopsPageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col ijustify-center">
      <ShopsContainer/>
    </div>
  );
}

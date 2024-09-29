import { ShopsContainer } from "./list/ShopsContainer";

interface ShopsPageProps {}

export function ShopsPage({}: ShopsPageProps) {
  return (
    <div className="ijustify-center flex h-full min-h-screen w-full flex-col">
      <ShopsContainer />
    </div>
  );
}

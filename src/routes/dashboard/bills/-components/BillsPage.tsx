import { BillsContainer } from "./list/BillsContainer";

interface BillsPageProps {}

export function BillsPage({}: BillsPageProps) {
  return (
    <div className="ooverflow-x- flex h-screen w-full flex-col items-center">
      <BillsContainer />
    </div>
  );
}

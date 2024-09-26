import { BillsContainer } from "./list/BillsContainer";

interface BillsPageProps {}

export function BillsPage({}: BillsPageProps) {
  return (
    <div className="w-full h-screen ooverflow-x-  flex flex-col items-center ">
      <BillsContainer />
    </div>
  );
}

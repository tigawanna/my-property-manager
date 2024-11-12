// const pagename = name.split("/").pop();
// const capitalized = pagename.charAt(0).toUpperCase() + pagename.slice(1);
export function rootPageTemplate(pagename:string,path:string) {
// const pagename = name.split("/").pop();
// const capitalized = page.charAt(0).toUpperCase() + page.slice(1);
const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ${capitalpagename}Page } from "./-components/${capitalpagename}Page";

const searchparams = z.object({
  sq: z.string().optional(),
});

export const Route = createFileRoute("/${path}/")({
  validateSearch: (search) => searchparams.parse(search),
  component:${capitalpagename}Page
});

`;
}

export function rootPageComponentTemplate(pagename: string, path: string) {
const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
return `
import { SearchBox } from "@/components/search/SearchBox";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Suspense } from "react";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { Create${capitalpagename}Form } from "./form/create";
import { ${capitalpagename}List } from "./list/${capitalpagename}List";

interface ${capitalpagename}PageProps {
}

export function ${capitalpagename}Page({}: ${capitalpagename}PageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/${path}");
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ListPageHeader
        title="${capitalpagename}"
        formTrigger={<Create${capitalpagename}Form />}
        searchBox={
          <SearchBox
            inputProps={{
              placeholder: "Search by name",
            }}
            debouncedValue={debouncedValue}
            isDebouncing={isDebouncing}
            setKeyword={setKeyword}
            keyword={keyword}
          />
        }
      />

      <div className="m-3 flex h-full w-full items-center justify-center p-5">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <${capitalpagename}List keyword={keyword} />
        </Suspense>
      </div>
    </div>
  );
}
`;
}


export function rootPageListComponentsTemplate(pagename: string, path: string) {
const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
return `

`
}

export function rootPageTemplate(name: string) {
    const pagename = name.split("/").pop()
    return `
    import { createFileRoute } from "@tanstack/react-router";
    import { ${pagename}Page } from "./-components/${pagename}Page";
    import { z } from "zod";

    const searchparams = z.object({
        sq: z.string().optional(),
    });

    export const Route = createFileRoute("${name}")({
        validateSearch: (search) => searchparams.parse(search),
        component: ${pagename}Page,
    });
`;
}

export function rootPageComponentTemplate(name: string) {
    const pagename = name.split("/").pop()
    return `
    import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback";
    import { useSearch } from "@tanstack/react-router";
    import { ${pagename}List } from "./list/${pagename}List";

    export function ${pagename}Page() {
return
    (
<div className="flex h-full w-full flex-col items-center justify-center">
            
    
      <div className="m-3 flex h-full w-full items-center justify-center p-5">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <${pagename}List  keyword={debouncedValue} />
        </Suspense>
      </div>
    </div>
        );
    }
`;
}

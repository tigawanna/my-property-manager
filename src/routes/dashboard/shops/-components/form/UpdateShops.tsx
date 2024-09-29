import { pb, type CollectionName } from "@/lib/pb/client";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Edit } from "lucide-react";
import { startTransition, useState } from "react";
import { PropertyFloorPrefixes } from "./floors";
import { ShopNumberInput } from "./ShopNumberInput";
import {
  PropertyShopsCreate,
  PropertyShopsUpdate,
  PropertyTenantsListResponse,
} from "@/lib/pb/database";
import { PBPickRelationField } from "@/lib/pb/components/PBrelationPicker";
import { useFormHook } from "@/components/form/useForm";
import { PbTheTextInput } from "@/lib/pb/components/PBTheTextInput";
import { makeHotToast } from "@/components/toasters";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { PBCheckbox } from "./PBCheckbox";

type PropertyTenantsExpand = Pick<PropertyTenantsListResponse, "id" | "name">;
interface UpdateShopProps {
  shop: PropertyShopsUpdate & { id: string }; 
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateShop({ shop,setOpen }: UpdateShopProps) {
  const collectionName: CollectionName = "property_shops";
  const [tenant, setTenants] = useState<
    PropertyTenantsExpand[] | undefined
  >([]);
const shopFloor =
  (shop?.shop_number?.split("-")[0] as PropertyFloorPrefixes) ?? "G"; 
  const { input, handleChange, setInput } = useFormHook<PropertyShopsCreate &{floor:PropertyFloorPrefixes}>({
    initialValues: {
      shop_number: shop?.shop_number ?? "",
      is_vacant: shop.is_vacant,
      floor: shopFloor,
      order: shop.order,
      tenant: shop?.tenant ?? "",
      utils: shop.utils,
    },
  });
  const mutation = useMutation({
    mutationFn: (data: PropertyShopsUpdate) => {
      return pb.from(collectionName).update(shop.id,data);
    },
    meta: { invalidates: [collectionName] },
    onSuccess: (data) => {
      makeHotToast({
        title: "New Shop updated",
        description: `Shop Number: ${data.shop_number}`,
        variant: "success",
        duration: 2000,
      });

      setOpen(false);
    },
    onError: (error: any) => {
      makeHotToast({
        title: "Something went wrong",
        description: `${error.message}`,
        variant: "error",
        duration: 20000,
      });
    },
  });
  const pb_error = mutation?.error;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("input", input);
    mutation.mutate(input);
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <form className="flex size-full flex-col gap-5" onSubmit={handleSubmit}>
        {/* <ShopNumberInput input={input} setInput={setInput} /> */}
        <PbTheTextInput<typeof input>
          field_key={"shop_number"}
          field_name={"Shop Number"}
          onChange={handleChange}
          val={input.shop_number}
          pb_error={pb_error}
        />
        <PBPickRelationField<PropertyTenantsExpand>
          dialogTrigger={
            <span className="btn btn-outline btn-sm">Pick a category</span>
          }
          selectedRows={tenant}
          maxSelected={1}
          setSelectedRows={(itm) => {
            if (Array.isArray(itm)) {
              setTenants(itm as any);
              setInput((prev) => ({ ...prev, tenant: itm.at(-1)?.id ?? "" }));
            }
          }}
          collectionName="property_tenants_list"
          columns={{
            name: {
              name: "tenant",
            },
          }}
          fieldLabel="Tenant"
          searchParamKey="ths"
          filterBy="name"
        />
        <PBCheckbox
          fieldKey={"is_vacant"}
          fieldLabel={"Is vacant?"}
          input={input}
          setInput={setInput}
        />
        <div className="flex w-full flex-col items-center justify-center">
          <Select
          value={input?.utils as PropertyFloorPrefixes}
            onValueChange={(v: PropertyFloorPrefixes) =>
              startTransition(() =>
                setInput((prev) => ({
                  ...prev,
                  utils: v as (typeof input)["utils"],
                })),
              )
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="What utility?" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Utils</SelectLabel>
                <SelectItem value={"both"}>both</SelectItem>
                <SelectItem value={"none"}>none</SelectItem>
                <SelectItem value={"elec"}>elec</SelectItem>
                <SelectItem value={"water"}>water</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full items-center justify-center">
          <MutationButton mutation={mutation} />
        </div>
      </form>
    </div>
  );
}

interface UpdateShopModalProps {
  shop: PropertyShopsUpdate & { id: string };
  trigger?: React.ReactNode;
}
export function UpdateShopModal({shop,trigger}: UpdateShopModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="flex size-full items-center justify-center"
      >
    {trigger?? <Edit className="size-5" />}
      </DialogTrigger>
      <DialogContent className="min-h-[30%]overflow-auto w-fit min-w-[80%] sm:max-w-[80%] md:min-w-[60%] lg:min-w-[40%]">
        <DialogHeader>
          <DialogTitle>Update Shop</DialogTitle>
          <DialogDescription>Update Shop  </DialogDescription>
        </DialogHeader>

        <div className="h-full w-full">
          <UpdateShop setOpen={setOpen} shop={shop} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

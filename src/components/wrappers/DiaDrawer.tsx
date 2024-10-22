import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Button } from "../shadcn/ui/button";
import { X } from "lucide-react";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { useState } from "react";
interface DiaDrawerProps {
  title: string;
  description: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DiaDrawer({
  children,
  description,
  title,
  trigger,
  open,
  setOpen,
}: DiaDrawerProps) {
  const matches = useMediaQuery("(min-width: 640px)");

  if (matches) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger ?? <Button variant="outline">Open </Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger ?? <Button variant="outline">Open </Button>}
      </DrawerTrigger>
      <DrawerContent className="flex min-h-fit flex-col items-center justify-center">
        <div className="flex h-full w-full max-w-[90%] flex-col items-center justify-center md:max-w-[60%]">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter>
            <DrawerClose asChild>
              <X className="absolute right-[2%] top-[2%] size-7" />
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

import { X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TeamList } from "./TeamList";
import { AddressBar } from "../../ui/AddressBar";
import { OpenStatus } from "../../ui/OpenStatus";

export function TeamSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        overlayClassName="ns-overlay bg-black/25"
        className="ns-root ns-sheet w-full gap-0 border-neutral-200 bg-white p-0 text-[#0A0A0A] shadow-none sm:max-w-[520px]"
      >
        <SheetHeader className="flex h-[49px] shrink-0 flex-row items-center justify-between gap-4 space-y-0 border-b border-neutral-200 px-6">
          <SheetTitle className="text-[15px] font-normal">Handlowcy i zespół</SheetTitle>
          <SheetDescription className="sr-only">
            Zadzwoń albo napisz bezpośrednio do osoby, która zajmie się Twoim zamówieniem
          </SheetDescription>
          <SheetClose
            aria-label="Zamknij"
            className="-mr-1.5 grid size-8 place-items-center rounded-xs bg-neutral-100 outline-none transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-[#EA6100]"
          >
            <X className="size-5" strokeWidth={1.5} />
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-col gap-2 px-6 pb-2 pt-4">
          <AddressBar />
          <OpenStatus />
        </div>

        <TeamList className="min-h-0 flex-1 overflow-y-auto px-6 pb-10 pt-3 [mask-image:linear-gradient(to_bottom,transparent,black_12px)]" />
      </SheetContent>
    </Sheet>
  );
}

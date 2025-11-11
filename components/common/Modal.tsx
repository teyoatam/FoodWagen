import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export default function Modal({
  open,
  onOpenChange,
  title,
  children,
  widthClass = "food-w-[560px]",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  widthClass?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="food-fixed food-inset-0 food-bg-black/50" />
        <div className="food-fixed food-inset-0 food-flex food-items-start food-justify-center food-overflow-y-auto">
          <Dialog.Content
            className={`food-mt-24 food-rounded-2xl food-bg-white food-shadow-xl food-p-6 ${widthClass}`}
            aria-modal
            aria-label={title}
          >
            <Dialog.Title className="food-text-center food-text-2xl food-font-semibold food-text-slate-800 food-mb-4">
              {title}
            </Dialog.Title>
            {children}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

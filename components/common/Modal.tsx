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
        <Dialog.Overlay className="food-fixed food-inset-0 food-bg-black/50 food-z-40" />
        <div className="food-fixed food-inset-0 food-flex food-items-center food-justify-center food-overflow-y-auto food-z-50 food-p-4">
          <Dialog.Content
            className={`food-my-8 food-rounded-3xl food-bg-white food-shadow-2xl food-p-8 food-max-h-[90vh] food-overflow-y-auto ${widthClass} food-max-w-full`}
            aria-modal
            aria-label={title}
          >
            <Dialog.Title className="food-text-center food-text-3xl food-font-bold food-text-orange-500 food-mb-6">
              {title}
            </Dialog.Title>
            <div className="food-space-y-1">
              {children}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

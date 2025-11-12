import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export default function Modal({
  open,
  onOpenChange,
  title,
  children,
  footer,
  widthClass = "food-w-[560px]",
  titleClassName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  widthClass?: string;
  titleClassName?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="food-fixed food-inset-0 food-bg-black/50 food-z-40" />
        <div className="food-fixed food-inset-0 food-flex food-items-center food-justify-center food-z-50 food-p-4">
          <Dialog.Content
            className={`food-my-8 food-rounded-3xl food-bg-white food-shadow-2xl food-max-h-[90vh] food-flex food-flex-col ${widthClass} food-max-w-full food-overflow-hidden`}
            aria-modal
            aria-label={title}
          >
            <div className="food-sticky food-top-0 food-bg-white food-z-10 food-px-8 food-pt-8 food-pb-4 food-border-b food-border-slate-200">
              <Dialog.Title className={titleClassName || "food-text-center food-text-3xl food-font-bold food-text-[#FF9A0E]"}>
                {title}
              </Dialog.Title>
            </div>

            <div className="food-flex-1 food-overflow-y-auto food-px-8 food-py-6">
              {children}
            </div>
            {footer && (
              <div className="food-sticky food-bottom-0 food-bg-white food-z-10 food-px-8 food-py-4 food-border-t food-border-slate-200">
                {footer}
              </div>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

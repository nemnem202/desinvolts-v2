import { useState } from "react";
import ButtonPlus from "@/components/ui/buttonPlus";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAdmin } from "@/providers/adminProvider";
import type { TrombinoscopeElement } from "@/types/db";
import AddTrombinoscopeItem from "./addTrombinoscopeItem";
import TrombinoscopeItem from "./trombinoscopeItem";

export default function Trombinoscope({
  elements,
  setElements,
}: {
  elements: TrombinoscopeElement[];
  setElements: (newElements: TrombinoscopeElement[]) => void;
}) {
  const { isAdminDisplay } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);
  const onItem = (item: TrombinoscopeElement) => {
    setElements([...elements, item]);
  };
  return (
    <div className="flex w-full h-full items-center relative gap-2">
      <div className="flex w-full flex-wrap justify-center gap-3 md:gap-0 md:flex-nowrap md:aspect-3/2 overflow-hidden md:rounded-lg">
        {elements
          .sort((a, b) => a.position - b.position)
          .map((element, index) => (
            <TrombinoscopeItem
              element={element}
              elements={elements}
              key={index}
              setElement={(newElement) =>
                setElements([
                  ...elements.filter((e) => e.position !== newElement.position),
                  newElement,
                ])
              }
              setElements={setElements}
            />
          ))}
      </div>
      {isAdminDisplay && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <ButtonPlus onClick={() => setDialogOpen(true)} />
          </DialogTrigger>
          <AddTrombinoscopeItem setOpen={setDialogOpen} elements={elements} onItem={onItem} />
        </Dialog>
      )}
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";

import { Grip } from "lucide-react";
import { Reorder, useDragControls, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

const ReorderList: React.FC<ReorderListProps> = ({
  className,
  itemClassName,
  withDragHandle = false,
  onReorderFinish,
  ...props
}) => {
  const [items, setItems] = useState<React.ReactElement[]>(
    React.Children.toArray(props.children).filter((child) =>
      React.isValidElement(child),
    ) as React.ReactElement[],
  );
  const [isDragging, setIsDragging] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<React.ReactElement[] | null>(null);

  useEffect(() => {
    const newItems = React.Children.toArray(props.children).filter((child) =>
      React.isValidElement(child),
    ) as React.ReactElement[];
    setItems(newItems);
  }, [props.children]);

  const handleReorder = (newOrder: unknown[]) => {
    const ordered = newOrder as React.ReactElement[];
    setItems(ordered);
    setPendingOrder(ordered);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (pendingOrder) {
      onReorderFinish?.(pendingOrder);
      setPendingOrder(null);
    }
  };

  return (
    <Reorder.Group
      data-slot="reorder-list-group"
      axis="y"
      className={cn("flex flex-col gap-1 select-none list-none !p-0 !m-0", className)}
      values={items}
      onReorder={handleReorder}
      {...props}
    >
      {items.map((item, index) => (
        <ReorderListItem
          key={item?.key || index}
          item={item}
          withDragHandle={withDragHandle}
          className={itemClassName}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        />
      ))}
    </Reorder.Group>
  );
};

const ReorderListItem: React.FC<{
  item: React.ReactElement;
  className?: string;
  withDragHandle?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}> = ({ item, className, withDragHandle = false, onDragStart, onDragEnd }) => {
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      data-slot="reorder-list-item"
      id={item?.key ?? ""}
      value={item}
      className={cn(" list-none !p-0 !m-0", !withDragHandle ? "cursor-grab" : "", className)}
      style={{ y }}
      dragListener={!withDragHandle}
      dragControls={withDragHandle ? dragControls : undefined}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {withDragHandle ? (
        <div className="relative flex items-center gap-2">
          {React.isValidElement<{ className?: string }>(item)
            ? React.cloneElement(item, {
                className: cn("pr-5 w-full", item.props.className),
              })
            : item}
          <Grip
            className="size-4 absolute cursor-grab right-0 top-1/2 -translate-y-1/2 text-muted-foreground"
            onPointerDown={(e) => dragControls.start(e)}
          />
        </div>
      ) : (
        item
      )}
    </Reorder.Item>
  );
};

export interface ReorderListProps extends Partial<React.ComponentProps<typeof Reorder.Group>> {
  children: React.ReactElement[];
  className?: string;
  itemClassName?: string;
  withDragHandle?: boolean;
  onReorderFinish?: (newOrder: React.ReactElement[]) => void;
}

export { ReorderList };

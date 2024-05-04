import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const boxVariants = cva("", {
  variants: {
    hStack: {
      true: "flex flex-row gap-2 items-center",
    },
    row: {
      true: "flex flex-row gap-2",
    },
    spaceBetween: {
      true: "flex justify-between",
    },
    vStack: {
      true: "flex flex-col gap-2 items-start",
    },
    zStack: {
      true: "grid grid-cols-1 grid-rows-1 *:relative *:z-auto *:col-start-1 *:row-start-1",
    },
    fullWidth: {
      true: "w-full",
    },
    center: {
      true: "flex justify-center items-center",
    },
  },
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  asChild?: boolean;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      hStack,
      vStack,
      row,
      fullWidth,
      center,
      zStack,
      spaceBetween,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(
          boxVariants({
            hStack,
            vStack,
            zStack,
            row,
            fullWidth,
            center,
            spaceBetween,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Box.displayName = "Box";

export { Box, boxVariants };

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[1rem] font-inter font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-95 select-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-secondary font bold shadow hover:brightness-85",
        secondary: "bg-secondary text-white shadow-sm hover:opacity-90 font-bold",
        outline: "bg-background text-secondary shadow-sm hover:bg-muted font-bold",
        ghost: "text-secondary",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#25D366]/90 shadow-md",
      },
        size: {
          xs: "h-10 px-6 rounded-full text-[14px]",
          sm: "h-9 px-6 rounded-full text-[1rem]",
          md: "h-12 px-8 rounded-full",
          lg: "h-[3.2rem] px-8 rounded-full",
          xl: "h-20 px-10 rounded-2xl",
          icon: "size-10 rounded-full",
          floating: "h-12 flex-1 px-3 rounded-full text-[clamp(0.9rem,2.5vw,0.9rem)] tracking-tight leading-none gap-1.5",
        },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
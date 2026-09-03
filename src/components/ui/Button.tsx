import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const variantClass: Record<Variant, string> = { primary: "btn-primary", secondary: "btn-secondary", ghost: "btn-ghost", whatsapp: "btn-whatsapp" };

interface BaseProps { variant?: Variant; size?: Size; className?: string; children: ReactNode }

export function Button({ variant = "primary", size = "md", className, ...props }: BaseProps & ComponentProps<"button">) {
  return <button className={cn(variantClass[variant], size === "lg" && "btn-lg", className)} {...props} />;
}

type LinkProps = BaseProps & Omit<ComponentProps<typeof Link>, "className" | "children">;
export function ButtonLink({ variant = "primary", size = "md", className, ...props }: LinkProps) {
  return <Link className={cn(variantClass[variant], size === "lg" && "btn-lg", className)} {...props} />;
}

export function ButtonAnchor({ variant = "primary", size = "md", className, ...props }: BaseProps & ComponentProps<"a">) {
  return <a className={cn(variantClass[variant], size === "lg" && "btn-lg", className)} {...props} />;
}

import { cn } from "@/lib/utils";
import Link from "next/link";

export const LinkBtn = ({ href, children, className, ...props }) => {
  return (
    <Link 
      href={href} 
      className={cn(
        "bottom-6 left-12 cursor-pointer inline-flex items-center justify-center leading-none select-none focus:outline-none transition-colors py-2.5 px-6 backdrop-blur-sm border-[1.5px] hover:bg-gold rounded-full max-h-[inherit] w-2/3",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};


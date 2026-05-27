import { cn } from "@/lib/utils";

type PodProps = {
  emoji: string;
  gradient: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  floating?: boolean;
  rotate?: number;
};

const sizeMap = {
  xs: "h-12 w-12 text-2xl",
  sm: "h-16 w-16 text-3xl",
  md: "h-24 w-24 text-4xl",
  lg: "h-36 w-36 text-6xl",
  xl: "h-56 w-56 text-8xl",
};

// A "pod" — round candy capsule with a vibrant gradient. Decorative; aria-hidden.
export function Pod({
  emoji,
  gradient,
  size = "md",
  className,
  floating = false,
  rotate = 0,
}: PodProps) {
  return (
    <div
      aria-hidden
      style={{
        background: gradient,
        transform: `rotate(${rotate}deg)`,
      }}
      className={cn(
        "relative rounded-full shadow-[0_20px_50px_-12px_rgba(168,85,247,0.45)] grid place-items-center",
        sizeMap[size],
        floating && "animate-float",
        className
      )}
    >
      {/* glossy highlight */}
      <span
        aria-hidden
        className="absolute top-[8%] left-[15%] h-[28%] w-[35%] rounded-full bg-white/40 blur-md"
      />
      <span className="relative drop-shadow-sm">{emoji}</span>
    </div>
  );
}

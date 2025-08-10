"use client"
""

import * as React from "react"

type SkillItem = {
  name: string
  src: string
  href?: string
}

const defaultItems: SkillItem[] = [
  {
    name: "React",
    src: "/placeholder.svg?height=64&width=64",
    href: "https://react.dev",
  },
  {
    name: "Next.js",
    src: "/placeholder.svg?height=64&width=64",
    href: "https://nextjs.org",
  },
  {
    name: "TypeScript",
    src: "/placeholder.svg?height=64&width=64",
    href: "https://www.typescriptlang.org",
  },
  {
    name: "Node.js",
    src: "/placeholder.svg?height=64&width=64",
    href: "https://nodejs.org",
  },
  {
    name: "Python",
    src: "/placeholder.svg?height=64&width=64",
    href: "https://www.python.org",
  },
  {
    name: "MongoDB",
    src: "/placeholder.svg?height=64&width=64",
    href: "https://www.mongodb.com",
  },
]

export default function SkillsMarquee({
  items = defaultItems,
  direction = "left",
  speed = "normal",
  itemClassName,
}: {
  items?: SkillItem[]
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  itemClassName?: string
}) {
  const speedToDuration: Record<"slow" | "normal" | "fast", string> = {
    slow: "40s",
    normal: "24s",
    fast: "14s",
  }

  // Duplicamos los ítems para un bucle perfecto (0% a -50%)
  const loopItems = React.useMemo(() => [...items, ...items], [items])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Degradados en los bordes para suavizar la entrada/salida */}
      <div aria-hidden className="pointer-events-none absolute z-10 inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
      <div aria-hidden className="pointer-events-none absolute z-10 inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />

      <div
        className="marquee-wrapper"
        style={
          {
            ["--duration" as any]: speedToDuration[speed],
          } as React.CSSProperties
        }
      >
        <div className={`marquee ${direction === "right" ? "reverse" : ""}`}>
          {loopItems.map((item, idx) => {
            const card = (
              <div
                className={`flex items-center gap-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors px-12 py-8 max-md:px-6 max-md:py-4 ${itemClassName || ""}`}
              >
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={`${item.name} logo`}
                  height={40}
                  width={40}
                  loading="lazy"
                  className="h-14 w-14 object-contain"
                />
                <span className="text-white/90 font-medium text-lg">{item.name}</span>
              </div>
            )

            return (
              <div className="shrink-0" key={`${item.name}-${idx}`}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={item.name}
                    title={item.name}
                    className="block"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .marquee-wrapper {
          position: relative;
          width: 100%;
        }
        .marquee {
          display: flex;
          gap: 1rem; /* separación entre tarjetas */
          width: max-content;
          padding: 0.5rem 0;
          animation: scroll-left var(--duration) linear infinite;
          will-change: transform;
        }
        .marquee.reverse {
          animation-name: scroll-right;
        }
        /* Pausa al hacer hover */
        .marquee-wrapper:hover .marquee {
          animation-play-state: paused;
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        /* Respeta preferencias de movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

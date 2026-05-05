const KEYWORDS = [
  "Full-Stack Engineering",
  "AI Integration",
  "System Architecture",
  "Performance Optimization",
  "Clean Architecture",
  "Test-Driven Development",
  "REST API Design",
  "Microservices",
];

export default function MarqueeBanner() {
  return (
    <div className="relative w-full overflow-hidden border-y border-border py-8 bg-card/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...KEYWORDS, ...KEYWORDS].map((item, i) => (
          <span
            key={i}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold mx-8 text-foreground/40 hover:text-accent transition-colors"
          >
            {item} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

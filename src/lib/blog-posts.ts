export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTimeMinutes: number;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "shipping-with-signal",
    title: "Shipping with signal, not noise",
    excerpt:
      "How small teams can keep velocity high by tightening feedback loops and making observability a first-class habit.",
    date: "2026-03-12",
    tags: ["Culture", "Systems"],
    readTimeMinutes: 6,
    content: `## The cost of quiet failures

When a service misbehaves in production, the fastest teams aren't the ones with the most dashboards — they're the ones who already know **which signals matter** for the user journey they own.

### What I optimize for

1. **One golden path metric** per critical flow (latency, success rate, or queue depth).
2. **Structured logs** that answer "who, what, where" without grep archaeology.
3. **Runbooks** that fit on a single screen — if it's longer, it's probably unmaintained.

### Takeaway

Invest in signal density: fewer graphs, sharper questions, and alerts that wake people up for the right reasons. Your future self (and your on-call rotation) will thank you.`,
  },
  {
    slug: "practical-distributed-design",
    title: "Practical notes on distributed design",
    excerpt:
      "Idempotency, backpressure, and graceful degradation — patterns I reach for when scaling services beyond a single region.",
    date: "2026-02-02",
    tags: ["Backend", "Architecture"],
    readTimeMinutes: 8,
    content: `## Start from constraints

Distributed systems are really **constraint management** problems: clocks drift, networks partition, and retries duplicate work. I like to begin with explicit failure modes instead of hypothetical perfection.

### Patterns in my toolkit

- **Idempotent handlers** for any path that can retry.
- **Backpressure** at boundaries (queues, bulkheads) instead of unbounded buffers.
- **Timeouts + budgets** everywhere — optimism is not a strategy.

### Closing thought

The best architecture diagrams are the ones your teammates can explain in a sentence. If it takes longer, simplify the story before you simplify the system.`,
  },
  {
    slug: "why-i-build-tools",
    title: "Why I still build small tools",
    excerpt:
      "Tiny utilities teach empathy for users and sharpen the same skills that matter in large platforms.",
    date: "2026-01-18",
    tags: ["DX", "Product"],
    readTimeMinutes: 5,
    content: `## Tools as compressed product thinking

A JSON formatter or timezone helper might look trivial next to a multi-region deployment — but **constraints are the teacher**. You have milliseconds, millimeters of UI, and zero patience from the user.

### What building in public does

- Forces **clarity**: labels, errors, and empty states have nowhere to hide.
- Rewards **performance**: slow tools feel broken instantly.
- Builds **taste**: micro-interactions compound into trust.

If you're an engineer who only ever works behind internal APIs, try shipping something small. It's the fastest way to remember what "fast" feels like on the other side of the glass.`,
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

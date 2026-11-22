import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center bg-obsidian pt-24 text-center">
      <div className="wrap">
        <p className="eyebrow mb-6">404 · Out of bounds</p>
        <h1 className="display text-[clamp(56px,9vw,140px)]">This page <em className="text-gold">isn&apos;t on the field.</em></h1>
        <Link href="/" className="mt-10 inline-flex rounded-full bg-gold px-7 py-4 font-medium text-obsidian hover:bg-gold-soft">Back to home</Link>
      </div>
    </section>
  );
}

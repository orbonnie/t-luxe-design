export default function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-6 pt-20 text-center">
      <h1 className="font-display text-5xl text-plum md:text-6xl">{title}</h1>
      <div className="mx-auto mt-4 h-1 w-16 rounded bg-bloom" />
      {intro && (
        <p className="mt-6 text-lg leading-relaxed opacity-80">{intro}</p>
      )}
    </div>
  );
}

type PageHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHeading({
  eyebrow,
  title,
  description,
}: PageHeadingProps) {
  return (
    <div className="mb-8 border-b border-stone-200 pb-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
        {description}
      </p>
    </div>
  );
}

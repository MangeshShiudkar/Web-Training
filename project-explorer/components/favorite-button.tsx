"use client";

import { useState } from "react";

export default function FavoriteButton({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const [favorite, setFavorite] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={favorite}
      aria-label={`${favorite ? "Remove" : "Add"} ${projectName} ${favorite ? "from" : "to"} favorites`}
      onClick={() => setFavorite(!favorite)}
      className={`grid size-9 shrink-0 place-items-center rounded-full border text-lg transition-colors ${favorite ? "border-rose-200 bg-rose-50 text-rose-700" : "border-stone-200 bg-white text-stone-500 hover:border-rose-200 hover:text-rose-700"}`}
      data-project-id={projectId}
    >
      {favorite ? "♥" : "♡"}
    </button>
  );
}

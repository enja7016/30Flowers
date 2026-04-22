"use client";

import { useMemo, useState } from "react";
import { fallbackMemory, memories, type Memory } from "@/data/memories";

type Position = {
  top: string;
  left: string;
};

const FLOWER_COUNT = 30;

function createPositions(total: number): Position[] {
  return Array.from({ length: total }, () => ({
    top: `${Math.random() * 88 + 2}%`,
    left: `${Math.random() * 88 + 2}%`,
  }));
}

export function FlowerGarden() {
  const [started, setStarted] = useState(false);
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const positions = useMemo(() => createPositions(FLOWER_COUNT), []);

  const progressText = `${openedIds.length} / ${FLOWER_COUNT}`;
  const allUnlocked = openedIds.length === FLOWER_COUNT;

  const openMemory = (id: number) => {
    const memory = memories[id] ?? fallbackMemory;
    setActiveMemory(memory);
    setOpenedIds((previous) => (previous.includes(id) ? previous : [...previous, id]));
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-6 p-6">
      {!started ? (
        <section className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-plum">For your 30th birthday</h1>
          <p className="mt-3 text-slate-700">I made you an interactive flower garden.</p>
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-6 rounded-full bg-plum px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Start
          </button>
        </section>
      ) : (
        <section className="w-full space-y-4">
          <div className="text-center text-lg font-semibold" data-testid="progress">
            {progressText}
          </div>

          <div className="relative h-[70vh] overflow-hidden rounded-2xl bg-white/80 shadow-lg" data-testid="garden">
            {positions.map((position, index) => {
              const id = index + 1;
              return (
                <button
                  key={id}
                  type="button"
                  data-testid={`flower-${id}`}
                  aria-label={`Open memory ${id}`}
                  onClick={() => openMemory(id)}
                  className="absolute h-12 w-12 rounded-full border border-pink-200 bg-pink-100 text-xs font-medium text-pink-700 shadow transition hover:scale-105"
                  style={position}
                >
                  Flower {id}
                </button>
              );
            })}
          </div>

          {allUnlocked ? (
            <p className="rounded-lg bg-white/90 p-4 text-center font-medium text-plum">
              Final message unlocked: You mean everything to me.
            </p>
          ) : null}
        </section>
      )}

      {activeMemory ? (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <p className="text-slate-800">{activeMemory.text}</p>
            {activeMemory.img ? (
              <img
                src={activeMemory.img}
                alt="Memory"
                className="mt-4 max-h-64 w-full rounded-lg object-cover"
              />
            ) : null}
            <button
              type="button"
              onClick={() => setActiveMemory(null)}
              className="mt-6 rounded-full bg-plum px-5 py-2 font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}


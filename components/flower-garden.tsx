"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { fallbackMemory, memories, type Memory } from "@/data/memories";
import flower1 from "@/images/flower1.png";
import flower2 from "@/images/flower2.png";
import flower3 from "@/images/flower3.png";
import flower4 from "@/images/flower4.png";
import flower5 from "@/images/flower5.png";
import flower6 from "@/images/flower6.png";

const flowerImages = [flower1, flower2, flower3, flower4, flower5, flower6];

type Position = {
  top: string;
  left: string;
  flower: (typeof flowerImages)[number];
};

const FLOWER_COUNT = 30;
const COPIES_PER_FLOWER = FLOWER_COUNT / flowerImages.length;

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createPositions(total: number): Position[] {
  const deck = shuffle(
      flowerImages.flatMap((flower) => Array(COPIES_PER_FLOWER).fill(flower))
  );

  const cols = 6;
  const rows = Math.ceil(total / cols);
  const cells = shuffle(
      Array.from({ length: rows * cols }, (_, i) => ({
        col: i % cols,
        row: Math.floor(i / cols),
      }))
  );

  // Use a range wider than 0-100% so flowers spill past the box edges,
  // hiding the border. Flower button is 144px (h-36/w-36), so position
  // is the top-left corner of that box.
  const rangeStart = -8;
  const rangeEnd = 93;
  const span = rangeEnd - rangeStart;

  const cellWidth = span / cols;
  const cellHeight = span / rows;
  const jitter = 0.1;

  return Array.from({ length: total }, (_, index) => {
    const cell = cells[index];
    const top =
        rangeStart + cell.row * cellHeight + Math.random() * cellHeight * jitter;
    const left =
        rangeStart + cell.col * cellWidth + Math.random() * cellWidth * jitter;

    return {
      top: `${top}%`,
      left: `${left}%`,
      flower: deck[index],
    };
  });
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

          <div className="relative mx-auto aspect-square w-full max-w-2xl overflow-visible rounded-2xl bg-white/80 shadow-lg" data-testid="garden">
            {positions.map((position, index) => {
              const id = index + 1;
              return (
                  <button
                      key={id}
                      type="button"
                      data-testid={`flower-${id}`}
                      aria-label={`Open memory ${id}`}
                      onClick={() => openMemory(id)}
                      className="absolute h-52 w-52 appearance-none border-0 bg-transparent p-0 transition hover:scale-110"
                      style={{ top: position.top, left: position.left }}
                  >
                    <Image
                        src={position.flower}
                        alt=""
                        fill
                        sizes="208px"
                        className="object-contain"
                        priority={id <= 3}
                    />
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


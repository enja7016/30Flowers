"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { fallbackMemory, memories, type Memory } from "@/data/memories";
import flower1 from "@/images/flowers/flower1.png";
import flower2 from "@/images/flowers/flower2.png";
import flower3 from "@/images/flowers/flower3.png";
import flower4 from "@/images/flowers/flower4.png";
import flower5 from "@/images/flowers/flower5.png";
import flower6 from "@/images/flowers/flower6.png";

const flowerImages = [flower1, flower2, flower3, flower4, flower5, flower6];
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const publicAssetVersion = process.env.NEXT_PUBLIC_ASSET_VERSION || "";

function withBasePath(path: string): string {
  const prefixedPath = path.startsWith("/") ? `${publicBasePath}${path}` : path;

  if (!publicAssetVersion) {
    return prefixedPath;
  }

  const separator = prefixedPath.includes("?") ? "&" : "?";
  return `${prefixedPath}${separator}v=${publicAssetVersion}`;
}

type Position = {
  top: string;
  left: string;
  flower: (typeof flowerImages)[number];
};

export type FlowerCell = {
  row: number;
  col: number;
  flowerIndex: number;
};

type ActiveMemory = {
  memory: Memory;
  flower: Position["flower"];
};

const FLOWER_COUNT = 30;

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getSafeRowShifts(columnCount: number): number[] {
  const shifts = Array.from({ length: columnCount - 1 }, (_, index) => index + 1).filter(
    (shift) => shift !== 1 && shift !== columnCount - 1
  );

  return shifts.length > 0 ? shifts : [1];
}

export function createFlowerCells(total: number): FlowerCell[] {
  const cols = flowerImages.length;
  const rows = Math.ceil(total / cols);
  const baseRow = shuffle(Array.from({ length: cols }, (_, index) => index));
  const safeRowShifts = getSafeRowShifts(cols);
  const rowOffsets: number[] = [0];

  for (let rowIndex = 1; rowIndex < rows; rowIndex++) {
    const previousOffset = rowOffsets[rowIndex - 1];
    const shift = safeRowShifts[Math.floor(Math.random() * safeRowShifts.length)];
    rowOffsets.push((previousOffset + shift) % cols);
  }

  return Array.from({ length: total }, (_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const offset = rowOffsets[row];

    return {
      row,
      col,
      flowerIndex: baseRow[(col + offset) % cols],
    };
  });
}

function createPositions(total: number): Position[] {
  const cells = createFlowerCells(total);
  const cols = flowerImages.length;
  const rows = Math.ceil(total / cols);

  // Use a range wider than 0-100% so flowers spill past the box edges,
  // hiding the border. Flower button is 144px (h-36/w-36), so position
  // is the top-left corner of that box.
  const rangeStart = -8;
  const rangeEnd = 93;
  const span = rangeEnd - rangeStart;

  const cellWidth = span / cols;
  const cellHeight = span / rows;
  const jitter = 0.1;

  return shuffle(cells).map((cell) => {
    const top =
      rangeStart + cell.row * cellHeight + Math.random() * cellHeight * jitter;
    const left =
      rangeStart + cell.col * cellWidth + Math.random() * cellWidth * jitter;

    return {
      top: `${top}%`,
      left: `${left}%`,
      flower: flowerImages[cell.flowerIndex],
    };
  });
}

export function FlowerGarden() {
  const [started, setStarted] = useState(false);
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [shrinkingIds, setShrinkingIds] = useState<number[]>([]);
  const [hiddenIds, setHiddenIds] = useState<number[]>([]);
  const [activeMemory, setActiveMemory] = useState<ActiveMemory | null>(null);
  const [isMemoryVisible, setIsMemoryVisible] = useState(false);
  const [showHiddenMemory, setShowHiddenMemory] = useState(false);
  const [isHiddenMemoryVisible, setIsHiddenMemoryVisible] = useState(false);
  const positions = useMemo(() => createPositions(FLOWER_COUNT), []);
  const shrinkDurationMs = 300;

  const progressPercent = Math.round((openedIds.length / FLOWER_COUNT) * 100);
  const allUnlocked = openedIds.length === FLOWER_COUNT;

  const openMemory = (id: number) => {
    // Always unlock memories by sequence (1..30), independent of which flower is clicked.
    const nextMemoryNumber = openedIds.length + 1;
    const memory = memories[nextMemoryNumber] ?? fallbackMemory;
    const flower = positions[id - 1]?.flower ?? flower1;
    setActiveMemory({ memory, flower });
    setIsMemoryVisible(false);
    window.requestAnimationFrame(() => {
      setIsMemoryVisible(true);
    });
    setOpenedIds((previous) => (previous.includes(id) ? previous : [...previous, id]));

    // Animate the clicked flower out before removing it from layout.
    setShrinkingIds((previous) => (previous.includes(id) ? previous : [...previous, id]));
    window.setTimeout(() => {
      setHiddenIds((previous) => (previous.includes(id) ? previous : [...previous, id]));
      setShrinkingIds((previous) => previous.filter((flowerId) => flowerId !== id));
    }, shrinkDurationMs);
  };

  const closeMemory = () => {
    setIsMemoryVisible(false);
    window.setTimeout(() => {
      setActiveMemory(null);
    }, shrinkDurationMs);
  };

  const revealHiddenMemory = () => {
    setShowHiddenMemory(true);
    window.requestAnimationFrame(() => {
      setIsHiddenMemoryVisible(true);
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-6 p-6">
      {!started ? (
        <section className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-plum">Till din 30-års dag!</h1>
          <p className="mt-3 text-slate-700">30 blommor för dig 🌸</p>
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
          {!allUnlocked ? (
            <div className="-mt-2 space-y-2 pb-2 pt-2" data-testid="progress-wrapper">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                <span>Progress</span>
                <span data-testid="progress-label">{openedIds.length} / {FLOWER_COUNT}</span>
              </div>
              <div
                className="h-3 w-full overflow-hidden rounded-full bg-white/80 shadow-inner"
                role="progressbar"
                aria-label="Flower progress"
                aria-valuemin={0}
                aria-valuemax={FLOWER_COUNT}
                aria-valuenow={openedIds.length}
                data-testid="progress"
              >
                <div
                  className="h-full rounded-full bg-plum transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : !showHiddenMemory ? (
            <button
              type="button"
              onClick={revealHiddenMemory}
              className="mx-auto mt-4 block rounded-full bg-plum px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Reveal hidden memory
            </button>
          ) : null}

          <div className="relative mx-auto aspect-square w-full max-w-2xl overflow-visible rounded-2xl bg-white/80 shadow-lg" data-testid="garden">
            {allUnlocked && showHiddenMemory ? (
              <div
                className={`absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-700 ${
                  isHiddenMemoryVisible ? "opacity-100" : "opacity-0"
                }`}
                data-testid="hidden-memory"
              >
                <Image
                  src={withBasePath("/memories/grinch.jpg")}
                  alt="Hidden memory"
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
            ) : null}

            {positions.map((position, index) => {
              const id = index + 1;
              const isShrinking = shrinkingIds.includes(id);
              const isHidden = hiddenIds.includes(id);

              if (isHidden) {
                return null;
              }

              return (
                  <button
                      key={id}
                      type="button"
                      data-testid={`flower-${id}`}
                      aria-label={`Open memory ${id}`}
                      onClick={() => openMemory(id)}
                      disabled={isShrinking}
                      className={`absolute h-52 w-52 appearance-none border-0 bg-transparent p-0 transition-transform duration-300 ${
                        isShrinking ? "scale-0 opacity-0" : "hover:scale-110"
                      }`}
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

        </section>
      )}

      {activeMemory ? (
        <div
          className={`fixed inset-0 z-10 flex items-center justify-center bg-black/45 p-4 transition-opacity duration-300 ${
            isMemoryVisible ? "opacity-100" : "opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
        >
    <div
          className={`w-full max-w-2xl p-6 transition-all duration-300 ${
            isMemoryVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="mx-auto flex w-full max-w-xl flex-col items-center">
            <div className="relative h-screen w-screen max-h-[600px] max-w-[600px]">
              <Image src={activeMemory.flower} alt="Selected flower" fill className="object-contain" />
              <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border-4 border-white shadow-md">
                  {activeMemory.memory.img ? (
                    <Image
                      src={withBasePath(activeMemory.memory.img)}
                      alt="Memory"
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-pink-50 px-2 text-center text-xs text-slate-500">
                      Add memory image
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-3 w-full rounded-lg bg-rose-50 p-4 text-slate-800 shadow-sm">{activeMemory.memory.text}</p>
            </div>
            <button
              type="button"
              onClick={closeMemory}
              className="mx-auto mt-6 block rounded-full bg-plum px-5 py-2 font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}


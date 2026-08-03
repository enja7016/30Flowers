import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlowerGarden, createFlowerCells } from "@/components/flower-garden";

describe("createFlowerCells", () => {
  it("never places the same flower kind in adjacent grid cells", () => {
    const total = 30;
    const cols = 6;
    const cells = createFlowerCells(total) as unknown as Array<{
      row: number;
      col: number;
      flowerIndex: number;
    }>;
    const byCoordinate = new Map<string, (typeof cells)[number]>(
      cells.map((cell) => [`${cell.row}-${cell.col}`, cell] as const)
    );

    for (const cell of cells) {
      const rightNeighbor = byCoordinate.get(`${cell.row}-${cell.col + 1}`);
      const bottomNeighbor = byCoordinate.get(`${cell.row + 1}-${cell.col}`);

      if (rightNeighbor) {
        expect(rightNeighbor.flowerIndex).not.toBe(cell.flowerIndex);
      }

      if (bottomNeighbor) {
        expect(bottomNeighbor.flowerIndex).not.toBe(cell.flowerIndex);
      }

      expect(cell.col).toBeGreaterThanOrEqual(0);
      expect(cell.col).toBeLessThan(cols);
    }
  });
});

describe("FlowerGarden", () => {
  it("unlocks memories in fixed sequence regardless of flower click order", async () => {
    const user = userEvent.setup();

    render(<FlowerGarden />);

    await user.click(screen.getByRole("button", { name: "Start" }));

    expect(screen.getByTestId("progress-label")).toHaveTextContent("0 / 30");
    expect(screen.getByTestId("progress")).toHaveAttribute("aria-valuenow", "0");

    await user.click(screen.getByTestId("flower-8"));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/24 juli 1996/i)).toBeInTheDocument();
    expect(screen.getByTestId("progress-label")).toHaveTextContent("1 / 30");
    expect(screen.getByTestId("progress")).toHaveAttribute("aria-valuenow", "1");

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    await user.click(screen.getByTestId("flower-2"));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Jag tror faktiskt att du har förgyllt livet/i)).toBeInTheDocument();
    expect(screen.getByTestId("progress-label")).toHaveTextContent("2 / 30");
    expect(screen.getByTestId("progress")).toHaveAttribute("aria-valuenow", "2");

    await waitFor(() => {
      expect(screen.queryByTestId("flower-8")).not.toBeInTheDocument();
      expect(screen.queryByTestId("flower-2")).not.toBeInTheDocument();
    });
  });
});


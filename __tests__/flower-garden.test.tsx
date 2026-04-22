import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlowerGarden } from "@/components/flower-garden";

describe("FlowerGarden", () => {
  it("starts the experience and opens a memory", async () => {
    const user = userEvent.setup();

    render(<FlowerGarden />);

    await user.click(screen.getByRole("button", { name: "Start" }));

    expect(screen.getByTestId("progress")).toHaveTextContent("0 / 30");

    await user.click(screen.getByTestId("flower-1"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Your first memory goes here.")).toBeInTheDocument();
    expect(screen.getByTestId("progress")).toHaveTextContent("1 / 30");
  });
});


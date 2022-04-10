import { render, screen } from "@testing-library/react";
import SCButton from "./button";

describe("SCButton", () => {
  it("renders the provided content", () => {
    render(<SCButton>Test</SCButton>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should be disabled if disabled is passed", () => {
    render(<SCButton disabled>Test</SCButton>);
    expect(screen.getByText("Test")).toBeDisabled();
  });

  it("should not be disabled if disabled is not passed", () => {
    render(<SCButton>Test</SCButton>);
    expect(screen.getByText("Test")).not.toBeDisabled();
  });
});

import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SCNavbar from "./Navbar";

beforeEach(() => {
  jest.clearAllMocks();
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(
    <Router>
      <SCNavbar />
    </Router>
  );
});

describe("Navbar", () => {
  it("should render", () => {
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should contain a logo", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should contain a list of links", () => {
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should contain a link to the scan page", () => {
    const element = screen.getByText("Scannen");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", "/scan");
  });

  it("should contain a link to the shopping list page", () => {
    const element = screen.getByText("Einkaufsliste");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", "/shopping-list");
  });

  it("should contain a link to the recipes page", () => {
    const element = screen.getByText("Rezepte");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", "/recipes");
  });

  it("should contain a link to the settings page", () => {
    const element = screen.getByText("Einstellungen");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", "/settings");
  });
});

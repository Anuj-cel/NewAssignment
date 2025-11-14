import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar Basic Tests (No Mocks)", () => {
  beforeEach(() => localStorage.clear());

  test("renders brand title", () => {
    render(<Navbar />);
    expect(screen.getByText("AuthApp")).toBeInTheDocument();
  });

  test("renders Home and Dashboard links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("shows Login button when no token exists", () => {
    render(<Navbar />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("shows Logout when token exists", () => {
    localStorage.setItem("token", "abc123");
    render(<Navbar />);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

 
});

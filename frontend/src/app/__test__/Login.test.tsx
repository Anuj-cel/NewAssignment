jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../login/page";

describe("Login Page Basic Tests", () => {
  test("renders login title", () => {
    render(<LoginPage />);
    expect(screen.getByText("Login to Your Account")).toBeInTheDocument();
  });

  test("renders email and password inputs", () => {
    render(<LoginPage />);

    
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  test("updates form state on input change", () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText(
      "you@example.com"
    ) as HTMLInputElement;

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    expect(emailInput.value).toBe("test@example.com");
  });

  test("renders login button", () => {
    render(<LoginPage />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders signup link", () => {
    render(<LoginPage />);
    expect(screen.getByText("Create one")).toBeInTheDocument();
  });
});

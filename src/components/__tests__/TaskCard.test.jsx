import { render, screen } from "@testing-library/react";
import TaskCard from "../TaskCard";

// Mock next/link (IMPORTANT for Next.js)
jest.mock("next/link", () => {
  return ({ children }) => children;
});

describe("TaskCard Component", () => {
  const mockTask = {
    id: 1,
    title: "Test Task",
    description: "Test Description",
    status: "pending",
  };

  test("renders task title", () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={() => {}}
      />
    );

    expect(
      screen.getByText("Test Task")
    ).toBeInTheDocument();
  });

  test("renders task description", () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={() => {}}
      />
    );

    expect(
      screen.getByText("Test Description")
    ).toBeInTheDocument();
  });

  test("renders task status", () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={() => {}}
      />
    );

    expect(
      screen.getByText("pending")
    ).toBeInTheDocument();
  });
});
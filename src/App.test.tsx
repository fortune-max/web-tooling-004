import React from "react";
import { Todo, TodoItem } from "./Todo";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App", () => {
    it("should render the todo form", () => {
        render(<Todo />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    });

    it("should render the todo item", async () => {
        render(
            <TodoItem
                todo={{ isCompleted: false, text: "Finish Homework" }}
                index={0}
                completeTodo={() => 0}
                removeTodo={() => 0}
            />
        );
        const item = await screen.findByTestId("todo-item");
        expect(item).toBeInTheDocument();
    });

    it("should add a todo item on Enter pressed", async () => {
        render(<Todo />);
        const item_old = screen.queryByTestId("todo-item");
        expect(item_old).not.toBeInTheDocument();
        const input = screen.getByRole("textbox");
        userEvent.type(input, "test task");
        expect(input).toHaveFocus();
        userEvent.keyboard("{enter}");
        const item = await screen.findByTestId("todo-item");
        expect(item).toBeInTheDocument();
    });

    it("should add a todo item on Save button pressed", async () => {
        render(<Todo />);
        const item_old = screen.queryByTestId("todo-item");
        expect(item_old).not.toBeInTheDocument();
        const input = screen.getByRole("textbox");
        userEvent.type(input, "test task");
        const button = screen.getByRole("button", { name: /save todo/i });
        userEvent.click(button);
        const item = await screen.findByTestId("todo-item");
        expect(item).toBeInTheDocument();
    });
});

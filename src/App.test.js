import App from "./App";
import { Todo, TodoForm, TodoItem } from "./Todo";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App", () => {
    it("should render the todo form", () => {
        render(<Todo />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    });

    it("should render the todo item", async () => {
        render(
            <TodoItem todo={{ isCompleted: false, text: "Finish Homework" }} />
        );
        const item = await screen.findByTestId("todo-item");
        expect(item).toBeInTheDocument();
    });

    it("should add a todo item", async () => {
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

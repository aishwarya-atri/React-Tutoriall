import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import Moment from "moment";
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

import { MemoryRouter } from "react-router-dom";
const keyDownEvent = {
  key: "ArrowDown",
};

describe("My Application", () => {
  it("should allow for the creation of records", async () => {
    // 1. Select create record button
    // 2. Fill out create record form
    // 3. Verify that new record is in table'

    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    fireEvent.click(screen.getByText(/Add Book/i));
    screen.getByText("Add book in the library!");

    // Select
    const placeholder = screen.getByText("Select...");
    fireEvent.keyDown(placeholder, keyDownEvent);
    await screen.findByText("Comedy");
    fireEvent.click(screen.getByText("Comedy"));

    //Input fields
    fireEvent.change(screen.getByRole("textbox", { name: "Book Name" }), {
      target: { value: "Book 9" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Author" }), {
      target: { value: "Author 1" },
    });
    fireEvent.change(screen.getByLabelText("Published Date"), {
      target: { value: new Date() },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "Quantity" }), {
      target: { value: "5" },
    });

    userEvent.click(screen.getByText(/Submit/));

    let da = new Date().toISOString().split("T")[0];
    await waitFor(() => screen.getByText("Book 9", { timeout: 100000 }));
    let rows = screen.getAllByRole("row");
    let last = rows[rows.length - 1];
    expect(last).toHaveTextContent(/Author 1/);
    expect(last).toHaveTextContent(/Book 9/);
    expect(last).toHaveTextContent(da);
    expect(last).toHaveTextContent(/Comedy/);
    expect(last).toHaveTextContent(/5/);
  });

  it("should show me a list of records", async () => {
    // 1. Verify that number of rows are expected
    // 2. Verify that headers in table are present
    // Only one row added
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    fireEvent.click(screen.getByText(/Books List/i));

    await waitFor(() => screen.getByText("Book 9"));

    let header = screen.getAllByRole("columnheader");
    await expect(header[0]).toHaveTextContent("Book Name");
    await expect(header[1]).toHaveTextContent("Author");
    await expect(header[2]).toHaveTextContent("Published Date");
    await expect(header[3]).toHaveTextContent("Genre");
    await expect(header[4]).toHaveTextContent("Quantity");
    await expect(header[5]).toHaveTextContent("Update");
    await expect(header[6]).toHaveTextContent("Delete");
    let rows = screen.getAllByRole("row");
    expect(rows.length).toBe(10);
  });
  it("should allow for the edit of records", async () => {
    // 1. Select records to edit
    // 2. Verify that values are selected in form
    // 3. Update a single field in record
    // 4. Verify that update appears in the main record table
    //5. Updating the record added(Last One)
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    fireEvent.click(screen.getByText(/Books List/i));

    await waitFor(() => screen.getByText("Book 9"));
    let rows = screen.getAllByRole("row");
    fireEvent.click(within(rows[rows.length - 1]).getByText("Update"));
    await waitFor(() => screen.getByText("Update"));
    let da = Moment(new Date()).format("MM/DD/YYYY");
    let author = screen.getByRole("textbox", { name: "Author" });
    let book_name = screen.getByRole("textbox", { name: "Book Name" });
    let published_date = screen.getByLabelText("Published Date");
    let quantity = screen.getByRole("spinbutton", { name: "Quantity" });

    // checking values are populated properly
    expect(author).toHaveValue("Author 1");
    expect(book_name).toHaveValue("Book 9");
    expect(published_date).toHaveValue(da);
    expect(quantity).toHaveValue(5);
    expect(screen.getByText("Comedy")).toBeInTheDocument();

    // Changing Input Value
    fireEvent.change(author, { target: { value: "Author Changed" } });
    fireEvent.change(published_date, { target: { value: da } });
    fireEvent.change(quantity, { target: { value: "10" } });
    // Select
    const placeholder = screen.getByText("Comedy");
    fireEvent.keyDown(placeholder, keyDownEvent);
    fireEvent.click(screen.getByText("Drama"));

    userEvent.click(screen.getByText(/Update/));

    da = new Date().toISOString().split("T")[0];
    await waitFor(() => screen.getByText("Book 9", { timeout: 100000 }));
    let rows1 = screen.getAllByRole("row");
    let last = rows1[rows1.length - 1];
    expect(last).toHaveTextContent(/Author Changed/);
    expect(last).toHaveTextContent(/Book 9/);
    expect(last).toHaveTextContent(da);
    expect(last).toHaveTextContent(/Drama/);
    expect(last).toHaveTextContent(/10/);
  });
  it("should allow for the deletion of a record", async () => {
    // 1. Select record to delete
    // 2. Delete record
    // 3. Verify that record is no longer in table

    const history = createMemoryHistory();
    global.confirm = jest.fn(() => true);

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    fireEvent.click(screen.getByText(/Books List/i));

    await waitFor(() => screen.getByText("Book 9"));
    let rows = screen.getAllByRole("row");
    await fireEvent.click(within(rows[rows.length - 1]).getByText("Delete"));

    await waitForElementToBeRemoved(rows[rows.length - 1]);

    rows = screen.getAllByRole("row");

    expect(rows.length).toBe(9);
  });
});

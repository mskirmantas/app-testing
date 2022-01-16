import React from "react";
import {
  render,
  fireEvent,
  wait,
  screen,
  act,
  waitForElement,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../App";

global.fetch = require("jest-fetch-mock");

const movieData = [
  {
    id: 1,
    title: "Some movie title1",
    description: "Test description1",
  },
  {
    id: 2,
    title: "Some movie title2",
    description: "Test description2",
  },
  {
    id: 3,
    title: "Some movie title3",
    description: "Test description3",
  },
];

describe("App component", () => {
  test.skip("should display and hide loading", async () => {
    fetch.mockResponseOnce(JSON.stringify(movieData));
    act(() => {
      // fire events that update state
      render(<App />);
    });

    // assert on the output
    expect(screen.getByTestId("loading")).toBeTruthy();
    await waitForElement(() => {
      screen.queryByTestId("movie-list");
      expect(screen.queryByTestId("loading")).toBeFalsy();
    });
  });

  test("should display an error on bad request", async () => {
    fetch.mockResponseOnce(null, { status: 500 });

    act(() => {
      render(<App />);
    });

    expect.assertions(1);

    await waitForElementToBeRemoved(() => {
      screen.getAllByTestId("loading");
      expect(screen.queryByTestId("loading")).toBeFalsy();
      expect(screen.queryByText(/Error loading movies/i)).toBeTruthy();
    });
  });
});

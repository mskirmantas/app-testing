import React from "react";
import {
  render,
  fireEvent,
  wait,
  screen,
  act,
  waitForElement,
} from "@testing-library/react";
import App from "../App";

// need package --> npm i -D jest-fetch-mock
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
  test("should display and hide loading", async () => {
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
});

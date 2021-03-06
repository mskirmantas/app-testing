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

  test.skip("should display an error on bad request", async () => {
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

  test.skip("should display movie details when clicked on movie name", async () => {
    fetch.mockResponseOnce(JSON.stringify(movieData));
    act(() => {
      render(<App />);
    });
    await waitForElementToBeRemoved(() => {
      screen.getAllByTestId("loading");
    });

    const movieTitles = screen.getAllByTestId("movie-title");

    fireEvent.click(movieTitles[0]);
    await wait(() => {
      //getting by movie description instead of title, as title appears more than once
      expect(screen.getByText(movies[0].description)).toBeTruthy();
    });

    fireEvent.click(movieTitles[1]);
    await wait(() => {
      expect(screen.queryByText(movies[0].description)).toBeFalsy();
      expect(screen.getByText(movies[1].description)).toBeTruthy();
    });
  });
});

import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import MovieForm from "../components/movie-form";

// need package --> npm i -D jest-fetch-mock
global.fetch = require("jest-fetch-mock");

const emptyMovie = {
  title: "",
  description: "",
};

const movie = {
  id: 3,
  title: "Some movie title",
  description: "Test description",
};

describe("MovieForm component", () => {
  test("should have form elements", () => {
    const { getByLabelText, getByRole } = render(
      <MovieForm movie={emptyMovie} />
    );

    expect(getByLabelText(/title/i)).toBeTruthy();
    expect(getByLabelText(/description/i)).toBeTruthy();
    expect(getByRole("button", { name: /create/i })).toBeTruthy();
  });

  test("should display form elements with movie data", () => {
    const { getByLabelText, getByRole } = render(<MovieForm movie={movie} />);

    expect(getByLabelText(/title/i).value).toBe(movie.title);
    expect(getByLabelText(/description/i).value).toBe(movie.description);
    expect(getByRole("button", { name: /update/i })).toBeTruthy();
  });

  //   test("shouldn't trigger API request when button is clicked", async () => {
  //     const updateMovie = jest.fn();

  //     jest.spyOn(global, "fetch").mockImplementation(() => { //mocking for all FETCH
  //       Promise.resolve({
  //         json: () => Promise.resolve(movie),
  //       });
  //     });

  //     const { getByRole } = render(
  //       <MovieForm movie={movie} updateMovie={updateMovie} />
  //     );
  //     const submitButton = getByRole("button", { name: /update/i });
  //     fireEvent.click(submitButton);

  //     await wait(() => {
  //       expect(updateMovie).toBeCalledTimes(1);
  //     });
  //   });

  test("shouldn't trigger API request when button is clicked on empty form", async () => {
    const updateMovie = jest.fn();
    jest.spyOn(global, "fetch").mockImplementation(() => {
      Promise.resolve({
        json: () => Promise.resolve(movie),
      });
    });

    const { getByRole } = render(
      <MovieForm movie={emptyMovie} updateMovie={updateMovie} />
    );

    const submitButton = getByRole("button", { name: /create/i });
    fireEvent.click(submitButton);

    await wait(() => {
      expect(updateMovie).toBeCalledTimes(0); //as it should be disabled
    });
  });

  test("shouldn't trigger API request when button is clicked on empty form (alternative)", async () => {
    // need package --> npm i -D jest-fetch-mock
    const updateMovie = jest.fn();
    fetch.mockImplementationOnce(JSON.stringify(emptyMovie));

    const { getByRole } = render(
      <MovieForm movie={emptyMovie} updateMovie={updateMovie} />
    );

    const submitButton = getByRole("button", { name: /create/i });
    fireEvent.click(submitButton);

    await wait(() => {
      expect(updateMovie).toBeCalledTimes(0); //as it should be disabled
    });
  });
});

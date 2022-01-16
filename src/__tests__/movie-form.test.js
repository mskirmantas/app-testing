import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieForm from "../components/movie-form";

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
});

import React from "react";
import { render, screen } from "@testing-library/react";
import MovieDetails from "../components/movie-details";

const selectedMovie = {
  id: 1,
  title: "Some movie title",
  description: "Test description",
  avg_rating: 3,
  no_of_ratings: 2,
};

describe("MovieDetails component", () => {
  test("should match a snapshot", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    expect(container).toMatchSnapshot();
  });

  test("should display title and description", () => {
    const { queryByText } = render(<MovieDetails movie={selectedMovie} />);

    expect(queryByText(selectedMovie.title)).toBeTruthy();
    expect(queryByText(selectedMovie.description)).toBeTruthy();
  });

  test("should display rating color stars", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);

    const selectedStars = container.querySelectorAll(".orange"); //items that have class .orange
    expect(selectedStars.length).toBe(selectedMovie.avg_rating);
  });

  test("should display number of ratings", () => {
    render(<MovieDetails movie={selectedMovie} />);

    const noOfRatings = screen.getByTestId("no-of-ratings");
    expect(noOfRatings.innerHTML).toBe(`(${selectedMovie.no_of_ratings})`);
  });
});

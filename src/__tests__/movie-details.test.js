import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  test("mouseover should highlight the rating stars", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    const stars = container.querySelectorAll(".rate-container svg");

    stars.forEach((star, idx) => {
      fireEvent.mouseOver(star);
      const highlightedStars = container.querySelectorAll(".purple");

      expect(highlightedStars.length).toBe(idx + 1);
    });
  });

  test("mouseleave should un-highlight all rating stars", () => {
    const { container } = render(<MovieDetails movie={selectedMovie} />);
    const stars = container.querySelectorAll(".rate-container svg");

    stars.forEach((star, idx) => {
      fireEvent.mouseOver(star);
      fireEvent.mouseOut(star);
      const highlightedStars = container.querySelectorAll(".purple");

      expect(highlightedStars.length).not.toBe(idx + 1);
      expect(highlightedStars.length).toBe(0);
    });
  });

  test("clicking rating star should update movie rating", () => {
    const update = jest.fn();
    const { container } = render(
      <MovieDetails movie={selectedMovie} updateMovie={update} />
    );
    const stars = container.querySelectorAll(".rate-container svg");

    stars.forEach((star) => {
      fireEvent.click(star);
    });

    setTimeout(() => {
      expect(update).toBeCalledTimes(stars.length);
    }, 2000);
  });
});

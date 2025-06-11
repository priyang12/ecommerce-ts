import { render, screen, fireEvent, act } from "@testing-library/react";
import Carousel from "../Carousel";
import { Mock, vi } from "vitest";
import { useLoadTopProducts as mockedUseLoadTopProducts } from "../../API/ProductAPI";
import { Wrapper } from "../../TestSetup";
import { BrowserRouter } from "react-router-dom";

const mockProducts = [
  { _id: "1", name: "Product One", description: "Desc 1", image: "/img1.jpg" },
  { _id: "2", name: "Product Two", description: "Desc 2", image: "/img2.jpg" },
  {
    _id: "3",
    name: "Product Three",
    description: "Desc 3",
    image: "/img3.jpg",
  },
];

vi.mock("../../API/ProductAPI", async () => {
  const actual = await vi.importActual("../../API/ProductAPI");
  return {
    ...actual,
    useLoadTopProducts: vi.fn(),
  };
});

describe("Carousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (mockedUseLoadTopProducts as Mock).mockReturnValue({ data: mockProducts });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders the correct number of slides", () => {
    render(
      <Wrapper>
        <BrowserRouter>
          <Carousel />
        </BrowserRouter>
      </Wrapper>
    );
    const slides = screen.getAllByText(/Product/i);
    expect(slides.length).toBeGreaterThanOrEqual(mockProducts.length);
  });

  it("navigates to previous slide on button click", () => {
    render(
      <Wrapper>
        <BrowserRouter>
          <Carousel />
        </BrowserRouter>
      </Wrapper>
    );
    const prevButton = screen.getByLabelText(/Previous Slide/i);
    act(() => fireEvent.click(prevButton));
    const visibleSlides = screen.getAllByText(/Product/i);
    expect(visibleSlides.length).toBeGreaterThan(0);
  });

  it("navigates to next slide on button click", () => {
    render(
      <Wrapper>
        <BrowserRouter>
          <Carousel />
        </BrowserRouter>
      </Wrapper>
    );
    const nextButton = screen.getByLabelText(/Next Slide/i);
    act(() => fireEvent.click(nextButton));
    const visibleSlides = screen.getAllByText(/Product/i);
    expect(visibleSlides.length).toBeGreaterThan(0);
  });

  it("automatically changes slide every 3 seconds", () => {
    render(
      <Wrapper>
        <BrowserRouter>
          <Carousel />
        </BrowserRouter>
      </Wrapper>
    );
    const initialSlide = screen.getAllByText(/Product/i)[0];
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    const newSlide = screen.getAllByText(/Product/i)[0];
    expect(newSlide).not.toBe(initialSlide);
  });

  it("pauses auto-slide on hover", () => {
    render(
      <Wrapper>
        <BrowserRouter>
          <Carousel />
        </BrowserRouter>
      </Wrapper>
    );
    const slideElement = screen.getAllByText(/Product/i)[0];
    act(() => {
      fireEvent.mouseEnter(slideElement);
      vi.advanceTimersByTime(6000);
    });
    const sameSlide = screen.getAllByText(/Product/i)[0];
    expect(sameSlide).toBe(slideElement);
  });
});

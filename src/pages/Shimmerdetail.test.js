import { render, screen } from "@testing-library/react";
import Shimmerdetail from "./Shimmerdetail";

describe("Shimmerdetail Component", () => {
    test("renders shimmer container", () => {
        render(<Shimmerdetail />);
        
        // Check if shimmer container exists
        const shimmerContainer = screen.getByTestId("shimmer-detail");
        expect(shimmerContainer).toBeInTheDocument();
    });

    test("renders all shimmer elements", () => {
        render(<Shimmerdetail />);
        
        // Check shimmer image exists
        expect(screen.getByTestId("shimmer-image")).toBeInTheDocument();

        // Check shimmer title exists
        expect(screen.getByTestId("shimmer-title")).toBeInTheDocument();

        // Check shimmer text elements exist
        const shimmerTexts = screen.getAllByTestId("shimmer-text");
        expect(shimmerTexts.length).toBe(6);

        // Check shimmer button exists
        expect(screen.getByTestId("shimmer-button")).toBeInTheDocument();
    });
});

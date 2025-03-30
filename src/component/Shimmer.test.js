
import { render,screen } from "@testing-library/react";
import Shimmer from "./Shimmer";

describe('Shimmer',()=>{
    it("all went good, we tested 20 card", ()=>{
        render(<Shimmer/>);
        
        // we use screen for finding element
        const shimercard = screen.getAllByTestId('shimmer-card');
        expect(shimercard.length).toBe(20);
    });

    it("correcly render component",()=>{
        render(<Shimmer/>)

        const shimmerrendering = screen.getByTestId('shimmer-container');
        expect(shimmerrendering).toBeInTheDocument();
    })

    it("matches the snapshot", ()=>{

        const {asFragment} =  render(<Shimmer/>);
        expect(asFragment()).toMatchSnapshot();
    })
});



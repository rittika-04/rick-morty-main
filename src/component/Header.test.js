import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Header from './Header';
import * as rrd from 'react-router-dom';
import { renderWithProviders } from '../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {

    it('renders correctly', () => {
        renderWithProviders(
            <rrd.BrowserRouter>
                <Header />
            </rrd.BrowserRouter>
        );
    });

    it("renders different components of header", () => {
        renderWithProviders(
            <rrd.BrowserRouter>
                <Header />
            </rrd.BrowserRouter>
        );

        expect(screen.getByAltText('logo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search By Name')).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });


it("does not render on character detail page", () => {
    renderWithProviders(
        <MemoryRouter initialEntries={["/character/1"]}>
            <Header />
        </MemoryRouter>
    );

    expect(screen.queryByAltText('logo')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Search By Name')).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

    

    it("searching by user should update in store", () => {
        const { store } = renderWithProviders(
            <rrd.BrowserRouter>
                <Header />
            </rrd.BrowserRouter>
        );

        const searchInput = screen.getByPlaceholderText('Search By Name');
        fireEvent.change(searchInput, { target: { value: "Rick" } });

        expect(store.getState().search.text).toBe("Rick");
    });

    it("toggle theme when button is clicked", ()=>{
        const {store} = renderWithProviders(
            <MemoryRouter><Header/></MemoryRouter>
        )

        const togglebutton = screen.getByRole("button");
        fireEvent.click(togglebutton);

        expect(store.getState().theme.isDarkmode).toBe(true);
    })
});
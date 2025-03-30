import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react"; // ✅ Added screen import
import Character from './Character';
import { renderWithProviders } from "../utils/test-utils";
import configureStore from "redux-mock-store";
import mockStore from "redux-mock-store";
import { Provider } from "react-redux";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn()
}));


describe('Character', () => {
    it("we are testing character-card is rendering or not", () => {
        const MockCharacter = {
            id: 1,
            name: "Rick Sanchez",
            species: "Human",
            status: "Alive",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        };

        renderWithProviders(
            <MemoryRouter>
                <Character character={MockCharacter} />
            </MemoryRouter>
        );

        const characterCard = screen.getByTestId('character-card');
        expect(characterCard).toBeInTheDocument();

        const characterImage = screen.getByTestId('character-image');
        expect(characterImage).toBeInTheDocument();

        expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
        expect(screen.getByText(/Human/i)).toBeInTheDocument();

        expect(characterImage).toHaveAttribute("src", MockCharacter.image);
    });

});




describe("handling the fallback cases", () => {
    const mockStore = configureStore();
    const navigate = jest.fn();

    let store;

    beforeEach(() => {
        store = mockStore({ characters: { list: [] } });
        jest.spyOn(require("react-router-dom"), "useNavigate")
        .mockImplementation(() => navigate);
    });

    test("renders fallback image when character.image is missing", () => {
        renderWithProviders(
            <Provider store={store}>
                <MemoryRouter>
                    <Character character={{}} />
                </MemoryRouter>
            </Provider>
        );
        const image = screen.getByTestId("character-image");
        expect(image).toHaveAttribute("src", "fallback-image-url");
    });

    test("render fallback name when name is missing ", () => {
        renderWithProviders(
            <Provider store={store}>
                <MemoryRouter>
                    <Character character={{}} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Name: Unknown/i)).toBeInTheDocument();
    });

    test("render fallback when species is missing", () => {
        renderWithProviders(
            <Provider store={store}>
                <MemoryRouter>
                    <Character character={{}} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Species: Unknown/i)).toBeInTheDocument();
    })

    test("render fallback when status is missing", () => {
        renderWithProviders(
            <Provider store={store}>
                <MemoryRouter>
                    <Character character={{}} />
                </MemoryRouter>
            </Provider>
        );

        const statusContainer = screen.getByTestId("character-status");
        expect(statusContainer).toHaveTextContent(/Status.*Unknown/i);
    });

    test("check when character.status is missing then span should belong to unknown class", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Character character={{}} />
                </MemoryRouter>
            </Provider>
        );
    
        const statusSpan = screen.getByText((content, element) => 
            element.tagName.toLowerCase() === "span" && content.trim() === "Unknown"
        );
        
        expect(statusSpan).toHaveClass("unknown");
    });

    test("navigates to correct character page on click", () => {
        const character = { id: 1, name: "Rick", image: "rick-image-url", species: "Human", status: "Alive" };
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Character character={character} />
                </MemoryRouter>
            </Provider>
        );

        const card = screen.getByTestId("character-card");
        fireEvent.click(card);
        expect(navigate).toHaveBeenCalledWith("/character/1");
    });
    
});



describe("Character Component - Fallback Values", () => {
    const mockStore = configureStore();
    let store;

    beforeEach(() => {
        store = mockStore({
            characters: {}, // Empty state to trigger fallbacks
        });
    });

    test("uses default character prop when no data is provided", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Character />
                </MemoryRouter>
            </Provider>
        );

        // Check if fallback name "Unknown" is displayed
        expect(screen.getByText(/Name: Unknown/i)).toBeInTheDocument();
    });

    test("uses default list when charactersState is missing", () => {
        store = mockStore({
            characters: undefined, // Simulating missing characters state
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Character />
                </MemoryRouter>
            </Provider>
        );

        // Since list is empty, the component should still render without errors
        expect(screen.getByTestId("character-card")).toBeInTheDocument();
    });

    test("uses empty array when list is missing in charactersState", () => {
        store = mockStore({
            characters: { list: undefined }, // Simulating missing list
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Character />
                </MemoryRouter>
            </Provider>
        );

        // Ensure the component still renders safely
        expect(screen.getByTestId("character-card")).toBeInTheDocument();
    });
});


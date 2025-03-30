

// production site : https://67a1b9f6a019bb86ffce74d5--effervescent-concha-4cf990.netlify.app/


import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character";

export const fetchData = async (text, page) => {
    console.log("Fetching API with text:", text, " and page is", page);
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&name=${text}`);
        console.log("API data:", response.data);
        return response.data || { results: [], info: { pages: 1 } };
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { results: [], info: { pages: 1 } }; // ✅ Safe fallback
    }
};





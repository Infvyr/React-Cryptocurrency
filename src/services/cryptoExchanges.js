import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    // "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    // "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    "x-access-token":
        "coinrankingbe42030d1b95b849147ccb4ff678ab5c25c0b50aa13fb373",
    "Access-Control-Allow-Origin": "*",
};

const baseUrl =
    "https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2";

const createRequest = url => ({ url, headers: cryptoApiHeaders });

export const cryptoExchanges = createApi({
    reducerPath: "cryptoExchanges",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getExchanges: builder.query({
            query: () => createRequest("/exchanges"),
        }),
    }),
});

export const { useGetExchangesQuery } = cryptoExchanges;

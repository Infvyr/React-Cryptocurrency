import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

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

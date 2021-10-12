import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://api.coinranking.com/v2";

const createRequest = url => ({ url });

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

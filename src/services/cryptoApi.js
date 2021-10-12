import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    // "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-access-token":
        "coinrankingbe42030d1b95b849147ccb4ff678ab5c25c0b50aa13fb373",
    "Access-Control-Allow-Origin": "*",
};

const baseUrl =
    "https://cors-anywhere.herokuapp.com/https://api.coinranking.com/v2";

const createRequest = url => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getCryptos: builder.query({
            query: count => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: coinId => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) =>
                createRequest(`coin/${coinId}/history/${timePeriod}`),
        }),
    }),
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi;

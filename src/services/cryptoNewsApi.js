import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
	'x-bingapis-sdk': 'true',
	'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
	'x-rapidapi-key': 'a9b5d7ae8amsh655dcfb68e83fbfp17fa18jsnade30c0c29ed',
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = url => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
	reducerPath: 'cryptoNewsApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: builder => ({
		getCryptosNews: builder.query({
			query: ({ newsCategory, count, sortBy }) =>
				createRequest(
					`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}&sortby=${sortBy}`
				),
		}),
	}),
});

export const { useGetCryptosNewsQuery } = cryptoNewsApi;

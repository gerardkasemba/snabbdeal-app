import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice =  createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.snabbdeal.com/'} ),
    endpoints: (builder) => ({}),
    tagTypes: ["refreshUnschedule", "pickup", "partners", "refetchPickups", "refreshUnscheduleSeller", "Deliveries"]
})


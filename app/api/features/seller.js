import { apiSlice } from "../services";


// mutation for post, patch e.t.c
// query for get

const sellerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPartner: builder.mutation({
            query: (formData) => ({
                url: "/partner",
                method: "POST",
                body: formData
            })
        }),

        createSeller: builder.mutation({
            query: (data) => ({
                url: "/intent/seller",
                method: "POST",
                body: {...data},
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        })
    })
})


export const { useCreatePartnerMutation, useCreateSellerMutation } = sellerApiSlice
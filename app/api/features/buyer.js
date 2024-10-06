import { apiSlice } from "../services";


// mutation for post, patch e.t.c
// query for get

const buyerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBuyerIntent: builder.mutation({
            query: (formData) => ({
                url: "/intent/buyer",
                method: "POST",
                body: { ...formData }
            })
        }),
        confirmIntent: builder.query({
            query: (intentDetails) => `/intent/buyer/confirm/${intentDetails.buyerIntent}${intentDetails.partnerId ? `?id=${intentDetails.partnerId}` : ""}`
        }),
        trackIntent: builder.mutation({
            query: (trackingId) => ({
                url: `/tracking/${trackingId}`,
                method: "GET"
            })
        }),
        getBuyerData: builder.query({
            query: (buyerId) => ({
                url: `/intent/buyer/${buyerId}`,
                
            })
        }),

        scheduleDelivery: builder.mutation({
            query: (formData) => ({
                url:"/delivery",
                body: {...formData},
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }),

        confirmPayment: builder.query({
            query: (deliveryId) => ({
                url:`/delivery/confirm/${deliveryId}`,
            })
        }),
        trackDelivery: builder.mutation({
            query:(trackingId) => ({
                url:`/delivery/${trackingId}`,
                method:'GET'
            })
        })
    })
})


export const { useCreateBuyerIntentMutation, useConfirmIntentQuery, useTrackIntentMutation, useGetBuyerDataQuery, useScheduleDeliveryMutation, useConfirmPaymentQuery, useTrackDeliveryMutation } = buyerApiSlice
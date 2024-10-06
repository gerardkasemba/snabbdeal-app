import { apiSlice } from "../services";

const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPartners: builder.query({
            query: () => `/partner`,
            providesTags: [{ type: 'partners' }],
        }),
        approvePartner: builder.mutation({
            query: ({partnerId, status}) => ({
                url:`/partner/action/${partnerId}${status ? `?approve="true"`: ''}`,
                method: 'PATCH',
            }),
            invalidatesTags: [{ type: 'partners' }],
        }),
        getAllPickups: builder.query({
            query: () => `/tracking`,
            providesTags: [{ type:'refetchPickups' }]
        }),
        updateDeliveryStatus: builder.mutation({
            query: ({trackingId, formData}) => ({
                url: `/delivery/status/${trackingId}`,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: [{type: "refetchPickups"}]
        }),
        updateOnrouteStatus: builder.mutation({
            query: ({ trackingId, formData }) => ({
                url: `/tracking/${trackingId}`,
                method: 'PATCH',
                body: formData
            }),
            invalidatesTags: [{ type: 'Deliveries' }],
        }),
        submitTestimonial: builder.mutation({
            query: ({trackingId, data}) => ({
                url: `/testimonial/${trackingId}`,
                body: {...data},
                method: 'POST'
            })
        }),
        unscheduledDeliveries: builder.query({
            query: () =>  `/intent/buyer/unscheduled`,
            providesTags: [{type: 'refreshUnscheduleSeller'},{ type:'refreshUnschedule' }]
        }),
        unscheduledSeller: builder.mutation({
            query: (buyerId) => ({
                url: `/intent/seller/buyer/${buyerId}`,
                method: 'GET',
            })
        }),
        editBuyerInfo: builder.mutation({
            query: ({deliveryId, data}) => ({
                url: `/delivery/${deliveryId}`,
                method: 'PATCH',
                body: {...data}
            }),
            invalidatesTags: [{type: "refreshUnschedule"}]
        }),
        editSellerInfo: builder.mutation({
            query: ({sellerId, data}) => ({
                url: `/intent/seller/${sellerId}`,
                method: 'PATCH',
                body: {...data}
            }),
            invalidatesTags: [{type: "refreshUnscheduleSeller"}]
        }),
        getAllDeliveries: builder.query({
            query:() => ({
                url:`/delivery`,
            }),
            providesTags: [{ type:'refreshUnschedule' }, { type: 'refetchPickups' }]
        }),
        getTestimony: builder.query({
            query:() => ({
                url: `/testimonial`,
            })
        })
    })
})
 
export const { useGetAllPartnersQuery, useApprovePartnerMutation, useGetAllPickupsQuery, useUpdateDeliveryStatusMutation, useUpdateOnrouteStatusMutation, useSubmitTestimonialMutation, useUnscheduledDeliveriesQuery, useUnscheduledSellerMutation, useEditBuyerInfoMutation, useEditSellerInfoMutation, useGetAllDeliveriesQuery, useGetTestimonyQuery } = adminApiSlice
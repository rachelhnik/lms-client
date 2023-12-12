import { updateUser } from "../Auth/authSlice";
import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders/get-all-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePusblishableKey: builder.query({
      query: () => ({
        url: "/orders/payment/stripepublishablekey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "/orders/payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, paymentInfo }) => ({
        url: "/orders/create-order",
        method: "POST",
        body: { courseId, paymentInfo },
        credentials: "include" as const,
      }),
      async onQueryStarted({ companyId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateUser(data.user));
        } catch (err: any) {
          console.error("err", err);
        }
      },
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetStripePusblishableKeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
} = orderApi;

import { url } from "inspector";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistarionResponse = {
  message: string;
  activationToken: string;
};
type RegistrationData = {};
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistarionResponse, RegistrationData>({
      query: (data) => ({
        url: "user/registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result", result);
          dispatch(
            userRegistration({ acivationToken: result.data.activationToken })
          );
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activationToken, activationCode }) => ({
        url: "user/activation",
        method: "POST",
        body: {
          activationToken,
          activationCode,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "user/login-user",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          console.log("err", err);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "user/social-login",
        method: "POST",
        body: { email, name, avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          console.log("err", err);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "user/logout-user",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (err) {
          console.log("error", err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery,
} = authApi;

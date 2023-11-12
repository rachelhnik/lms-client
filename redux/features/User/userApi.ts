import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "user/update-profile-photo",
        method: "PUT",
        body: avatar,
        credentials: "include" as const,
      }),
    }),
    updateUserData: builder.mutation({
      query: ({ email, name }) => ({
        url: "user/update-user",
        method: "PUT",
        body: { email, name },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "user/update-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "user/get-all-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateUserDataMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
} = userApi;

const API_INFO = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL,
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  USERS: {
    GET_ALL: "/users",
    GET_USER_BY_ID: (userId: string) => `/users/${userId}`,
  },
};

export default API_INFO;

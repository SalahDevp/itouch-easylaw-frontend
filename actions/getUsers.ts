"use server";

import API_INFO from "@config/apiRoutes";
import buildGetUsersRequest from "@helpers/buildGetUsers";
import { User } from "@typings/User";
import { cookies } from "next/headers";

async function getUsers(): Promise<User[] | null> {
  const getUsersQuery: string = buildGetUsersRequest({
    active: undefined,
    role: "user",
    lastname: undefined,
    firstname: undefined,
    email: undefined,
  });

  const userToken = cookies().get("userToken")?.value;

  try {
    const response = await fetch(API_INFO.BASE_URL + getUsersQuery, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getUsers;

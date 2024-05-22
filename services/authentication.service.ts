"use server";
import { cookies } from "next/headers";
import API_INFO from "@config/apiRoutes";
import { User, UserDataCookies } from "@typings/User";

async function login(formData: any) {
  try {
    const formdatajson = JSON.stringify(formData);
    const response = await fetch(`${API_INFO.BASE_URL}${API_INFO.AUTH.LOGIN}`, {
      method: "POST",
      body: formdatajson,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      return {
        status: "error",
        message: "البريد الإلكتروني أو كلمة المرور غير صالحة",
      };
    }
    const data = await response.json();
    cookies().set("token", data.token);
    cookies().set("id", data.userId);
    const user: User | null = await getLoggedInUserInfo();
    if (user) {
      cookies().set("user", JSON.stringify(user));
      if (user.active) {
        return {
          status: "success",
          message: user.role,
        };
      }
    } else {
      await logout();
      return {
        status: "error",
        message: "حسابك غير مفعل. يرجى التواصل مع الإدارة",
      };
    }
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "حدث خطأ غير متوقع في الخادم",
    };
  }
}

async function logout() {
  cookies().delete("user");
  cookies().delete("token");
  cookies().delete("id");
}

async function refreshDataCookies() {
  const user = await getLoggedInUserInfo();
  if (user) {
    cookies().set("user", JSON.stringify(user));
  }
}

async function register(formData: any) {
  const formdatajson = JSON.stringify(formData);

  try {
    const response = await fetch(
      `${API_INFO.BASE_URL}${API_INFO.AUTH.REGISTER}`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 201) {
      return {
        status: "error",
        message: "المستخدم موجود بالفعل. يرجى تسجيل الدخول.",
      };
    }
    return {
      status: "success",
      message: "تم تسجيل المستخدم بنجاح",
    };
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "حدث خطأ غير متوقع في الخادم",
    };
  }
}

async function getUserDataFromCookies(): Promise<UserDataCookies | null> {
  const user = cookies().get("user")?.value;
  const userToken = cookies().get("token")?.value;
  if (
    user === undefined ||
    user === null ||
    user.length === 0 ||
    userToken === undefined ||
    userToken === null ||
    userToken.length === 0
  ) {
    return null;
  }
  const userObj: User = JSON.parse(user);
  return {
    user: userObj,
    token: userToken,
  };
}

async function getLoggedInUserInfo(): Promise<User | null> {
  const userId = cookies().get("id")?.value;
  if (userId === undefined || userId === null || userId.length === 0) {
    return null;
  }
  try {
    const response = await fetch(
      `${API_INFO.BASE_URL}${API_INFO.USERS.GET_USER_BY_ID(userId as string)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
      }
    );
    if (response.status !== 200) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return null;
  }
}

export {
  login,
  logout,
  register,
  getUserDataFromCookies,
  getLoggedInUserInfo,
  refreshDataCookies,
};

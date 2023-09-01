import axios from "axios";
export const KEY = "ba8d8fb0137039a87f287ba7de3f4dd3";
export const BASE_URL = "https://api.themoviedb.org/3/";

export const moviesApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: KEY,
  },
});

export async function fetchToken() {
  try {
    const { data } = await moviesApi.get(`/authentication/token/new`);

    const token = data.request_token;
    if (data.success) {
      localStorage.setItem("request_token", token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function createSessionId() {
  const token = localStorage.getItem("request_token");
  try {
    const {
      data: { session_id },
    } = await moviesApi.post("/authentication/session/new", {
      request_token: token,
    });
    localStorage.setItem("session_id", session_id);
    return session_id;
  } catch (err) {
    console.log(err.message);
  }
}

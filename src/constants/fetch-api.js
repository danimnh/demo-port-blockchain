// import { API_URL, DEBUG } from "./../env.json";

export const getToken = async () => {
  const token = await localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const BearerToken = "Bearer " + token;

  let headers = new Headers();
  headers.append("Authorization", BearerToken);

  headers.append("Content-Type", "application/json");
  console.log(BearerToken);
  const config = headers;
  return config;
};

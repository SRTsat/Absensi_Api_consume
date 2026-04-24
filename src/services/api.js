import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const login = async (nik, password) => {
  const formData = new FormData();
  formData.append("nik", nik);
  formData.append("password", password);
  
  const res = await api.post("/auth/login", formData);
  return res.data;
};

export const getUser = async (token) => {
  const res = await api.get("/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAttendance = async (token) => {
  const res = await api.get("/check-itn", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
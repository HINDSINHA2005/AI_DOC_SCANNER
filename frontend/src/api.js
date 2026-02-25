import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const uploadFile = async (formData) => {
  const res = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const askQuestion = async (question) => {
  const res = await api.post("/chat", { question });
  return res.data;
};

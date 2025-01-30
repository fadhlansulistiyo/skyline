import axios from "axios";

const BASE_URL = "https://forum-api.dicoding.dev/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { message } = error.response.data;
      return Promise.reject(new Error(message || "An error occurred"));
    }
    return Promise.reject(error);
  }
);

const NetworkSource = {
  putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  },

  getAccessToken() {
    return localStorage.getItem("accessToken");
  },

  async register({ name, email, password }) {
    const { data } = await axiosInstance.post("/register", {
      name,
      email,
      password,
    });
    return data.data.user;
  },

  async login({ email, password }) {
    const { data } = await axiosInstance.post("/login", {
      email,
      password,
    });
    return data.data.token;
  },

  async getOwnProfile() {
    const { data } = await axiosInstance.get("/users/me");
    return data.data.user;
  },

  async getAllUsers() {
    const { data } = await axiosInstance.get("/users");
    return data.data.users;
  },

  async getAllThreads() {
    const { data } = await axiosInstance.get("/threads");
    return data.data.threads;
  },

  async getDetailThread(id) {
    const { data } = await axiosInstance.get(`/threads/${id}`);
    return data.data.detailThread;
  },

  async createThread({ title, body, category = "" }) {
    const { data } = await axiosInstance.post("/threads", {
      title,
      body,
      category,
    });
    return data.data.thread;
  },

  async createComment({ threadId, content = "" }) {
    const { data } = await axiosInstance.post(`/threads/${threadId}/comments`, {
      content,
    });
    return data.data.comment;
  },
};

export default NetworkSource;

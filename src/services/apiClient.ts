// api.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

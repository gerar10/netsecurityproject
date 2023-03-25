import axios from "axios";
const carmela = "http://192.168.100.24:3001/api";
const gerar = "http://192.168.15.8:3001/api";

export const URLBase = axios.create({
  baseURL: gerar
});

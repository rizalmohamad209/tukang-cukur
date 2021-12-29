import { config } from "../config/config";
import axios from "axios";

let content = {
  headers: { "Content-Type": "multipart/form-data" },
};

class MitraDataService {
  getAll() {
    return axios.get(`${config.api_host}/mitra/`);
  }
  getMitraDetails(id) {
    return axios.get(`${config.api_host}/mitra/${id}`);
  }
  postMitra(data) {
    console.log("api call", data);
    return axios.post(`${config.api_host}/mitra/`, data, content);
  }
  update(id, data) {
    return axios.put(`${config.api_host}/mitra/${id}`, data, content);
  }
  delete(id) {
    return axios.delete(`${config.api_host}/mitra/${id}`);
  }
}

export default new MitraDataService();

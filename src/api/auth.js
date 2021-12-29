import { config } from "../config/config";
import axios from "axios";

let content = {
  headers: { "Content-Type": "multipart/form-data" },
};
class AuthDataService {
  signin(data) {
    console.log("api call", data);
    return axios
      .post(`${config.api_host}/signin/`, data, content)
      .then((response) => {
        if (!response.data.data) {
          console.log("tidak ada token");
        } else {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        return response;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  signup(id, data) {
    return axios.put(`${config.api_host}/mitra/${id}`, data, content);
  }
}

export default new AuthDataService();

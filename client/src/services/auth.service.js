import axios from "axios";

const API_URL = "https://localhost:8443/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(bio, username, email, password,avatar) {
    let formData = new FormData()
    formData.append('avatar', avatar)
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('bio', bio)

    return axios.post(API_URL + "signup", formData);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();

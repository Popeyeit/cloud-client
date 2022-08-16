import api from "../http";

export default class UserService {
  static async getUsers() {
    return api.get("/auth/users");
  }

  static async uploadAvatar(formData) {
    return api.post("/files/avatar", formData);
  }

  static async deleteAvatar() {
    return api.delete("/files/avatar");
  }
}

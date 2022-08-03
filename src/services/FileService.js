import api from "../http";

export default class FileService {
  static async getFiles(dirId) {
    return api.get(`/files${dirId ? "?parent=" + dirId : ""}`);
  }

  static async createDir({ name, parent, type }) {
    return api.post("/files", {
      name,
      parent,
      type,
    });
  }
}

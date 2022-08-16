import api from "../http";

export default class FileService {
  static async getFiles(dirId, sort) {
    let url = "/files";

    if (dirId) {
      url = `/files?parent=${dirId}`;
    }
    if (sort) {
      url = `/files?sort=${sort}`;
    }
    if (dirId && sort) {
      url = `/files?parent=${dirId}&sort=${sort}`;
    }
    return api.get(url);
  }

  static async createDir({ name, parent, type }) {
    return api.post("/files", {
      name,
      parent,
      type,
    });
  }

  static async downloadFile(fileId) {
    return api.get(`/files/download/?id=${fileId}`, {
      responseType: "blob",
    });
  }

  static async deleteFile(fileId) {
    return api.delete(`/files/?id=${fileId}`);
  }

  static async searchFile(search) {
    return api.get(`/files/search/?search=${search}`);
  }
}

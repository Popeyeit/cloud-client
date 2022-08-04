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
  static async uploadFile(formData) {
    return api.post("/files/upload", formData, {
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable
          ? progressEvent.total
          : progressEvent.target.getResponseHeader("content-length") ||
            progressEvent.target.getResponseHeader(
              "x-decompressed-content-length"
            );
        console.log("total", totalLength);
        if (totalLength) {
          let progress = Math.round((progressEvent.loaded * 100) / totalLength);
          console.log(progress);
        }
      },
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
}

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
  // static async uploadFile(formData) {
  //   return api.post("/files/upload", formData, {
  //     onUploadProgress: (progressEvent) => {
  //       const totalLength = progressEvent.lengthComputable
  //         ? progressEvent.total
  //         : progressEvent.target.getResponseHeader("content-length") ||
  //           progressEvent.target.getResponseHeader(
  //             "x-decompressed-content-length"
  //           );
  //       if (totalLength) {
  //         let progress = Math.round((progressEvent.loaded * 100) / totalLength);
  //         console.log(progress);
  //       }
  //     },
  //   });
  // }

  static async downloadFile(fileId) {
    return api.get(`/files/download/?id=${fileId}`, {
      responseType: "blob",
    });
  }

  static async deleteFile(fileId) {
    return api.delete(`/files/?id=${fileId}`);
  }
}

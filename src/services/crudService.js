import request from "./apiClient.js";

const crudService = {

  get: (endpoint) =>
    request(endpoint),

  post: (endpoint, data) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: (endpoint, data) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remove: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),

  postForm: (endpoint, formData) =>
    request(endpoint, {
      method: "POST",
      body: formData,
      isFormData: true,
    }),
};

export { crudService };
import request from ".";

export async function getAllCategory() {
  return request(`/category`, {
    method: "GET",
  });
}
export async function createCategory(data) {
  return request(`/category`, {
    method: "POST",
    data,
  });
}
export async function updateCategory(id, data) {
  return request(`/category/update-user/${id}`, {
    method: "PUT",
    data,
  });
}
export async function deleteCategory(id) {
  return request(`/category/delete-user/${id}`, {
    method: "PUT",
  });
}
export async function unDeleteCategory(id) {
  return request(`/category/un-delete-user/${id}`, {
    method: "PUT",
  });
}

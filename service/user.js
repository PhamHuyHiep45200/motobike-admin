import request from ".";

export async function getAllUser() {
  return request(`/user`, {
    method: "GET",
  });
}
export async function createUser(data) {
  return request(`/user`, {
    method: "POST",
    data
  });
}
export async function updateUser(id,data) {
  return request(`/user/update-user/${id}`, {
    method: "PUT",
    data
  });
}
export async function deleteUser(id) {
  return request(`/user/delete-user/${id}`, {
    method: "PUT",
  });
}
export async function unDeleteUser(id) {
  return request(`/user/un-delete-user/${id}`, {
    method: "PUT",
  });
}
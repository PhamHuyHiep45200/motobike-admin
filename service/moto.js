import request from ".";

export async function getAllMoto() {
  return request(`/moto`, {
    method: "GET",
  });
}
export async function createMoto(data) {
  return request(`/moto`, {
    method: "POST",
    data,
  });
}
export async function updateMoto(id, data) {
  return request(`/moto/${id}`, {
    method: "PUT",
    data,
  });
}
export async function deleteMoto(id) {
  return request(`/moto/delete/${id}`, {
    method: "PUT",
  });
}
export async function unDeleteMoto(id) {
  return request(`/moto/un-delete/${id}`, {
    method: "PUT",
  });
}

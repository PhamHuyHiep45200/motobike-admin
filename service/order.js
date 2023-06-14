import request from ".";

export async function getAllOrder() {
  return request(`/order`, {
    method: "GET",
  });
}
export async function updateOrder(id, data) {
  return request(`/order/${id}`, {
    method: "PUT",
    data,
  });
}

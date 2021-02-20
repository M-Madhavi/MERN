import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: orderData })
  })
    .then(reponse => {
      return Response.json();
    })
    .catch(err => console.log(err));
};


//get all orders
export const getOrders = (userId) =>{
  return fetch(`${API}/order/all/${userId}`,{
    method:"GET"
  })
  .then(response =>{
    return response.json()

  })
  .catch(err => console.log(err) )
}


//get order status
export const getOrderStatus
 = (orderId) => {
  return fetch(`${API}/order/status/${orderId}`,{
    method:"GET",
  })
  .then(response =>{
    return response.json()

  })
  .catch(err => console.log(err) )
}




//update a Order
export const updateOrder = (orderId,userId,token,order) =>{
  return fetch(`${API}/order/${orderId}/status/${userId}`,{
    method:"PUT",
    headers:{
      Accept:"appliaction/json",
      Authorization:`Bearer ${token}`
    },
    body:order

  })
  .then(response =>{
    return response.json()

  })
  .catch(err => console.log(err) )
}

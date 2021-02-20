import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getOrders, updateOrder,getOrderStatus,createOrder } from "../core/helper/orderHelper";
import { isAuthenticated } from "../auth/helper/index";

const AddOrder = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    count: "",
    price: "",
    products: [],
    category: "",
    loading: false,
    error: "",
    createdOrder: "",
    getaRedirect: false
  });

  const {
    name,
    price,
    stock,
    products,
    
    loading,
    error,
    createdOrder,
    getaRedirect
  } = values;

  const preload = () => {
    getOrders().then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, products: data });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createOrder(user._id, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          price: "",
          loading: false,
          createdOrder: data.name
        });
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "name" ? event.target.files[0] : event.target.value;
    // formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdOrder ? "" : "none" }}
    >
      <h4>{createdOrder} created successfully</h4>
    </div>
  );
  const warningMessage = () => {
    if(error){
      return <h4 className ="text-danger"> Failed to create order</h4>
    }
  }


  const createOrderForm = () => (
    <form>
      <span>Post Order</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("name")}
            name="name"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {products &&
            products.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Order
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
    
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          
          {createOrderForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddOrder;

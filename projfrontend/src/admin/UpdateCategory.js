import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, getCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory = ({match}) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdCategory: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    name,
    categories,
    category,
    loading,
    error,
    createdCategory,
    getaRedirect,
    formData
  } = values;

  const preload = (categoryId) => {
   getCategory(categoryId).then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories()

        setValues({
            
             ...values, 
             name:data.name,
             category:data.category._id
             
             });
      }
    });
  };

    const preloadCategories = () =>{
      getCategories().then(data =>{
          if(data.error){
            setValues({ ...values, error: data.error });
  
          }else{
              setValues({
                categories:data

              })
          }
      })
    }
   
  

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
UpdateCategory(match.params.categoryId,user._id, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          loading: false,
          createdCategory: data.name
        });
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "name" ? event.target.files[0] : event.target.value;
    
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdCategory ? "" : "none" }}
    >
      <h4>{createdCategory} Updated successfully</h4>
    </div>
  );
  const warningMessage = () => {
    if(error){
      return <h4 className ="text-danger"> Failed to Update Category</h4>
    }
  }


  const createCategoryForm = () => (
    <form>
     
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
     
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
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
        Update Category
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
          {createCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;

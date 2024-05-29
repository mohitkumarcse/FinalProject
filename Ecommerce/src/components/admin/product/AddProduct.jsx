import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [productInput, setProductInput] = useState({
    category_id: "",
    product_name: "",
    product_slug: "",
    description: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    selling_price: "",
    original_price: "",
    product_qty: "",
    product_brand: "",
    error_list: [],
  });
  const [picture, setPicture] = useState(null);
  const [allCheckbox, setAllCheckbox] = useState({
    popular: false,
    featured: false,
    status: false,
  });

  useEffect(() => {
    axios.get(`all-category`).then((res) => {
      if (res.data.statusCode === 200) {
        setCategoryList(res.data.category_list);
      }
    });
  }, []);

  const handleInput = (e) => {
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const handleCheckbox = (e) => {
    setAllCheckbox({ ...allCheckbox, [e.target.name]: e.target.checked });
  };

  const productSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (picture != null) {
      formData.append("image", picture.image);
    }

    formData.append("category_id", productInput.category_id);
    formData.append("product_name", productInput.product_name);
    formData.append("product_slug", productInput.product_slug);
    formData.append("description", productInput.description);
    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keywords", productInput.meta_keywords);
    formData.append("meta_description", productInput.meta_description);
    formData.append("selling_price", productInput.selling_price);
    formData.append("original_price", productInput.original_price);
    formData.append("product_brand", productInput.product_brand);
    formData.append("product_qty", productInput.product_qty);
    formData.append("popular", allCheckbox.popular ? 1 : 0);
    formData.append("featured", allCheckbox.featured ? 1 : 0);
    formData.append("status", allCheckbox.status ? 1 : 0);

    axios.post(`store-product`, formData).then((res) => {
      if (res.data.statusCode === 200) {
        Swal.fire("Success", res.data.message, "success");
      } else if (res.data.statusCode === 422) {
        setProductInput({
          ...productInput,
          error_list: res.data.validation_error,
        });
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="card mb-4">
        <div className="card-header">
          <h4>
            Add Product
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              Back
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={productSubmit}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="seo-tags-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seo-tags"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  SEO Tags
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="other-details-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#other-details"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  Other Details
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane card-body border fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabIndex="0"
              >
                <div className="form-group mb-3">
                  <label>Select Category</label>
                  <select
                    name="category_id"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="0">Select category</option>
                    {categoryList.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="product_slug"
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {productInput.error_list.product_slug}
                  </span>
                </div>

                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="product_name"
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {productInput.error_list.product_name}
                  </span>
                </div>

                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    type="text"
                    name="description"
                    onChange={handleInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="seo-tags"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabIndex="0"
              >
                <div className="form-group mb-3">
                  <label>Meta Title</label>
                  <input
                    type="text"
                    name="meta_title"
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {productInput.error_list.meta_title}
                  </span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keywords</label>
                  <input
                    type="text"
                    name="meta_keywords"
                    onChange={handleInput}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <input
                    type="text"
                    name="meta_description"
                    onChange={handleInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div
                className="tab-pane card-body border fade"
                id="other-details"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabIndex="0"
              >
                <div className="row">
                  <div className="col-md-4 form-group mb-3">
                    <label>Selling Price</label>
                    <input
                      type="text"
                      name="selling_price"
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {productInput.error_list.selling_price}
                    </span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Original Price</label>
                    <input
                      type="text"
                      name="original_price"
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {productInput.error_list.original_price}
                    </span>
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="product_qty"
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {productInput.error_list.product_qty}
                    </span>
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="product_brand"
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {productInput.error_list.product_brand}
                    </span>
                  </div>

                  <div className="col-md-8 form-group mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {productInput.error_list.image}
                    </span>
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Popular (checked-shown)</label>
                    <input
                      type="checkbox"
                      name="popular"
                      onChange={handleCheckbox}
                      checked={allCheckbox.popular}
                      className="w-50 h-50"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Featured (checked-shown)</label>
                    <input
                      type="checkbox"
                      name="featured"
                      onChange={handleCheckbox}
                      checked={allCheckbox.featured}
                      className="w-50 h-50"
                    />
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Status</label>
                    <input
                      type="checkbox"
                      name="status"
                      onChange={handleCheckbox}
                      checked={allCheckbox.status}
                      className="w-50 h-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary float-end">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

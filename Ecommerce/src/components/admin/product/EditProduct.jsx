import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditProduct = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [error, setError] = useState({});
  const [productInput, setProductInput] = useState({});
  const [picture, setPicture] = useState([]);
  const [allCheckbox, setAllCheckbox] = useState({
    popular: false,
    featured: false,
    status: false,
  });

  const { id } = useParams();

  useEffect(() => {
    axios.get(`all-category`).then((res) => {
      if (res.data.statusCode === 200) {
        setCategoryList(res.data.category_list);
      }
    });

    axios.post(`edit-product/${id}`).then((res) => {
      if (res.data.statusCode === 200) {
        setProductInput(res.data.product_list_by_id);
        setAllCheckbox(res.data.product_list_by_id);
      }
    });
  }, [id]);

  const handleInput = (e) => {
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const handleCheckbox = (e) => {
    setAllCheckbox({ ...allCheckbox, [e.target.name]: e.target.checked });
  };

  const updateProduct = (e) => {
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

    axios.post(`update-product/${id}`, formData).then((res) => {
      if (res.data.statusCode === 200) {
        Swal.fire("Success", res.data.message, "success");
      } else if (res.data.statusCode === 422) {
        setError(res.data.validation_error);
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="card mb-4">
        <div className="card-header">
          <h4>
            Edit Product
            <Link
              to="/admin/view-product"
              className="btn btn-primary btn-sm float-end"
            >
              view product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateProduct}>
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
                className="tab-pane card-body border fade show active "
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
                    value={productInput.category_id || ""}
                    className="form-control"
                  >
                    <option value="0">select category</option>

                    {categoryList.map((item, index) => {
                      return (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="product_slug"
                    onChange={handleInput}
                    value={productInput.product_slug || ""}
                    className="form-control"
                  />
                  <span className="text-danger">{error.product_slug}</span>
                </div>

                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="product_name"
                    onChange={handleInput}
                    value={productInput.product_name || ""}
                    className="form-control"
                  />
                  <span className="text-danger">{error.product_name}</span>
                </div>

                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    type="text"
                    name="description"
                    onChange={handleInput}
                    value={productInput.description || ""}
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
                    value={productInput.meta_title || ""}
                    className="form-control"
                  />
                  <span className="text-danger">{error.meta_title}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keywords</label>
                  <input
                    type="text"
                    name="meta_keywords"
                    onChange={handleInput}
                    value={productInput.meta_keywords || ""}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <input
                    type="text"
                    name="meta_description"
                    onChange={handleInput}
                    value={productInput.meta_description || ""}
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
                      value={productInput.selling_price || ""}
                      className="form-control"
                    />
                    <span className="text-danger">{error.selling_price}</span>
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Original Price</label>
                    <input
                      type="text"
                      name="original_price"
                      onChange={handleInput}
                      value={productInput.original_price || ""}
                      className="form-control"
                    />
                    <span className="text-danger">{error.original_price}</span>
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="product_qty"
                      onChange={handleInput}
                      value={productInput.product_qty || ""}
                      className="form-control"
                    />
                    <span className="text-danger">{error.product_qty}</span>
                  </div>

                  <div className="col-md-4 form-group mb-3">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="product_brand"
                      onChange={handleInput}
                      value={productInput.product_brand || ""}
                      className="form-control"
                    />
                    <span className="text-danger">{error.product_brand}</span>
                  </div>

                  <div className="col-md-8 form-group mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleImage}
                      // value={productInput.image || ""}
                      className="form-control"
                    />
                    <img
                      src={`http://127.0.0.1:8000/uploads/product/${productInput.image}`}
                      width="60px"
                      height="40px"
                    />
                    {/* <span className="text-danger">
                      {productInput.error_list.image}
                    </span> */}
                  </div>
                  <div className="col-md-4 form-group mb-3">
                    <label>Popular (checked-shown)</label>
                    <input
                      type="checkbox"
                      name="popular"
                      onChange={handleCheckbox}
                      checked={allCheckbox.popular}
                      // value={productInput.popular || ""}
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
                      value={productInput.featured === 1 ? "checked" : ""}
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
                      // value={productInput.status === 1 ? "checked" : ""}
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

export default EditProduct;

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const AddCategory = () => {
  const [category, setCategory] = useState({
    slug: "",
    name: "",
    description: "",
    status: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    error_list: [],
  });

  const categorySubmitForm = (event) => {
    event.preventDefault();
    const data = {
      slug: category.slug,
      name: category.name,
      description: category.description,
      status: category.status ? 1 : 0, // Convert boolean to 0 or 1
      meta_title: category.meta_title,
      meta_keywords: category.meta_keywords,
      meta_description: category.meta_description,
    };

    axios.post(`add-category`, data).then((res) => {
      if (res.data.statusCode === 200) {
        Swal.fire("Success", res.data.message, "success");
        // document.getElementById("CATEGORY_FORM").reset();
      } else if (res.data.statusCode === 400) {
        setCategory({ ...category, error_list: res.data.validation_errors });
      }
    });
  };

  const handleInput = (e) => {
    e.preventDefault();
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  let display_errors = [];
  if (category.error_list) {
    display_errors = [
      category.error_list.name,
      category.error_list.slug,
      category.error_list.meta_title,
    ];
  }

  console.log(display_errors);

  return (
    <div className="container-fluid">
      <h1 className="mt-4">Category</h1>

      {display_errors.map((item, index) => (
        <p key={index}>{item}</p>
      ))}

      <form onSubmit={categorySubmitForm} id="CATEGORY_FORM">
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
              <label>Slug</label>
              <input
                type="text"
                name="slug"
                onChange={handleInput}
                value={category.slug}
                className="form-control"
              />
              {/* <span className="error">{category.error_list.slug}</span> */}
            </div>

            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInput}
                value={category.name}
                className="form-control"
              />
              {/* <span className="error">{category.error_list.name}</span> */}
            </div>

            <div className="form-group mb-3">
              <label>Description</label>
              <input
                type="text"
                onChange={handleInput}
                value={category.description}
                name="description"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Status</label>
              <input
                type="checkbox"
                onChange={handleInput}
                value={category.status}
                name="status"
              />{" "}
              0 for shown and 1 for hide
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
                value={category.meta_title}
                onChange={handleInput}
                className="form-control"
              />
              {/* <span className="error">{category.error_list.meta_title}</span> */}
            </div>
            <div className="form-group mb-3">
              <label>Meta Keywords</label>
              <input
                type="text"
                name="meta_keywords"
                value={category.meta_keywords}
                onChange={handleInput}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label>Meta Description</label>
              <input
                type="text"
                name="meta_description"
                value={category.meta_description}
                onChange={handleInput}
                className="form-control"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary float-end">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategory;

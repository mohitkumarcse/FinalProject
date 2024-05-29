import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditCategory = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [error, setError] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`edit-category/${id}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setCategory(res.data.category_list_by_id);
        }
        setLoading(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching category:", error);
        setLoading(false);
      });
  }, [id]);

  const updateCategory = (e) => {
    e.preventDefault();
    const data = category;

    axios.post(`update-category/${id}`, data).then((res) => {
      if (res.data.statusCode === 200) {
        Swal.fire("Success", res.data.message, "success");
        setError([]);
      } else if (res.data.statusCode === 422) {
        setError(res.data.validation_errors);
      }
    });
  };

  const handleInput = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <h4>Loading Category .....</h4>;
  }

  return (
    <div className="container-fluid">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            Edit Category
            <Link
              to="/admin/view-category"
              className="btn btn-primary btn-sm float-end"
            >
              Back
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={updateCategory}>
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
                    value={category?.slug || ""}
                    className="form-control"
                  />
                  <span className="text-danger">{error.slug}</span>
                </div>

                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={category.name || ""}
                    className="form-control"
                  />
                  <span className="text-danger">{error.name}</span>
                </div>

                <div className="form-group mb-3">
                  <label>Description</label>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={category.description || ""}
                    name="description"
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Status</label>
                  <input
                    type="checkbox"
                    onChange={handleInput}
                    value={category.status || ""}
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
                    value={category.meta_title || ""}
                    onChange={handleInput}
                    className="form-control"
                  />
                  <span className="text-danger">{error.meta_title}</span>
                </div>
                <div className="form-group mb-3">
                  <label>Meta Keywords</label>
                  <input
                    type="text"
                    name="meta_keywords"
                    value={category.meta_keywords || ""}
                    onChange={handleInput}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Meta Description</label>
                  <input
                    type="text"
                    name="meta_description"
                    value={category.meta_description || ""}
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
      </div>
    </div>
  );
};

export default EditCategory;

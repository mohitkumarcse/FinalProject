import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ViewCategory = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios
      .get("view-category")
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) {
          setCategoryList(res.data.category_list);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteCategory = (e, id) => {
    e.preventDefault();
    const thisclicked = e.currentTarget;
    thisclicked.innerText = "Deleting..";

    axios.post(`delete-category/${id}`).then((res) => {
      if (res.data.statusCode === 200) {
        Swal.fire("Success", res.data.message, "success");
        thisclicked.closest("tr").remove();
      }
    });
  };

  let VIEW_CATEGORY_HTML_TABLE = "";

  if (loading) {
    return <h4>Loading Category .....</h4>;
  } else if (categoryList && categoryList.length > 0) {
    VIEW_CATEGORY_HTML_TABLE = categoryList.map((category) => {
      return (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{category.slug}</td>
          <td>{category.status}</td>
          <td>
            <Link
              to={`/admin/edit-category/${category.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              onClick={(e) => deleteCategory(e, category.id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  } else {
    VIEW_CATEGORY_HTML_TABLE = <p>No Record Found</p>;
  }

  return (
    <div className="container-fluid">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            View Category
            <Link
              to="/admin/add-category"
              className="btn btn-primary btn-sm float-end"
            >
              Add Category
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{VIEW_CATEGORY_HTML_TABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;

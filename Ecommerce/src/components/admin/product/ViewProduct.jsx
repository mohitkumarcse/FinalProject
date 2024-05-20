import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ViewProduct = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`view-product`).then((res) => {
      if (res.data.statusCode === 200) {
        setProductList(res.data.product_list);
        setLoading(false);
      }
      if (res.data.statusCode === 404) {
        setProductList(res.data.product_list);
      }
    });
  }, []);

  const deleteProductById = (e, product_id) => {
    e.preventDefault();

    const thisclicked = e.currentTarget;
    thisclicked.innerText = "Deleting...";

    axios.post(`delete-product/${product_id}`).then((res) => {
      if (res.data.statusCode === 200) {
        Swal.fire("Success", res.data.message, "success");
        thisclicked.closest("tr").remove();
      } else if (res.data.statusCode === 404) {
        Swal.fire("Success", res.data.message, "success");
      }
    });
  };

  let VIEW_PRODUCT_HTML_TABLE = "";

  if (loading) {
    return <h4>Product Loading ...</h4>;
  } else {
    if (productList.length > 0) {
      VIEW_PRODUCT_HTML_TABLE = productList.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.category.name}</td>
            <td>{item.product_name}</td>
            <td>{item.selling_price}</td>
            <td>
              <img
                src={`http://127.0.0.1:8000/uploads/product/${item.image}`}
                width="60px"
                height="40px"
              />
            </td>
            <td>
              <Link
                to={`/admin/edit-product/${item.id}`}
                className="btn btn-success btn-sm"
              >
                Edit
              </Link>
            </td>
            <td>
              <button
                type="button"
                onClick={(e) => deleteProductById(e, item.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    } else {
      VIEW_PRODUCT_HTML_TABLE = "No Record Found";
    }
  }

  return (
    <div className="container-fluid">
      <div className="card mt-4">
        <div className="card-header">
          <h4>
            View Product
            <Link
              to="/admin/add-product"
              className="btn btn-primary btn-sm float-end"
            >
              Add Product
            </Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Product Name</th>
                <th>Selling Price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{VIEW_PRODUCT_HTML_TABLE}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

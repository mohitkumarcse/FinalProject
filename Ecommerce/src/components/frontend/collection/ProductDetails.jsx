import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { category } = useParams();
  const { product } = useParams();

  useEffect(() => {
    axios.get(`product-details/${category}/${product}`).then((res) => {
      if (res.data.statusCode === 200) {
        setProductDetails(res.data.product_data);
      }
      setLoading(false);
    });
  }, [category, product]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((previousCount) => previousCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((previousCount) => previousCount + 1);
    }
  };

  const addToCart = (e) => {
    e.preventDefault();

    let data = {
      product_id: productDetails.id,
      product_qty: quantity,
    };

    axios.post(`add-to-cart`, data).then((res) => {
      if (res.data.statusCode === 401) {
        Swal.fire("Error", res.data.message, "error");
      } else if (res.data.statusCode === 201) {
        Swal.fire("Success", res.data.message, "success");
      } else if (res.data.statusCode === 409) {
        Swal.fire("Error", res.data.message, "error");
      }
    });
  };

  if (loading) {
    return <h4>Product Detail Loading ....</h4>;
  } else {
    var avail_stock = "";

    if (productDetails.product_qty > 0) {
      avail_stock = (
        <div>
          <label className="btn-sm btn-success px-4 mt-2">In Stock</label>

          <div className="row">
            <div className="col-md-3 mt-3">
              <div className="input-group">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="input-group-text"
                >
                  -
                </button>

                <div className="form-control text-center">{quantity}</div>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="input-group-text"
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-3 mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      avail_stock = <div>Out Of Sell</div>;
    }
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Collection / category /{productDetails.product_name}</h6>
        </div>
      </div>

      <div className="py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 border-end">
              <img src="" alt="Product Image" className="w-100" />
            </div>
            <div className="col-md-8">
              <h4>
                {productDetails.product_name}
                <span className="float-end  btn-sm btn btn-danger badge-pil">
                  {productDetails.product_brand}
                </span>
              </h4>
              <p>{productDetails.description}</p>
              <h4 className="mb-1">
                Rs:{productDetails.selling_price}{" "}
                <s className="ms-2">Rs: {productDetails.original_price}</s>
              </h4>
              {avail_stock}
              <button type="button" className="btn btn-danger mt-3">
                Add to Whishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

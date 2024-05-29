import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ViewProduct = () => {
  const [productList, setProductList] = useState([]);
  const [categorytList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { slug } = useParams();

  useEffect(() => {
    axios.get(`get-product/${slug}`).then((res) => {
      if (res.data.statusCode === 200) {
        console.log(res.data.product_data);
        setProductList(res.data.product_data);
        setCategoryList(res.data.category_data);
      }
      setLoading(false);
    });
  }, [slug]);

  let showProductList = "";

  if (loading) {
    return <h4>Product Loading .....</h4>;
  } else {
    if (productList.length >= 0) {
      showProductList = productList.map((product, index) => {
        return (
          <div className="col-md-6" key={index}>
            <div className="card">
              <Link
                to={`/collection/${product.category.slug}/${product.product_slug}`}
              >
                <img
                  src={`http://127.0.0.1:8000/uploads/product/${product.image}`}
                  className="w-100"
                  alt={product.name}
                />
              </Link>

              <div className="card-body">
                {/* <Link to={`/collection/${product.product_name}`}> */}
                <h5>{product.product_name}</h5>
                {/* </Link> */}
              </div>
            </div>
          </div>
        );
      });
    } else {
      showProductList = (
        <div className="col-md-12">
          <h4>No Product Avilable for {categorytList.name}</h4>
        </div>
      );
    }
  }
  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Collection / {categorytList.name}</h6>
        </div>
      </div>

      <div className="py-3">
        <div className="container">
          <div className="row">{showProductList}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;

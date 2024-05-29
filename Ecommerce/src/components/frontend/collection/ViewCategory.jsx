import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewCategory = () => {
  const [showCategory, setShowCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`get-category`).then((res) => {
      if (res.data.statusCode === 200) {
        setShowCategory(res.data.catelory_list);
      }
      setLoading(false);
    });
  }, []);

  let showCategoryList = "";

  if (loading) {
    return <h4>Category Loading .....</h4>;
  } else {
    showCategoryList = showCategory.map((category, index) => {
      return (
        <div className="col-md-6 mt-5" key={index}>
          <div className="card">
            <Link to="">
              {/* <img
                // src={`http://127.0.0.1:8000/uploads/product/`}
                className="w-100"
                alt={category.name}
              /> */}
            </Link>

            <div className="card-body">
              <Link to={`/collection/${category.slug}`}>
                <h5>{category.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Category Page</h6>
        </div>
      </div>

      <div className="py-3">
        <div className="container">
          <div className="row">{showCategoryList}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;

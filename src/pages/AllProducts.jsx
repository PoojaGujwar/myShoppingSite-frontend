import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../components/Header";

import useFetch from "../useFetch";
import { useLocation } from "react-router-dom";

const AllProducts = () => {
  const { data, loading, error } = useFetch(
    `https://backend-product-omega.vercel.app/products`
  );

  const [fetchData, setFetchData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchTermFromUrl = searchParams.get("search") || "";
    setSearchTerm(searchTermFromUrl);
  }, [location]);

  const handleRadioBtn = (e) => {
    const {value, checked} = e.target;
    if(checked){
      setSelectedCategory((prevValue)=>[...prevValue, value]);
    }else{
      setSelectedCategory((prev)=>prev.filter((val)=>val !== value))
    }
  };

  const handleRatings = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedRating((prevValue) => [...prevValue, value]);
    } else {
      setSelectedRating((prev) => prev.filter((val) => val !== value));
    }
  };

 
  //     const filteredData = searchTerm
  //     ? data.filter((product) =>
  //         product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     : data;
  //     console.log(filteredData,"Filterd")
  //     setFetchData(filteredData);
  //   }
  // }, [data, setSearchTerm]);

  // useEffect(() => {
  //   if (selectedRating.length > 0) {
  //     const filteredProducts = data.filter((product) =>
  //       selectedRating.includes(String(product.rating))
  //     );
  //     setFetchData(filteredProducts);
  //   } else {
  //     setFetchData(data);
  //   }
  // }, [selectedRating, data]);

  const handleRangeChange = (e) => {
    const value = e.target.value;
    setSelectedPrice(value);
  };
  useEffect(() => {
    if (data) {
      let filteredData = data;

      if (searchTerm) {
        filteredData = filteredData.filter((product) =>
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory.length > 0) {
        filteredData = filteredData.filter(
          (product) => selectedCategory.includes(product.category)
        );
      }

      if (selectedRating.length > 0) {
        filteredData = filteredData.filter((product) =>
          selectedRating.includes(String(product.rating))
        );
      }

      if (selectedPrice) {
        filteredData = filteredData
          .filter((product) => product.price <= selectedPrice)
          .sort((a, b) => a.price - b.price);
      }

      setFetchData(filteredData);
    }
  }, [data, searchTerm, selectedCategory, selectedRating, selectedPrice]);

  const handleLikeToggle = async (id,productWishlist) => {
    const newWishlistStatus = !productWishlist
    try {
      const response = await fetch(
        `https://backend-product-omega.vercel.app/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isWishlist: newWishlistStatus }),
        }
      );
    
      setFetchData((prevData) =>
        prevData.map((product) =>
          product._id === id ? { ...product, isWishlist: newWishlistStatus } : product
        )
      );
      window.dispatchEvent(
        new Event(newWishlistStatus ?  "wishlistUpdated":"wishlistRemoved" )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearBtn = () => {
    setFetchData(data);
    setSelectedCategory([]);
    setSelectedRating([]);
    setSelectedPrice(0);
    setSearchTerm("");
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "gold" : "lightgray" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      <Header />
      <div className="py-3 container">
        <div className="row">
          <div className="col col-lg-3 ">
            <div className="mb-3 ">
              <label className="fw-bold fs-3">Filters</label>

              <button
                onClick={handleClearBtn}
                className="float-end btn btn-primary"
                style={{ position: "relative", right: "10px" }}
              >
                Clear
              </button>
            </div>
            <div className="mb-3">
              <label className="">Category</label>
              <br />
              <input
                type="checkbox"
                value="men"
                className="me-2"
                checked={selectedCategory.includes("men")}
                onChange={handleRadioBtn}
              />
              {""}
              Men
              <br />
              <input
                type="checkbox"
                
                value="women"
                className="me-2"
                checked={selectedCategory.includes("women")}
                onChange={handleRadioBtn}
              />{" "}
              Women
              <br />
              <input
                type="checkbox"
                value="kids"
                className="me-2"
                checked={selectedCategory.includes("kids")}
                onChange={handleRadioBtn}
              />{" "}
              Kids <br />
              <input
                type="checkbox"
                value="electronic"
                className="me-2"
                checked={selectedCategory.includes("electronic")}
                onChange={handleRadioBtn}
              />{" "}
              Electronics
              <br />
            </div>
            <br />

            <div className="mb-3">
              <label>Ratings</label>
              <br />
              <input
                type="checkbox"
                value={4}
                onChange={handleRatings}
                checked={selectedRating.includes("4")}
                className="me-2"
              />{" "}
              4 starts <br />
              <input
                type="checkbox"
                value={3}
                onChange={handleRatings}
                checked={selectedRating.includes("3")}
                className="me-2"
              />{" "}
              3 starts <br />
              <input
                type="checkbox"
                value={2}
                onChange={handleRatings}
                checked={selectedRating.includes("2")}
                className="me-2"
              />{" "}
              2 starts
              <br />
              <input
                type="checkbox"
                value={1}
                onChange={handleRatings}
                checked={selectedRating.includes("1")}
                className="me-2"
              />{" "}
              1 starts <br />
            </div>
            <div className="mb-3">
              <label>Sort by Price</label>
<br/>
              <input
                id="price-range"
                type="range"
                min="500"
                max="5000"
                step="100"
                value={selectedPrice}
                onChange={handleRangeChange}
                style={{ width: "50%" }}
              />  
              <span>{selectedPrice}</span>

              <br />
            </div>
          </div>

          <div className="col col-lg-9">
            <h1>Product List</h1>
            {loading && <p>Loading....</p>}
            {error && <p>{error}</p>}
            <div className="row">
              {fetchData?.map((product) => (
                <div className="col-lg-3 col-md-6 mb-3">
                  <div className="card w-100" style={{ height: "100%" }}>
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="img-fluid card-img-top "
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    <i
                      className={`bi ${
                        product.isWishlist ? "bi-heart-fill" : "bi-heart-fill"
                      }`}
                      onClick={() =>
                        handleLikeToggle(product._id,product.isWishlist)
                      }
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        fontSize: "20px",
                        color: product.isWishlist ? "red" : "white",
                        backgroundColor: "gray",
                        cursor: "pointer",
                        padding: "0rem 0.2rem",
                        borderRadius: "50%",
                      }}
                    ></i>

                    <div className="card-body py-3 text-center">
                      <small>{product.description.substring(0, 40)}...</small>
                      <p>Price: ₹{product.price}</p>
                      <p>
                        Rating: {renderStars(product.rating)} ({product.rating}
                        /5)
                      </p>
                      <a
                        href={`products/${product._id}`}
                        className="btn btn-primary my-3 btn-fluid"
                      >
                        View Product
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;

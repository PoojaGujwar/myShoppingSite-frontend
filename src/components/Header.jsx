import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useFetch from "../useFetch";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [totalLikes, setTotalLikes] = useState();

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchClick = () => {
    navigate(`/allProducts?search=${searchTerm}`);
    setSearchTerm('')
  };

  const { data } = useFetch(
    `https://backend-product-omega.vercel.app/products`
  );

  useEffect(() => {
    console.log(data)
    if (data ) {
      const likes = data.reduce(
        (acc, curr) => (curr.isWishlist ? (acc += 1) : acc),
        0
      );
      const totalCartItems = data.filter((p) => p.isCart).length;
      setTotalLikes(likes);
      setTotalCartItems(totalCartItems);
    }
  }, [data]);

  useEffect(() => {
    const incrementCartCount = () => setTotalCartItems((prev) => prev + 1);
    const decrementCartCount = () => setTotalCartItems((prev) => prev > 0 && prev - 1);
    const incrementWishlistCount = () => setTotalLikes((prev) => prev + 1);
    const decrementWishlistCount = () => setTotalLikes((prev) => prev>0 && prev - 1);
  
    
    window.addEventListener("cartUpdated", incrementCartCount);
    window.addEventListener("cartRemoved", decrementCartCount);
    window.addEventListener("wishlistUpdated", incrementWishlistCount);
    window.addEventListener("wishlistRemoved", decrementWishlistCount);
  

    return () => {
      window.removeEventListener("cartUpdated",incrementCartCount);
      window.removeEventListener("cartRemoved", decrementCartCount);
      window.removeEventListener("wishlistUpdated", incrementWishlistCount);
      window.removeEventListener("wishlistRemoved", decrementWishlistCount);
    };
  }, []);
  

  return (
    <header>
        <nav class="navbar navbar-expand-lg">
          <div className="container ">
            <a class="navbar-brand me-5" href="/">
              myShoppingSite
            </a>

            <div className="collapse navbar-collapse">
                <form className="d-flex col-lg-8">
                  <input
                    className="form-control shadow-sm "
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchTerm}
                    value={searchTerm}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleSearchClick}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </form>
                </div>
            
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse justify-content-end col-md-3"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/wishlist">
                    <div className="position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalLikes}
                      </span>
                      <i class="bi bi-heart" style={{ fontSize: "20px" }}></i>
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    <div className="position-relative">
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalCartItems}
                      </span>
                      <i class="bi bi-cart" style={{ fontSize: "20px" }}></i>
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    <i
                      class="bi bi-person-square"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </NavLink>
                </li>
              </ul>
          </div>
          </div>
         
        </nav>
    </header>
  );
};
export default Header;

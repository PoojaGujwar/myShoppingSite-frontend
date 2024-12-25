import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Carts = () => {
  const [fetchData, setFetchData] = useState([]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccussMessage] = useState("");
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `https://backend-product-omega.vercel.app/products`
  );
  

  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
   
  }, [data]);



  const handleSubmit = async (e, productId) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://backend-product-omega.vercel.app/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isWishlist: true }),
        }
      );
      if (!response.ok) {
        throw new Error ("Failed to add Movie");
      }
      const data = await response.json();
      if (data) {
        setMessage("Product added to cart successfully");
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.log(error, "inWishlist");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };
  const handleRemoveToCart = async (e, productId) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://backend-product-omega.vercel.app/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isCart: false }),
        }
      );
      if (!response.ok) {
        throw new Error ("Failed to add Movie");
      }
      setMessage("Product removed successfully");
      setFetchData((prevData) =>
        prevData.map((item) =>
          item._id === productId ? { ...item, isCart: false } : item
        )
      );
      window.dispatchEvent(new Event("cartRemoved"));
    } catch (error) {
      console.log(error, "Error in cart adding");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };
  const handleIncrement = async (e, productId) => {
    e.preventDefault();
    try {
      const product = fetchData.find((item) => item._id === productId);
      const newQuantity = (product?.quantity || 0) + 1;

      const response = await fetch(
        `https://backend-product-omega.vercel.app/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isCart: true, quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error ("Failed to update product quantity");
      }

      setFetchData((prevData) =>
        prevData.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      setMessage("Quantity increased successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };
  const handleDecrement = async (e, productId) => {
    e.preventDefault();
    try {
      const product = fetchData.find((item) => item._id === productId);
      const newQuantity = Math.max((product?.quantity || 1) - 1, 0);

      if (newQuantity === 0) {
        setMessage("Cannot decrease below 0");
        return;
      }

      const response = await fetch(
        `https://backend-product-omega.vercel.app/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isCart: true, quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error  ("Failed to update product quantity");
      }

      setFetchData((prevData) =>
        prevData.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      setMessage("Quantity decreased successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const filterData = fetchData && fetchData.filter((p) => p.isCart);

  const totalPriceAndQuantity = filterData.reduce(
    (acc, curr) => {
      acc.total += curr.price * curr.quantity;
      acc.totalItem += curr.quantity;
      return acc;
    },
    { total: 0, totalItem: 0 }
  );

  const handleCheckoutBtn = () => {
    navigate(`/checkout`);
  };


  const handleContinueBtn = () => {
    setTimeout(() => {
      navigate("/allProducts");
    }, 2000);
  };

  setTimeout(() => {
    setSuccussMessage("");
  }, 1000);



  return (
    <>
      <Header />
      <div className="container py-3 ">
      {message && <p className="alert alert-info">{message}</p>}
        {loading  ? <p>Loading...</p>:
        error  ? <p>{error}</p> : 
        filterData && filterData.length > 0 ? (
          <>
            <h1>Cart Items</h1>
            <div className="row">
              <div className="col-lg-8 col-md-12 mb-3">
                {filterData?.map((product) => (
                  <div className="col-lg-12">
                  <div
                    className="card w-100 d-flex flex-row mb-3"
                    key={product.id}
                    style={{ height: "100%" }}
                  >
                    <img
                      className="img-fluid "
                      src={product.imageUrl}
                      alt="Cards"
                      style={{ width: "250px", height:"100%", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                      <p className="fs-5">{product.title}</p>
                      <p className="card-text fw-bold fs-3">
                        ₹ {product.price}
                      </p>

                      <div className="d-flex align-items-center gap-2 mb-3">
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => handleIncrement(e, product._id)}
                        >
                          +
                        </button>
                        <label>Quantity: {product.quantity}</label>
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => handleDecrement(e, product._id)}
                        >
                          -
                        </button>
                      </div>
                      <div className="d-flex gap-2 py-3 align-items-center">
                        <form onSubmit={(e) => handleSubmit(e, product._id)}>
                          <button className="btn btn-primary" disabled={product.isWishlist}>
                           <i class="bi bi-heart"></i> Add to Wishlist
                          </button>
                        </form>
                        <form
                          onSubmit={(e) => handleRemoveToCart(e, product._id)}
                        >
                          <button className="btn btn-danger">
                            Remove from Cart
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  </div>
                ))}
                </div>
             
              <div className="col-lg-4">
                <div className="card p-3 mb-3">
                  <h3 className="card-title">Cart Summary</h3>
                  <ul className="list-group list-group-flush mb-5">
                    {filterData.map((product) => (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={product._id}
                      >
                        <span>
                          {product.title} (x{product.quantity})
                        </span>
                        <span>₹ {product.price * product.quantity}</span>
                      </li>
                    ))}
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        Total (items: {totalPriceAndQuantity.totalItem})
                      </span>
                      <span>₹{totalPriceAndQuantity.total}</span>
                    </li>
                   
                      <button
                        className="btn btn-primary"
                        onClick={handleCheckoutBtn}
                      >
                        PLACE ORDER
                        </button>
                    
                  </ul>
                </div>
                
              </div>
            </div>
          </>
        )  :
        
          <div>
          <h1>Your Cart is Empty</h1>
          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}
          <button onClick={handleContinueBtn} className="btn btn-primary">
            Continue Shopping
          </button>
       
        
        </div>
}
        
      </div>
    </>
  );
};
export default Carts;

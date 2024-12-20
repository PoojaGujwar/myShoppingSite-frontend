import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import Header from "../components/Header";

const ProductDetails = () => {
  const { productId } = useParams();
  const [message, setMessage] = useState("");
  const [text, setText] = useState("Add to Wishlist")
  const { data, loading, error } = useFetch(
    `https://backend-product-omega.vercel.app/products/${productId}`
  );
  const handleAddToWishlist = async (e, productId) => {
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
        throw new Error("Failed to add Movie");
      }
      const data = await response.json();
      if (data) {
        setMessage("Product added to wishlist successfully");
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.log(error, "inWishlist");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://backend-product-omega.vercel.app/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isCart: true, quantity: +1 }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add Movie");
      }
      const data = await response.json();
      if (data) {
        setMessage("Product added to cart successfully");
      }
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error, "Error in cart adding");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
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
      <div className="container py-3">
        <h1 className="mb-3">Product Details</h1>
        {loading && <p>Loading..</p>}
        {error && <p>{error}</p>}
        {message && <p className="alert alert-info">{message}</p>}

        {data && (
          <div className="card" style={{ "max-width": "840px" }}>
            <div className="row">
              <div className="col-md-4">
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="img-fluid rounded-starts"
                  style={{ width: "100%",height:"100%"}}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title">{data.description}</h2>
                  <p className="card-text">Price: ₹ {data.price}</p>
                  <p className="card-text">Rating: {renderStars(data.rating)}({data.rating}/5)</p>
                  <div className="d-grid gap-2 col-md-12 d-md-flex ">
                    <form onSubmit={(e) => handleAddToCart(e, data._id)}>
                      <button type="submit" className="btn btn-primary">
                        Add to Cart
                      </button>
                    </form>
                    <form onSubmit={(e) => handleAddToWishlist(e, data._id)}>
                      <button className="btn btn-secondary" style={{backgroundColor:text ==="Add to Wishlist"?"gray":"Red"}} type="submit" onClick={(e)=>setText(text === "Add to Wishlist"?"Remove from Wishlist":"Add to Wishlist")}>
                        <i className="bi bi-heart"></i> {text}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ProductDetails;

import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WishList = () => {
  const [fetchData, setFetchData] = useState();
  const [message, setMessage] = useState("");

  const { data, loading, error } = useFetch(
    "https://backend-product-omega.vercel.app/products"
  );

  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
  }, [data]);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(
        `https://backend-product-omega.vercel.app/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isWishlist: false }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add Movie");
      }

      setFetchData((prevData) =>
        prevData.filter((product) => product._id !== productId)
      );
      setMessage(`Product removed successfully.`);
      window.dispatchEvent(new Event("wishlistRemoved"));
    } catch (error) {
      console.log(error, "inWishlist");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleAddToCart = async (e, productId) => {
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
      setMessage(`Product added to cart successfully.`);
      if (!response.ok) {
        throw new Error ("Failed to Add Cart");
      }
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error, "Error in cart adding");
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const selectedProduct =
    fetchData && fetchData.filter((product) => product.isWishlist);

  return (
    <>
    <Header/>
    <div className="container py-3">
      <h1>Wishlist Items</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {message && <p className="alert alert-info">{message}</p>}

      <div className="row">
        {selectedProduct?.map((product) => (
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card w-100" style={{height:"100%"  }} >
              <img
                src={product.imageUrl}  alt="Product"
                className="img-fluid card-img-top "
                style={{width:"100%", height: "100%" ,objectFit: "cover"}}
               
              />
              <div className="card-body" style={{textDecoration:"none"}}>
                <p className="card-title fs-3">{product.title} </p>
                <p className="card-text fs-6">Price: ₹{product.price}</p>

                <form onSubmit={(e) => handleAddToCart(e, product._id)}>
                  <button className="btn btn-primary col-12 mb-2">
                    Add to Cart
                  </button>
                </form>
                <button
                  onClick={(e) => handleRemoveItem(product._id)}
                  className="btn btn-danger col-12"
                >Remove from Wishlist{" "}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default WishList;

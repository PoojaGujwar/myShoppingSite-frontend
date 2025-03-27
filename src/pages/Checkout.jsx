import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams,Link } from "react-router-dom";
import useFetch from "../useFetch";
import AddressForm from "../components/AddressForm";

const Checkout = () => {
  const { productId } = useParams();
  const [message, setMessage] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [fetchNewData, setFetchNewData] = useState([])
  const [deliveryAddress, setDeliveryAddres] = useState()
  const [orederMessage, setOrederSuccessMessage] = useState('')
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "https://backend-product-omega.vercel.app/address"
  );
  const { data:orderData} = useFetch(
    `https://backend-product-omega.vercel.app/products`
  );


  useEffect(() => {
    if (data) {
      console.log(data);
      setFetchData(data);
    }
    if(orderData){
      setFetchNewData(orderData)
    }
  }, [data,orderData]);

  const filterData = fetchNewData ?.filter((product)=>product.isCart);
  const totalPriceAndQuantity = filterData.reduce(
    (acc, curr) => {
      acc.total += curr.price * curr.quantity;
      acc.totalItem += curr.quantity;
      return acc;
    },
    { total: 0, totalItem: 0 }
  );
  // const initialData = {
  //   firstName: "",
  //   lastName: "",
  //   phoneNumber: "",
  //   email: "",
  //   address: {
  //     address: "",
  //     state: "",
  //     zipCode: "",
  //     city: "",
  //   },
  //   author: productId,
  // };
  // const [formData, setFormData] = useState(initialData);
  // const [isAddNewAddressVisible, setIsAddNewAddressVisible] = useState(false);
  // const [editingAddressId, setEditingAddressId] = useState(null);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name in formData.address) {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       address: {
  //         ...prevState.address,
  //         [name]: value,
  //       },
  //     }));
  //   } else {
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };

  
  // //   setFormData((prevState) => ({
  // //     ...prevState,
  // //     address: [
  // //       ...prevState.address,
  // //       { address: "", state: "", zipCode: "", city: "" },
  // //     ],
  // //   }));
  // // };

  const handleRemoveAddress = async (e, addressId) => {
    console.log(addressId);
    e.preventDefault();
    try {
      const response = await fetch(
        `https://backend-product-omega.vercel.app/address/${addressId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      setFetchData((prevData) =>
        prevData.filter((product) => product._id !== addressId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeliveryMessage = async () => {
    console.log("Address")
    try {
      await Promise.all(
        filterData.map(async (product) => {
          const response = await fetch(
            `https://backend-product-omega.vercel.app/products/${product._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ isCart: false }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to update cart item");
          }
        })
      );
     
    } catch (error) {
      console.log(error);
    }finally{
      setTimeout(()=>{setMessage("")},1000)
    }
    if(deliveryAddress){
    setOrederSuccessMessage("Order Place Successfully")
    setTimeout(()=>{
navigate("/cart")

    },2000)
    }else{
      setMessage("Please Select one delivery address to proceed.")
    }
  };
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div className="container py-3 ms-5">
      {orederMessage && (<p className="alert alert-success">{orederMessage}</p>)}
        <h3 className="">Select Delivery Address: </h3>
        {message && (
          <p className="alert alert-success py-3 col-md-6">{message}</p>
        )}

        {loading && "Loading..."}
        {error && <p>{error}</p>}
        <div className="row">
          <div className="col-md-8">
          <ul className="list-group">
          {fetchData &&
            fetchData.length > 0 &&
            fetchData.map((product) => (
              <li className="list-group-item">
                <label>
                  <input type="radio" name="deliveryAddress" onChange={(e)=>setDeliveryAddres(product)}/>
                  <strong className="ms-2">{product.firstName}</strong>
                </label>
                <p className="ms-2">
                  <small>
                    {product.address.address} {product.address.city}
                  </small>
                  <br />
                  <small>
                    {product.address.city}, {product.address.state},{" "}
                    {product.address.zipCode}
                  </small>
                  <br />
                  <small>Mobile: {product.phoneNumber}</small>
                </p>
                <button onClick={(e) => handleRemoveAddress(e, product._id)} className="btn btn-danger me-3">
                  Remove
                </button>
                <Link to={`/addressForm?search=${product._id}`}
i                //  onClick={(e) => handleEditBtn(e, product._id)}
                  className="btn btn-info">
                  Edit
                </Link>
              </li>
            ))}
        </ul>
        <ul className="list-group mt-3">
          <li className="list-group-item">
            <NavLink
              
              to={"/addressForm"}
            >
              + Add New Address
            </NavLink>
          </li>
        </ul>
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
                          {product.name} (x{product.quantity})
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
                   
                        </ul>
                        {deliveryAddress && (
                        <ul className="list-group">
                    <li className="list-group-item">
                      <div>
                        <h5>Delivery Address</h5>
                        <p className="ms-2">
                  <small>
                    {deliveryAddress.address.address} {deliveryAddress.address.city}
                  </small>
                  <br />
                  <small>
                    {deliveryAddress.address.city}, {deliveryAddress.address.state},{" "}
                    {deliveryAddress.address.zipCode}
                  </small>name
                  <br />
                  <small>Mobile: {deliveryAddress.phoneNumber}</small>
                </p>
                      </div>
                    </li>
                  </ul>
                )}
                 <button
                        className="btn btn-primary my-3"
                      onClick={handleDeliveryMessage}
                      >
                        PLACE ORDER
                        </button>
                </div>
                
              </div>
        </div>
        
      </div>
    </div>
  );
};
export default Checkout;

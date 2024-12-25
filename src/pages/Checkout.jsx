import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";

const Checkout = () => {
  const { productId } = useParams();
  const [message, setMessage] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [fetchNewData, setFetchNewData] = useState([])
  const [deliveryAddress, setDeliveryAddres] = useState()
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
  const initialData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: {
      address: "",
      state: "",
      zipCode: "",
      city: "",
    },
    author: productId,
  };
  const [formData, setFormData] = useState(initialData);
  const [isAddNewAddressVisible, setIsAddNewAddressVisible] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // const handleAddAddress = () => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     address: [
  //       ...prevState.address,
  //       { address: "", state: "", zipCode: "", city: "" },
  //     ],
  //   }));
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingAddressId) {
        response = await fetch(
          `https://backend-product-omega.vercel.app/address/${editingAddressId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch(
          "https://backend-product-omega.vercel.app/address",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      }
      if (!response.ok) {
        throw new Error("Failed to save address");
      }
      setFormData(initialData);
      const data = await response.json();

      if (data) {
        setEditingAddressId(null);
        const updatedData = await fetch("https://backend-product-omega.vercel.app/address");
        const updatedAddresses = await updatedData.json();
        setFetchData(updatedAddresses);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };
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
  const handleEditBtn = (e, productId) => {
    console.log(productId);
    const addressToEdit = fetchData.find(
      (address) => address._id === productId
    );
    setFormData({
      firstName: addressToEdit.firstName,
      lastName: addressToEdit.lastName,
      phoneNumber: addressToEdit.phoneNumber,
      email: addressToEdit.email,
      address: addressToEdit.address,
      author: productId,
    });
    setEditingAddressId(productId);
    setIsAddNewAddressVisible(true);
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
    }
    navigate("/cart")
  };
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div className="container py-3 ms-5">
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
                <button onClick={(e) => handleEditBtn(e, product._id)} className="btn btn-info">
                  Edit
                </button>
              </li>
            ))}
        </ul>
        <ul className="list-group mt-3">
          <li className="list-group-item">
            <NavLink
              
              onClick={(e) =>
                setIsAddNewAddressVisible(!isAddNewAddressVisible)
              }
            >
              + Add New Address
            </NavLink>
          </li>
        </ul>

        {isAddNewAddressVisible && (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="col-md-8 mb-3">
                  <label htmlFor="firstName">First name: </label>
                  <input
                    type="text"
                    id="firtsName"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="First name.."
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-8 mb-3">
                  <label htmlFor="lastName">Last name: </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Last name."
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-8 mb-3">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="please enter 10 digit number"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-8 mb-3">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="xyz@gmail.com..."
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-8 mb-3">
                  <h5>Address</h5>
                  <div className="mb-3">
                    <label>Address: </label>
                    <textarea
                      name="address"
                      value={formData.address.address}
                      placeholder="Address.."
                      className="form-control"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="d-flex gap-3">
                    <div>
                      <label>City: </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.address.city}
                        placeholder="City.."
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label>State: </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.address.state}
                        placeholder="State.."
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Zip code: </label>
                      <input
                        type="number"
                        name="zipCode"
                        value={formData.address.zipCode}
                        placeholder="456001.."
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <button className="btn btn-secondary col-md-3 btn-lg mt-3">
                Save
              </button>
                </div>
              </div>
              
            </div>
          </form>
        )}
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

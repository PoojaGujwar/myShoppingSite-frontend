import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Checkout = () => {
  const { productId } = useParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const initialData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: [
      {
        address: "",
        state: "",
        zipCode: "",
        city: "",
      },
    ],

    author: productId,
  };
  const [formData, setFormData] = useState(initialData);
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name.startsWith("address")) {
      const updatedAddress = formData.address.map((addr, idx) =>
        idx === index ? { ...addr, [name.split(".")[1]]: value } : addr
      );
      setFormData((prevState) => ({
        ...prevState,
        address: updatedAddress,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddAddress = () => {
    setFormData((prevState) => ({
      ...prevState,
      address: [
        ...prevState.address,
        { address: "", state: "", zipCode: "", city: "" },
      ],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://backend-product-omega.vercel.app/address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error ("Failed to add address");
      }
      setFormData(initialData);
      const data = await response.json();
      if (data) {
        setMessage("Address added Successfully");
        const addressId = data.address[0]?._id;
        navigate(`/cart`, { state: { addressId: addressId } });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <div className="container py-3 ms-5">
        <h1 className="display-3">Add Address</h1>
        {message && (
          <p className="alert alert-success py-3 col-md-6">{message}</p>
        )}
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

              {formData.address.map((addr, index) => (
                <div key={index} className="border p-3 mb-3">
                  <h5>Address {index + 1}</h5>
                  <div className="mb-3">
                    <label>Address: </label>
                    <textarea
                      name="address.address"
                      value={addr.address}
                      placeholder="Address.."
                      className="form-control"
                      onChange={(e) => handleChange(e, index)}
                      required
                    ></textarea>
                  </div>
                  <div className="d-flex gap-3">
                    <div>
                      <label>City: </label>
                      <input
                        type="text"
                        name="address.city"
                        value={addr.city}
                        placeholder="City.."
                        className="form-control"
                        onChange={(e) => handleChange(e, index)}
                        required
                      />
                    </div>
                    <div>
                      <label>State: </label>
                      <input
                        type="text"
                        name="address.state"
                        value={addr.state}
                        placeholder="State.."
                        className="form-control"
                        onChange={(e) => handleChange(e, index)}
                        required
                      />
                    </div>
                    <div>
                      <label>Zip code: </label>
                      <input
                        type="number"
                        name="address.zipCode"
                        value={addr.zipCode}
                        placeholder="456001.."
                        className="form-control"
                        onChange={(e) => handleChange(e, index)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary col-md-5 btn-lg mt-3 me-2"
                onClick={handleAddAddress}
              >
                Add Another Address
              </button>

              <button className="btn btn-secondary col-md-3 btn-lg mt-3">
                Go to Cart
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Checkout;

import { useState,useParams, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import useFetch from "../useFetch";

export default function AddressForm(){
    const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [fetchData,setFetchData] = useState([])
  const [id,setEditId]= useState('')

  const { data, loading, error } = useFetch(
      "https://backend-product-omega.vercel.app/address"
    );
    useEffect(()=>{
        if(data){
            setFetchData(data)
        }
        const id = searchParams.get("search") || "";
        if(id){
            setEditId(id)
        }
        
    },[data,location])


 
  const [message, setMessage] = useState("");

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
        // author: productId,
      };
      const [formData, setFormData] = useState(initialData);
    //   const handleEditBtn = (e, productId) => {
    //     console.log(productId);
    //     const addressToEdit = fetchData.find(
    //       (address) => address._id === productId
    //     );
    //     setFormData({
    //       firstName: addressToEdit.firstName,
    //       lastName: addressToEdit.lastName,
    //       phoneNumber: addressToEdit.phoneNumber,
    //       email: addressToEdit.email,
    //       address: addressToEdit.address,
    //       author: productId,
    //     });
    //     setEditingAddressId(productId);
    //     setIsAddNewAddressVisible(true);
    //   };
    useEffect(()=>{ 
        if(id){
            const addressToEdit = fetchData?.find(
                (address) => address._id === id
              );
              console.log(addressToEdit)
              if(addressToEdit){
              setFormData({
                firstName: addressToEdit.firstName,
                lastName: addressToEdit.lastName,
                phoneNumber: addressToEdit.phoneNumber,
                email: addressToEdit.email,
                address: addressToEdit.address,
                author: id,
              });
            }
        }
      },[id,fetchData])
     
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
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (id) {
              response = await fetch(
                `https://backend-product-omega.vercel.app/address/${id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData),
                }
              );
            } else{
                response = await fetch(`https://backend-product-omega.vercel.app/address`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(formData)
                })
            }
            if (!response.ok) {
              throw new Error("Failed to save address");
            }
            setFormData(initialData);
            const data = await response.json();
      
            if(data) {
                console.log(location.pathname)
             navigate(-1)
            }
          } catch (error) {
          console.log(error);
        } finally {
          setTimeout(() => setMessage(""), 2000);
        }
      };
    return (
        <div className="container mt-3 ">
            <form onSubmit={handleSubmit}>
            <div className="row">
                <h3>Address Info</h3>
                {message && <p className="alert alert-success">{message}</p>}
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
        </div>
    )
}
import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Header from "../components/Header";

const Profile = () => {
  const [fetchData, setFetchData] = useState();
  const [editAddress, setEditAddress] = useState({})
  const { data, loading, error } = useFetch(
    `https://backend-product-omega.vercel.app/address`
  );
  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
  }, [data]);

  const handleRemoveBtn = async (addressId) => {
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
        throw new Error ("Failed to delete");
      }
      setFetchData(prevData =>
        prevData.map(user => ({
          ...user,
          address: user.address.filter(a => a._id !== addressId)
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick =(address)=>{
   setEditAddress(address)
     console.log(address)
  }
  const handleInputChange=(e)=>{
    setEditAddress({...editAddress,[e.target.name]:e.target.value})
  }


  const handleEditSubmitBtn =async(addressId)=>{
try{
  const response = await fetch(`https://backend-product-omega.vercel.app/address/${addressId}`,{
    method:"PUT",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(editAddress)
  }
  )
  if(!response.ok){
    throw new Error ("Failed to update")
  }

  setFetchData(prevData => 
    prevData.map(user => ({
      ...user,
      address: user.address.map(a => 
        a._id === addressId ? { ...a, ...editAddress } : a
      )
    }))
  );
  setEditAddress({});
  
}catch(error){
  console.log(error)
}
  }
  return (
    <>
    <Header/>
    <div className="container py-3">
      <h1 className="text-center mb-3 display-3">User Profile</h1>
      {loading && <p>Loading....</p>}
      {error && <p>{error}</p>}
      {fetchData &&(
  <div className="card  my-4" style={{ width: "30rem" ,backgroundColor:"fsfsfs"}}>
  <div className="card-body">
    <div className="d-flex align-items-center mb-3">
      <img
        src={`https://ui-avatars.com/api/?name=${fetchData[0].firstName}+${fetchData[0].lastName}`}
        alt="User Avatar"
        className="rounded-circle me-3"
        style={{ width: "120px", height: "120px" }}
      /><br/>
      <div>
        <h3 className="card-title mb-0">
          {fetchData[0].firstName} {fetchData[0].lastName}
        </h3>
        <p className="fw-bold">{fetchData[0].email}</p>
        <p className="fw-bold">{fetchData[0].phoneNumber}</p>
      </div>
    </div>
    </div>
    </div>
      )}
    
<h3 className="py-3 display-6">Saved addresses: </h3>
      {fetchData &&
        fetchData?.map((user) => (
          <div class="card" style={{ width: "50rem" }}>
            <div class="card-body">
              <h3 class="card-title mb-3">
                {user.firstName} {user.lastName}
              </h3>
              <p class="card-text">
                <strong>Contact info</strong>
              </p>
              <p>Contanct number: {user.phoneNumber}</p>
              <p>Email: {user.email}</p>
              
              {user.address.map((a)=>(
              <div key={a._id}>
              {editAddress._id === a._id ?(
              <div>
                <label>Address</label>
              <input
                    type="text"
                    id="address"
                    name="address"
                    value={editAddress.address || ''}
                    placeholder="ujjian.."
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                  <label>City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={editAddress.city || ''}
                    placeholder="ujjian.."
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                  <label>ZipCode</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={editAddress.zipCode || ''}
                    placeholder="ujjian.."
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                  <label>State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={editAddress.state || ''}
                    placeholder="ujjian.."
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                  <button className="btn btn-success mt-3" onClick={()=>handleEditSubmitBtn(a._id)}
                    disabled={loading}>Save</button>
              </div>
              ):
              (
              <p>
                Address: {a.address || "No"}, {a.city || ""}, {a.zipCode||"No"}
                <button
                  className="float-end btn btn-danger mx-3"
                  onClick={() => handleRemoveBtn(a._id)}
                >
                  Remove address{" "}
                </button>
                <button className="float-end btn btn-info" onClick={()=>handleEditClick(a)}>
                  Edit address 
                </button>
              </p>
       
              )}
       </div>
                
              ))}
              
            </div>
          </div>
        ))}{fetchData &&
        <a href={`/checkout/${fetchData[fetchData.length-1]._id}`} className="btn btn-primary my-3">Add address</a>}
    </div>
    </>
  );
};
export default Profile;

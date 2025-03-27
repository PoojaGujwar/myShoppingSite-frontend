import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import Header from "../components/Header";
import { Link, NavLink } from "react-router-dom";
import AddressForm from "../components/AddressForm";

const Profile = () => {
  const [fetchData, setFetchData] = useState();
  const { data, loading, error } = useFetch(
    `https://backend-product-omega.vercel.app/address`
  );
  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
  }, [data]);
  return (
    <>
    <Header/>
    <div className="container py-3">
      <h1 className="text-center mb-3 display-3">User Profile</h1>
      {loading && <p>Loading....</p>}
      {error && <p>{error}</p>}
      {fetchData &&(
  <div className="card my-4" style={{ width: "30rem" ,backgroundColor:"fsfsfs"}}>
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
      <Link to={"/addressForm"} className="btn btn-primary my-3">Add address</Link>
        <div>
          <h3>Addresses</h3>
          <ul className="list-group col-md-8">
{fetchData?.map((add,index)=>
<li className="list-group-item" key={index}>{add.address.address}, {add.address.city}, {add.address.state}, {add.address.zipCode}</li>
)}
</ul>
        </div>

    </div>
    </>
  );
};
export default Profile;

import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer"

const Products = () => {
  return (
    <>
    <Header/>
    <div className="container py-3">
      <section className="my-5">
        <div className="row">
          <div className="col-lg-3">
            <NavLink to={`/allProducts`} style={{textDecoration:"none"}}>
            <div class="card w-100" style={{height:"100%"}}>
              <img
                src="https://media.istockphoto.com/id/2165224003/photo/happy-man-holding-colorful-shopping-bags-on-blue-background.jpg?s=2048x2048&w=is&k=20&c=bkCljFPezjgMt7AchBM4wdhpEu__mrJe_Cm7_joIlDw="
                alt="Men"
                className="card-img-top"
                style={{width:"100%",height:"100%" }}
              />
              <div className="card-body text-center">
                <p className="card-text fw-normal">
                  Men
                </p>
              </div>
            </div>
            </NavLink>
          </div>
          <div className="col-lg-3  ">
            <NavLink to="/allProducts" style={{textDecoration:"none"}}>
            <div class="card w-100" style={{ height:"100%"}}>
              <img
                src="https://img.freepik.com/premium-photo/clothing-sale-fashion-style-people-concept-happy-woman-choosing-clothes-shopping-center-mall_380164-124202.jpg"
                className="card-img-top"
                alt="Women"
                style={{width:"100%",height:"100%"}}
              />
              <div className="card-body text-center">
                <p className="card-text fw-normal">
                  Women
                </p>
              </div>
            </div>
            </NavLink>
              </div>
          <div className="col-lg-3 ">
            <NavLink to="/allProducts" style={{textDecoration:"none"}}>
            <div class="card w-100" style={{height:"100%"}}>
              <img
                src="https://media.istockphoto.com/id/1364393531/photo/funny-little-girl-choosing-clothes-on-rack-indoors.jpg?s=612x612&w=0&k=20&c=kpjIeykvqGcIJ-yBIRNytzaV9d76XbNRly3mGmBPIAs="
                className="card-img-top"
                alt="Kids"
                style={{width:"100%",height:"100%"}}
              />
              <div className="card-body text-center">
                <p className="card-text fw-normal">
                  Kids
                </p>
              </div>
            </div>
            </NavLink>
          </div>
          <div className="col-lg-3">
            <NavLink to="/allProducts" style={{textDecoration:"none"}}>
            <div class="card w-100" style={{height:"100%"}}>
              <img
                src="https://img.freepik.com/premium-photo/electronics-laptop-mobile-phone-tablet-pc_826551-3368.jpg?w=740"
                className="card-img-top"
                alt="Electronic"
                style={{width:"100%",height:"100%"}}
              />
              <div className="card-body text-center">
                <p className="card-text fw-normal">
                  Electronics
                </p>
              </div>
            </div>
            </NavLink>
          
          </div>
        </div>
      </section>
      <section className="my-5">
      <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
              {/* <img
                src="https://as2.ftcdn.net/v2/jpg/03/55/12/37/1000_F_355123783_WjUgN86awgqdCdPKkfPDgZFJTN5qvtaI.jpg"
                class=""
                alt="My Shopping Site"
                style={{width:"100%",height:"100%"}}
              /> */}
               <img
                src="https://rukminim1.flixcart.com/flap/1800/1800/image/ddbe8a22de89bf94.jpg"
                className=""
                alt="My Shopping Site"
                style={{ width: "100%", height: "100%" }}
              />
            
          </div>
        </div>
        
      </section>
    </div>
    <Footer/>
    </>
  );
};
export default Products;

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
        <div className="row  row-cols-lg-4 row-cols-sm-4 ">
          <div className="col">
            <NavLink to={`/allProducts`}>
            <div class="card w-100" style={{height:"100%"}}>
              <img
                src="https://media.istockphoto.com/id/2165224003/photo/happy-man-holding-colorful-shopping-bags-on-blue-background.jpg?s=2048x2048&w=is&k=20&c=bkCljFPezjgMt7AchBM4wdhpEu__mrJe_Cm7_joIlDw="
                alt="Men Image"
                style={{width:"100%",height:"100%" }}
              />
              <div className="card-body text-center">
                <a className="card-text fw-normal">
                  Men
                </a>
              </div>
            </div>
            </NavLink>
          </div>
          <div className="col">
            <NavLink to="/allProducts">
            <div class="card w-100" style={{ height:"100%"}}>
              <img
                src="https://img.freepik.com/premium-photo/clothing-sale-fashion-style-people-concept-happy-woman-choosing-clothes-shopping-center-mall_380164-124202.jpg"
                class="card-img-top"
                alt="Women Image"
                style={{width:"100%",height:"100%"}}
              />
              <div className="card-body text-center">
                <a className="card-text">
                  Women
                </a>
              </div>
            </div>
            </NavLink>
              </div>
          <div className="col">
            <NavLink to="/allProducts">
            <div class="card w-100" style={{height:"100%"}}>
              <img
                src="https://media.istockphoto.com/id/1364393531/photo/funny-little-girl-choosing-clothes-on-rack-indoors.jpg?s=612x612&w=0&k=20&c=kpjIeykvqGcIJ-yBIRNytzaV9d76XbNRly3mGmBPIAs="
                class="card-img-top"
                alt="Kids Image"
                style={{width:"100%",height:"100%"}}
              />
              <div className="card-body text-center">
                <a className="card-text" href="/allProducts">
                  Kids
                </a>
              </div>
            </div>
            </NavLink>
          </div>
          <div className="col">
            <NavLink to="/allProducts">
            <div class="card w-100" style={{height:"100%"}}>
              <img
                src="https://www.getonecard.app/images/blog/Shopping_Electronics.png"
                class="card-img-top"
                alt="Electronic Image"
                style={{width:"100%",height:"100%"}}
              />
              <div className="card-body text-center">
                <a className="card-text" href="/allProducts">
                  Electronics
                </a>
              </div>
            </div>
            </NavLink>
          </div>
        </div>
      </section>
      <section className="my-5">
      <div className="row">
          <div className="col">
            <div class="card">
              <img
                src="https://media.istockphoto.com/id/1193750118/photo/beautiful-asian-woman-carrying-colorful-bags-shopping-online-with-mobile-phone.jpg?s=612x612&w=0&k=20&c=j1SpSX7c3qzBrUT5f7HRoOfxQnPxZY_c6yb3AvXA5f8="
                class="card-img-top img-fluid"
                alt="My Shopping Site"
              />
            </div>
          </div>
        </div>
        
      </section>
    </div>
    <Footer/>
    </>
  );
};
export default Products;

import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer"

const Products = () => {
  const products =[{category:"Men",img:"https://media.istockphoto.com/id/2165224003/photo/happy-man-holding-colorful-shopping-bags-on-blue-background.jpg?s=2048x2048&w=is&k=20&c=bkCljFPezjgMt7AchBM4wdhpEu__mrJe_Cm7_joIlDw="},
    {
      category:"Women",img:"https://img.freepik.com/premium-photo/clothing-sale-fashion-style-people-concept-happy-woman-choosing-clothes-shopping-center-mall_380164-124202.jpg"
    },
    {
      category:"Kids",img:"https://media.istockphoto.com/id/1364393531/photo/funny-little-girl-choosing-clothes-on-rack-indoors.jpg?s=612x612&w=0&k=20&c=kpjIeykvqGcIJ-yBIRNytzaV9d76XbNRly3mGmBPIAs="
    },
    {
      category:"Electronic",img:"https://img.freepik.com/premium-photo/Electronics-laptop-mobile-phone-tablet-pc_826551-3368.jpg?w=740"
    }
  ]
  return (
    <>
    <Header/>
    <div className="container py-3">
      <section className="my-5">
        <div className="row">
        {products.map((prod)=>(
        <div className="col">
            <NavLink to={`/allProducts?search=${prod.category}`} style={{textDecoration:"none"}}>
            <div class="card w-100" style={{height:"100%"}}>
              <img
                src={`${prod.img}`}
                alt={`${prod.category}`}
                className="card-img-top"
                style={{width:"100%",height:"100%" }}
              />
              <div className="card-body text-center">
                <p className="card-text fw-normal">
                  {prod.category}
                </p>
              </div>
            </div>
            </NavLink>
          </div>
        ))}
        </div>
      </section>
      <section className="my-5">
      <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
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

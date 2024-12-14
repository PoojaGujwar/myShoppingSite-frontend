import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllProduct from "./pages/AllProducts";
import "./index.css";
import ProductDetails from "./pages/ProductDetails";
import WishList  from "./pages/WishList"
import Carts from './pages/Carts';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/allproducts",
    element: <AllProduct />,
  },
  {
    path: "products/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path:"/cart",
    element:<Carts/>
  },{
    path:"/checkout/:productId",
    element:<Checkout/>
  },
  {
    path:"/profile",
    element:<Profile/>
  }
]);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router ={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

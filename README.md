# FinchCart

A full-stack shopping site where users can browse products, view details, add items to the cart or wishlist, and place orders. Built with a React frontend and Express/Node backend.

---

## Demo Link
[Live Demo](https://ganesh-one.vercel.app)

---

## Quick Start
```
git clone https://github.com/PoojaGujwar/Ganesh.git
cd <your_repo>
npm install
npm run start #or `npm start`
```

---

## Technologies
- React.js
- React Router
- Node.js
- Express
- MongoDB

## Features
**Home**
- Displays Category cards
- Wishlist 💖
- Cart 🛒
- Profile 👤

**All Products**
- Displays a list of all product cards
- Search items by category
- Filter by rating, price, and category
- Clear button to reset all filters
- View product details button

**Product Details**
- View full product information
- Add to Cart
- Add or remove from wishlist

**Cart**
- Displays all cart items
- Quantity can be increased or decreased
- Remove items from cart
- Add to wishlist 
- Place order

**Checkout**
- Select a previous address 
- Add a new address 
- Update or remove an address
- Place order 

---

## API Reference

### **GET /products**
List all products<br>
Sample Response: <br>
```
[{_id, name, description, price, rating, size, color, category, imgURL}...]
```

### **GET /products/:id**
Get details for one product<br>
Sample Response:<br>
```
{_id, name, description, price, rating, size, color, category, imgURL}
```

### **GET /address**
List all addresses<br>
Sample Response:<br>
```
[{_id, firstname, lastname, email, phoneNumber, address:{zipCode, state, city}}]
```

### **POST /address**
Creates a new address<br>
Sample Response: <br>
```
{firstname, lastname, email, phonenumber, address:{address, zipCode, state, city}}
```

### **DELETE /address/:id**
Delete address<br>
Sample Response:<br>
```
{message}
```

--- 

## Contact
For bugs or feature requests, please reach out to gujwarpooja@gmail.com
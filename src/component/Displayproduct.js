import React, { useState } from "react";

export default function Displayproduct(props) {
  const [product, setProducts] = useState({
    productId: "",
    Name: "",
    price: 0,
    Rating: 0,
    Featured: true,
    company: "",
  });
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setProducts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.add(product);
    setProducts({
      productId: "",
      Name: "",
      price: "",
      Rating: "",
      Featured: "",
      company: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="productId">ProductId*:</label>
      <input
        type="text"
        value={product.productId}
        name="productId"
        onChange={inputEvent}
      />
      <br />
      <label htmlFor="Name">Name*:</label>
      <input
        type="text"
        value={product.Name}
        name="Name"
        onChange={inputEvent}
      />
      <br />
      <label htmlFor="price">Price*:</label>
      <input
        type="number"
        value={product.price}
        name="price"
        onChange={inputEvent}
      />
      <br />
      <label htmlFor="Featured">Featured*:</label>
      <input
        type="text"
        value={product.Featured}
        name="Featured"
        onChange={inputEvent}
      />
      <br />
      <label htmlFor="Rating">Rating*:</label>
      <input
        type="number"
        value={product.Rating}
        name="Rating"
        onChange={inputEvent}
      />
      <br />
      <label htmlFor="company">Company Name*:</label>
      <input
        type="text"
        value={product.company}
        name="company"
        onChange={inputEvent}
      />
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
}

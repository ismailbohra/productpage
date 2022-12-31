import "./App.css";
import React, { useState } from "react";
import Displayproduct from "./component/Displayproduct";
import Prodt from "./component/Product";

function App() {
  const [products, setProducts] = useState([
    {
      productId: 1,
      Name: "Product 1",
      price: 99.99,
      Rating: 4,
      Featured: true,
      company: "Company A",
    },
    {
      productId: 2,
      Name: "Product 2",
      price: 49.99,
      Rating: 3,
      Featured: false,
      company: "Company B",
    },
    {
      productId: 3,
      Name: "Product 3",
      price: 29.99,
      Rating: 5,
      Featured: true,
      company: "Company C",
    },
  ]);
  const addproduct = (product) => {
    fetch("https://productapi-production-02a4.up.railway.app/v1/product", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((res) => {
        setProducts((prevData) => {
          return [...prevData, product];
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <>
      <Displayproduct add={addproduct} />
      <ul>
        {products.map((product) => (
          <Prodt product={product} />
        ))}
      </ul>
    </>
  );
}

export default App;

import "./App.css";
import React, { useState, useEffect } from "react";
import Displayproduct from "./component/Displayproduct";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [product, setProduct] = useState({
    productId: "",
    Name: "",
    price: 0,
    Rating: 0,
    Featured: true,
    company: "",
  });
  const [products, setProducts] = useState([]);
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
        console.log(res.data);
        if (res.status != "ERROR") {
          setProducts((prevData) => {
            return [...prevData, product];
          });
        } else {
          alert(res.message);
        }

        return true;
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteproduct = (e) => {
    e.preventDefault();
    const url = "https://productapi-production-02a4.up.railway.app/v1/product";
    alert(product.productId);
    const fetchData = async () => {
      try {
        const response1 = await fetch(url, {
          method: "DELETE",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ productId: product.productId }),
        })
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            alert(error);
          });
        const response = await fetch(url, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        const json = await response.json();
        setProducts((prev) => {
          return [...json.data];
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  };

  useEffect(() => {
    const url = "https://productapi-production-02a4.up.railway.app/v1/product";

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        const json = await response.json();
        setProducts((prevData) => {
          return json.data;
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  const featuredproduct = (product) => {
    const url =
      "https://productapi-production-02a4.up.railway.app/v1/product?Featured=true";
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        const json = await response.json();
        console.log(json.data);
        setProducts((prev) => {
          return json.data;
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  };
  const lowpriceproduct = (e) => {
    e.preventDefault();
    const price = product.price;
    const url = `https://productapi-production-02a4.up.railway.app/v1/product?price=${price}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        const json = await response.json();
        console.log(json.data);
        setProducts((prev) => {
          return json.data;
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  };

  const ratingproduct = (e) => {
    e.preventDefault();
    const rating = product.Rating;
    const url = `https://productapi-production-02a4.up.railway.app/v1/product?Rating=${rating}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        const json = await response.json();
        console.log(json.data);
        setProducts((prev) => {
          return json.data;
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  };
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      [name]: value,
    }));
  };
  return (
    <>
      <Displayproduct
        add={addproduct}
        deleteProduct={deleteproduct}
        featured={featuredproduct}
        price={lowpriceproduct}
        rating={ratingproduct}
      />
      <form onSubmit={lowpriceproduct}>
        <label htmlFor="price">Price less then*:</label>
        <input
          type="number"
          name="price"
          onChange={inputEvent}
          value={product.price}
        />
        <button type="submit">get Product</button>
      </form>
      <form onSubmit={ratingproduct}>
        <label htmlFor="Rating">Rating greater then*:</label>
        <input
          type="number"
          name="Rating"
          onChange={inputEvent}
          value={product.Rating}
        />
        <button type="submit">get Product</button>
      </form>
      <form onSubmit={deleteproduct}>
        <label htmlFor="productId">deleteproduct with id*:</label>
        <input
          type="text"
          name="productId"
          onChange={inputEvent}
          value={product.productId}
        />
        <button type="submit">delete Product</button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>product Id</TableCell>
              <TableCell align="right">product name</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">rating</TableCell>
              <TableCell align="right">Featured</TableCell>
              <TableCell align="right">company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.Name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.productId}
                </TableCell>
                <TableCell align="right">{row.Name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.Rating}</TableCell>
                <TableCell align="right">
                  {row.Featured ? "true" : "false"}
                </TableCell>
                <TableCell align="right">{row.company}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;

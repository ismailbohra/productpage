import React from "react";

function Prodt(props) {
  return (
    <div>
      <li key={props.product.id}>
        {props.product.name} - ${props.product.price} - Rating:{" "}
        {props.product.rating} -{" "}
        {props.product.featured ? "Featured" : "Not featured"} -{" "}
        {props.product.company}
      </li>
    </div>
  );
}

export default Prodt;

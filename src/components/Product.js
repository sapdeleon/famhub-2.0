import React from "react"

const THead = () => {
  return (
    <thead className="thead-light">
      <tr>
        <th>Product</th>
        <th>Description</th>
        <th>Type</th>
        <th>Color</th>
        <th>Size</th>
        <th>Brand Name</th>
        <th>Supplier</th>
        <th>Date</th>
      </tr>
    </thead>
  )
}

const Product = (props) => {
  const { sku, description, type, color, size, name, supplier, date } = props;
  return (
    <tbody>
      <tr>
        <td>{sku}</td>
        <td>{description}</td>
        <td>{type}</td>
        <td>{color}</td>
        <td>{size}</td>
        <td>{name}</td>
        <td>{supplier}</td>
        <td>{date}</td>
      </tr>
    </tbody>
  )
}

export { THead, Product };


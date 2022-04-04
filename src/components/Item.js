import React from "react"

const THead = () => {
  return (
    <thead className="thead-light">
      <tr>
        <th>Product</th>
        <th>Description</th>
        <th>Supplier</th>
        <th>Quantity</th>
        <th>Date</th>
      </tr>
    </thead>
  )
}

const Item = (props) => {
  const { sku, description, qty, supplier, date } = props;
  return (
    <tbody>
      <tr>
        <td>{sku}</td>
        <td>{description}</td>
        <td>{supplier}</td>
        <td>{qty}</td>
        <td>{date}</td>
        <td><button className="btn btn-outline-primary">Edit</button></td>
        <td><button className="btn btn-outline-secondary">Delete</button></td>
      </tr>
    </tbody>
  )
}

export { THead, Item };
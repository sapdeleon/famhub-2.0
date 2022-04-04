import React from "react"

const THead = () => {
  return (
    <thead className="thead-light">
      <tr>
        <th>Product</th>
        <th>Description</th>
        <th>Cost</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Date</th>
      </tr>
    </thead>
  )
}

const Sale = (props) => {
  const { sku, description, cost, qty, total, date } = props;
  return (
    <tbody>
      <tr>
        <td>{sku}</td>
        <td>{description}</td>
        <td>{cost}</td>
        <td>{qty}</td>
        <td>{total}</td>
        <td>{date}</td>
        <td><button className="btn btn-outline-primary">Edit</button></td>
        <td><button className="btn btn-outline-secondary">Delete</button></td>
      </tr>
    </tbody>
  )
}

export { THead, Sale };
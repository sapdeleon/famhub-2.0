import React, { useState, useEffect } from "react"
import Axios from "axios"

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

const Sales = (props) => {
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

const ShowAllSales = () => {
  const [listOfSales, setListOfSales] = useState([]);

  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:8080/sales/").then((response) => {
      setListOfSales(response.data)
    })
  }, [])

  const createSale = () => {
    Axios.post("http://localhost:8080/sales/create/", {
      sku,
      description,
      cost,
      qty,
      total: cost * qty,
      date: new Date().now
    }).then((response) => {
      setListOfSales([...listOfSales, {
        sku,
        description,
        cost,
        qty,
        total: cost * qty,
        date: new Date().now
      }])
    })
  }

  return (
    <div className="App">
      <h2>Inventory</h2>
      <div>
        <form className="d-flex">
          <input type="text" placeholder="Enter SKU" className="form-control me-2"
            onChange={(event) => { setSku(event.target.value) }} />
          <input type="text" placeholder="Enter Description" className="form-control me-2"
            onChange={(event) => { setDescription(event.target.value) }} />
          <input type="number" placeholder="Enter Cost" className="form-control me-2"
            onChange={(event) => { setCost(event.target.value) }} />
          <input type="number" placeholder="Enter Quantity" className="form-control me-2"
            onChange={(event) => { setQty(event.target.value) }} />
          <button className="btn btn-outline-success" onClick={createSale}>Create</button>
        </form>
      </div>
      <hr />
      <div>
        <table className="table">
          <THead />
          {listOfSales.map((item) => {
            return (
              <Sales key={item._id} {...item} />
            );
          })};
        </table>
      </div>
    </div>
  );
}

export default ShowAllSales;
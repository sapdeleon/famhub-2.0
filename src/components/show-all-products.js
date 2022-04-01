import React, { useState, useEffect } from "react"
import Axios from "axios"

const ShowAllProducts = () => {
  const [listOfProducts, setListOfProducts] = useState([]);

  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8080/products/").then((response) => {
      setListOfProducts(response.data)
    })
  }, [])

  const createProduct = () => {
    Axios.post("http://localhost:8080/products/create", {
      sku,
      description,
      type,
      color,
      size,
      name,
      supplier,
      date: new Date().now
    }).then((response) => {
      setListOfProducts([...listOfProducts, {
        sku,
        description,
        type,
        color,
        size,
        name,
        supplier,
        date: new Date().now
      }])
    })
  }

  return (
    <div className="App">
      <h2>Products</h2>
      <div>
        <input type="text" placeholder="Enter SKU"
          onChange={(event) => { setSku(event.target.value) }} />
        <input type="text" placeholder="Enter Description"
          onChange={(event) => { setDescription(event.target.value) }} />
        <input type="text" placeholder="Enter Type"
          onChange={(event) => { setType(event.target.value) }} />
        <input type="text" placeholder="Enter Color"
          onChange={(event) => { setColor(event.target.value) }} />
        <input type="text" placeholder="Enter Size"
          onChange={(event) => { setSize(event.target.value) }} />
        <input type="text" placeholder="Enter Name"
          onChange={(event) => { setName(event.target.value) }} />
        <input type="text" placeholder="Enter Supplier"
          onChange={(event) => { setSupplier(event.target.value) }} />
        <button onClick={createProduct}>Create Product</button>
      </div>
      <hr />
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Supplier</th>
              <th>Date</th>
            </tr>
          </thead>
          {listOfProducts.map((item) => {
            return (
              <tbody>
                <tr key={item._id}>
                  <td>{item.sku}</td>
                  <td>{item.description}</td>
                  <td>{item.supplier}</td>
                  <td>{item.date}</td>
                </tr>
              </tbody>
            );
          })};
        </table>
      </div>
    </div>
  );
}

export default ShowAllProducts;
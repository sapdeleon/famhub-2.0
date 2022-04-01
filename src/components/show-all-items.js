import React, { useState, useEffect } from "react"
import Axios from "axios"

const ShowAllItems = () => {
  const [listOfItems, setListOfItems] = useState([]);

  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [qty, setQty] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:8080/items/").then((response) => {
      setListOfItems(response.data)
    })
  }, [])

  const createItem = () => {
    Axios.post("http://localhost:8080/items/create/", {
      sku,
      description,
      supplier,
      qty,
      date: new Date().now
    }).then((response) => {
      setListOfItems([...listOfItems, {
        sku,
        description,
        supplier,
        qty,
        date: new Date().now
      }])
    })
  }

  return (
    <div className="App">
      <h2>Inventory</h2>
      <div>
        <form class="d-flex">
        <input type="text" placeholder="Enter SKU" className="form-control me-2"
          onChange={(event) => { setSku(event.target.value) }} />
        <input type="text" placeholder="Enter Description" className="form-control me-2"
          onChange={(event) => { setDescription(event.target.value) }} />
        <select name="supplier" id="supplier" className="form-control me-2"
          onChange={(event) => { setSupplier(event.target.value) }} >
          <option value="-">Supplier</option>
          <option value="Belly.ca">Belly.ca</option>
          <option value="Souveneir.ca">Souveneir.ca</option>
          <option value="Custom.ca">Custom.ca</option>
          <option value="Others">Others</option>
        </select>
          <input type="number" placeholder="Enter Quantity" className="form-control me-2"
          onChange={(event) => { setQty(event.target.value) }} />
          <button className="btn btn-outline-success" onClick={createItem}>Create</button>
            </form>
      </div>
      <hr />
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Supplier</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          {listOfItems.map((item) => {
            return (
              <tbody>
                <tr>
                  <td key={item._id}>{item.sku}</td>
                  <td>{item.description}</td>
                  <td>{item.supplier}</td>
                  <td>{item.qty}</td>
                  <td>{item.date}</td>
                  <td><button className="btn btn-outline-primary">Edit</button></td>
                  <td><button className="btn btn-outline-secondary">Delete</button></td>
                </tr>
              </tbody>
            );
          })};
        </table>
      </div>
    </div>
  );
}

export default ShowAllItems;
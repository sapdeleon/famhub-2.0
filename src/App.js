import React, { useState, useEffect } from "react"
import Axios from "axios"

function App() {

  const [listOfItems, setListOfItems] = useState([]);

  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [qty, setQty] = useState(0);
  const [date, setDate] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8080/items/").then((response) => {
      setListOfItems(response.data)
    })
  }, [])

  const createItem = () => {
    Axios.post("http://localhost:8080/create/", {
      sku,
      description,
      supplier,
      qty,
      date
    }).then((response) => {
      setListOfItems([...listOfItems, {
        sku,
        description,
        supplier,
        qty,
        date
      }])
    })
  }

  return (
    <div className="App">
      <h2>Hello, World!</h2>
      <div>
        <tr style={{ width: "100%" }}>
          <th>Product</th>
          <th>Description</th>
          <th>Supplier</th>
          <th>Quantity</th>
          <th>Date</th>
        </tr>
        {listOfItems.map((item) => {
          return (
            <div>
              <tr key={item._id}>
                <td>{item.sku}</td>
                <td>{item.description}</td>
                <td>{item.supplier}</td>
                <td>{item.qty}</td>
                <td>{item.date}</td>
              </tr>
            </div>
          )
        })}
      </div>

      <div>
        <input type="text" placeholder="Enter SKU"
          onChange={(event) => { setSku(event.target.value) }} />
        <input type="text" placeholder="Enter Description"
          onChange={(event) => { setDescription(event.target.value) }} />
        <input type="text" placeholder="Enter Supplier"
          onChange={(event) => { setSupplier(event.target.value) }} />
        <input type="number" placeholder="Enter Quantity"
          onChange={(event) => { setQty(event.target.value) }} />
        <input type="date" placeholder="Enter Date"
          onChange={(event) => { setDate(event.target.value) }} />
        <button onClick={createItem}>Create Item</button>
      </div>
    </div>
  );
}

export default App;

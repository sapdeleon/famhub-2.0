import React, { useState, useEffect } from "react"
import Axios from "axios"
import {THead, Item} from "./Item"

const ShowAllItems = () => {
  const [listOfItems, setListOfItems] = useState([]);
  const [listOfProducts, setListOfProducts] = useState([]);

  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [qty, setQty] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:8080/products/").then((response) => {
      setListOfProducts(response.data)
    })
  }, [])

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
      date: new Date().now,
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

  const handleSkuChange = (event) => setSku(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  return (
    <div className="App">
      <div>
        <form className="d-flex">
          <div className="container">
            <h2>Inventory</h2>
            <div className="row" style={{ paddingBottom: "0.5rem" }}>
              <div className="col">
                <select onChange={handleSkuChange} className="form-select" required>
                  <option selected>Product</option>
                  {listOfProducts.map((prod) => {
                    return <option key={prod._id} value={prod.sku}>{prod.sku}</option>
                  })}
                </select>
              </div>
              <div className="col">
                <select onChange={handleDescriptionChange} className="form-select" required>
                  <option selected>Description</option>
                  {listOfProducts.map((prod) => {
                    return <option key={prod._id} value={prod.description}>{prod.description}</option>
                  })}
                </select>
              </div>
              <div className="col">
                <select name="supplier" id="supplier" className="form-select"
                  onChange={(event) => { setSupplier(event.target.value) }} required>
                  <option selected>Supplier</option>
                  <option value="Belly.ca">Belly.ca</option>
                  <option value="Souveneir.ca">Souveneir.ca</option>
                  <option value="Custom.ca">Custom.ca</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="col">
                <input type="number" placeholder="Enter Quantity" className="form-control me-2" required
                  onChange={(event) => { setQty(event.target.value) }} />
              </div>
              <div className="col">
                <button className="btn btn-outline-success" onClick={createItem}>Create</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <hr />
      <div>
        <table className="table">
          <THead />
          {listOfItems.map((item) => {
            return (
              <Item key={item._id} {...item} />
            );
          })};
        </table>
      </div>
    </div>
  );
}

export default ShowAllItems;
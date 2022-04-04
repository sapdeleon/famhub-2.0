import React, { useState, useEffect } from "react"
import Axios from "axios"
import {THead, Sale} from "./Sale"

const ShowAllSales = () => {
  const [listOfSales, setListOfSales] = useState([]);
  const [listOfProducts, setListOfProducts] = useState([]);

  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);
  const [qty, setQty] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:8080/products/").then((response) => {
      setListOfProducts(response.data)
    })
  }, [])

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
      date: new Date()
    }).then((response) => {
      setListOfSales([...listOfSales, {
        sku,
        description,
        cost,
        qty,
        total: cost * qty,
        date: new Date()
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
          <h2>Sales</h2>
            <div className="row" style={{ paddingBottom: "0.5rem" }}>
              <div className="col-2 col-sm-2">
                <select onChange={handleSkuChange} className="form-select" required>
                  <option defaultValue>Product</option>
                  {listOfProducts.map((prod) => {
                    return <option key={prod._id} value={prod.sku}>{prod.sku}</option>
                  })}
                </select>
              </div>
              <div className="col-4 col-sm-4">
                <select onChange={handleDescriptionChange} className="form-select" required>
                  <option defaultValue>Description</option>
                  {listOfProducts.map((prod) => {
                    return <option key={prod._id} value={prod.description}>{prod.description}</option>
                  })}
                </select>
              </div>
              <div className="col-2 col-sm-2">
                <input type="number" placeholder="Enter Cost" className="form-control me-2"
                  onChange={(event) => { setCost(event.target.value) }} required />
              </div>
              <div className="col-2 col-sm-2">
                <input type="number" placeholder="Enter Quantity" className="form-control me-2"
                  onChange={(event) => { setQty(event.target.value) }} required />
              </div>
              <div className="col-2 col-sm-2">
                <button className="btn btn-outline-success" onClick={createSale}>Create</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <hr />
      <div>
        <table className="table">
          <THead />
          {listOfSales.map((sale) => {
            return (
              <Sale key={sale._id} {...sale} />
            );
          })};
        </table>
      </div>
    </div>
  );
}

export default ShowAllSales;
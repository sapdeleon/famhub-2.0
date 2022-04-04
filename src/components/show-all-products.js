import React, { useState, useEffect } from "react"
import Axios from "axios"
import { THead, Product } from "./Product"

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
      date: new Date()
    }).then((response) => {
      setListOfProducts([...listOfProducts, {
        sku,
        description,
        type,
        color,
        size,
        name,
        supplier,
        date: new Date()
      }])
    })
  }

  return (
    <div className="App">
      <div>
        <form className="d-flex">
          <div className="container">
            <h2>Products</h2>
            <div className="row" style={{ paddingBottom: "0.5rem" }}>
              <div className="col-3 col-sm-3">
                <input type="text" placeholder="Enter SKU" className="form-control me-1"
                  onChange={(event) => { setSku(event.target.value) }} required />
            </div>
              <div className="col-9 col-sm-9">
                <input type="text" placeholder="Enter Description" className="form-control me-1"
                  onChange={(event) => { setDescription(event.target.value) }} required/>
            </div>
          </div>
            <div className="w-100"></div>
            <div className="row gap-2">
              <div className="col">
                <select name="type" id="type" className="form-select"
                  onChange={(event) => { setType(event.target.value) }} required >
                  <option defaultValue>Type</option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Hat">Apron</option>
                  <option value="Sweater">Sweater</option>
                  <option value="Long Sleeves">Long Sleeves</option>
                  <option value="Hoodies">Hoodies</option>
                </select>
              </div>
              <div className="col">
                <select name="color" id="color" className="form-select"
                  onChange={(event) => { setColor(event.target.value) }} required >
                  <option defaultValue>Color</option>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Green">Green</option>
                  <option value="Navy Blue">Navy Blue</option>
                  <option value="Red">Red</option>
                  <option value="Yellow">Yellow</option>
                </select>
              </div>
              <div className="col">
                <select name="size" id="size" className="form-select"
                  onChange={(event) => { setSize(event.target.value) }} required >
                  <option defaultValue>Size</option>
                  <option value="Youth">Youth</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="X-Large">X-Large</option>
                  <option value="XX-Large">XX-Large</option>
                </select>
              </div>
              <div className="col">
                <select name="name" id="name" className="form-select"
                  onChange={(event) => { setName(event.target.value) }} required>
                  <option defaultValue>Brand</option>
                  <option value="ATC">ATC</option>
                  <option value="AllStyles">AllStyles</option>
                  <option value="Gildan">Gildan</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="col">
                <select name="supplier" id="supplier" className="form-select"
                  onChange={(event) => { setSupplier(event.target.value) }} required >
                  <option defaultValue>Supplier</option>
                  <option value="Belly.ca">Belly.ca</option>
                  <option value="Souveneir.ca">Souveneir.ca</option>
                  <option value="Custom.ca">Custom.ca</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="col">
                <button className="btn btn-outline-success" onClick={createProduct}>Create</button>
              </div>
          </div>
          </div>
        </form>
      </div>
      <hr />
      <div>
        <table className="table">
          <THead />
          {listOfProducts.map((product, index) => {
            return (
              <Product key={index} {...product} />
            );
          })};
        </table>
      </div>
    </div>
  );
}

export default ShowAllProducts;
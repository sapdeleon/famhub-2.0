import React, { useState, useEffect } from "react"
import Axios from "axios"

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

const Products = (props) => {
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
        <form className="d-flex">
          <input type="text" placeholder="Enter SKU" className="form-control me-2"
          onChange={(event) => { setSku(event.target.value) }} />
          <input type="text" placeholder="Enter Description" className="form-control me-2"
          onChange={(event) => { setDescription(event.target.value) }} />
          <input type="text" placeholder="Enter Type" className="form-control me-2"
          onChange={(event) => { setType(event.target.value) }} />
          <select name="color" id="color" className="form-control me-2"
            onChange={(event) => { setColor(event.target.value) }} >
            <option value="-">Color</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Green">Green</option>
            <option value="Navy Blue">Navy Blue</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
          </select>
          <select name="size" id="size" className="form-control me-2"
            onChange={(event) => { setSize(event.target.value) }} >
            <option value="-">Size</option>
            <option value="Youth">Youth</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="X-Large">X-Large</option>
            <option value="XX-Large">XX-Large</option>
          </select>
          <select name="name" id="name" className="form-control me-2"
            onChange={(event) => { setName(event.target.value) }} >
            <option value="-">Brand</option>
            <option value="ATC">ATC</option>
            <option value="AllStyles">AllStyles</option>
            <option value="Gildan">Gildan</option>
            <option value="Others">Others</option>
          </select>
          <select name="supplier" id="supplier" className="form-control me-2"
            onChange={(event) => { setSupplier(event.target.value) }} >
            <option value="-">Supplier</option>
            <option value="Belly.ca">Belly.ca</option>
            <option value="Souveneir.ca">Souveneir.ca</option>
            <option value="Custom.ca">Custom.ca</option>
            <option value="Others">Others</option>
          </select>
          <button className="btn btn-outline-success" onClick={createProduct}>Create</button>
          </form>
      </div>
      <hr />
      <div>
        <table className="table">
          <THead />
          {listOfProducts.map((item, index) => {
            return (
              <Products key={index} {...item}/>
            );
          })};
        </table>
      </div>
    </div>
  );
}

export default ShowAllProducts;
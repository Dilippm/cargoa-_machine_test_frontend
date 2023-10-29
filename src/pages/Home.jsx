import React, { useState, useEffect } from "react";
import "./homestyle.css";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getVendors,submitPurchaseOrder ,fetchVendorProducts,updateProductDateApi   } from '../api/api';
function Home() {
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: 0,
    dateOfShipping: "",
    selectedVendors: "",
  });

  const [pdfFile, setPdfFile] = useState(null);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [disableUpdateButton, setDisableUpdateButton] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");

    navigate("/");
  };
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      const selectedFile = files[0];
      setPdfFile(selectedFile);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    getVendors() 
      .then((response) => {
        setVendors(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching vendors:', error);
      });
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    console.log("Selected PDF File:", pdfFile);

    try {
      const token = localStorage.getItem("token");
      const response = await submitPurchaseOrder(formData, pdfFile, token);

      console.log(response.data.message);
    } catch (error) {
      console.error("Error submitting purchase order:", error);
    }
  };
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      fetchVendorProducts(token)
        .then((response) => {
          setVendorProducts(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching vendor products:", error);
        });
    } catch (error) {
      console.error("Error fetching vendor products:", error);
    }
  }, []);
  const updateProductDate = (productId, selectedDate) => {
    setDisableUpdateButton(true);
    updateProductDateApi(productId, selectedDate)
      .then((response) => {
        console.log("Product date updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product date:", error);
      });
  };

  return (
    <div className="page">
      <button onClick={handleLogout}>Logout</button>
      <div className="homepage">
        <h1>Purchase Order Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date of Shipping:</label>
            <input
              type="text"
              name="dateOfShipping"
              value={formData.dateOfShipping}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Select Vendor:</label>
            <select
              name="selectedVendors"
              value={formData.selectedVendors}
              onChange={handleChange}
            >
              <option value="">Select a Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor._id} value={vendor._id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Upload PDF:</label>
            <input type="file" name="pdfFile" onChange={handleChange} />
          </div>
          <button type="submit">Submit Purchase Order</button>
        </form>
      </div>
      <div className="vendor-products">
        <h1>Your Uploaded Products</h1>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Given Dates</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendorProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.date}</td>
                <td>
                  {product.shippingSchedule ? (
                    product.shippingSchedule
                  ) : (
                    <select onChange={(e) => setSelectedDate(e.target.value)}>
                      <option value="">Select a date</option>
                      {product.givenDates.map((dateObj, index) => (
                        <option key={index} value={dateObj.date1}>
                          {dateObj.date1}
                        </option>
                      ))}
                      {product.givenDates.map((dateObj, index) => (
                        <option key={index} value={dateObj.date2}>
                          {dateObj.date2}
                        </option>
                      ))}
                      {product.givenDates.map((dateObj, index) => (
                        <option key={index} value={dateObj.date3}>
                          {dateObj.date3}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td>
                  {!product.shippingSchedule && (
                    <button
                      onClick={() =>
                        updateProductDate(product._id, selectedDate)
                      }
                      disabled={disableUpdateButton}
                    >
                      Update Date
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

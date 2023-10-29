import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import {fetchProductDetailsApi} from "../api/api"
const Dashboard = () => {
  const [productDetails, setProductDetails] = useState([]);
  
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      fetchProductDetailsApi(token)
        .then((response) => {
          setProductDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }, []);

  const showPdf = (pdf) => {
    const url = `http://localhost:3000/files/${pdf}`;
    window.open(url, '_blank');
  };

  const handleDateChange = (e, productId, field) => {
    const value = e.target.value;

    
    const updatedProductDetails = productDetails.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          [field]: value,
        };
      }
      return product;
    });

    setProductDetails(updatedProductDetails);
  };

  const saveDates = (productId, date1, date2, date3) => {
  
    setIsSaveDisabled(true);

   
    axios
      .post('http://localhost:3000/api/products/save-dates', {
        productId,
        date1,
        date2,
        date3,
      })
      .then((response) => {
       console.log(response);
      })
      .catch((error) => {
        console.error('Error saving dates:', error);
      });
  };
  const navigate = useNavigate();
  const handleLogout = () => {
   
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    
   
    navigate('/');
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <div className="dashboard">
        {productDetails.map((product) => (
          
          <div key={product._id} className="product-card">
            {product.shippingSchedule ? <h1 style={{color:"green"}}>Shipping Scheduled</h1> : <h1 style={{color:"red"}}>To Be Scheduled</h1>}
            <h2>Product Name: {product.productName}</h2>
            <h2>Quantity: {product.quantity}</h2>
            <h2>Date: {product.date}</h2>
            <h2>Shipping Schedules</h2>
           
    {product.shippingSchedule && <p className={product.givenDates[0].date1 === product.shippingSchedule ? 'green' : 'disabled-color'}>
    Date 1: {product.givenDates[0]?.date1}
    </p>}
    {product.shippingSchedule && <p className={product.givenDates[0].date2 === product.shippingSchedule ? 'green' : 'disabled-color'}>
    Date 2: {product.givenDates[0]?.date2}
    </p>}
    {product.shippingSchedule &&<p className={product.givenDates[0].date3 === product.shippingSchedule ? 'green' : 'disabled-color'}>
      Date 3: {product.givenDates[0]?.date3}
    </p>}
    <h2>
      Document: <button onClick={() => showPdf(product.documentName)}>Show</button>
    </h2>

          
    {!product.shippingSchedule && (
  <div>
    <input
      type="date"
      placeholder="Date 1"
      value={product.date1 || date1}
      onChange={(e) => handleDateChange(e, product._id, 'date1')}
      readOnly={product.isReadOnly}
    />
    <input
      type="date"
      placeholder="Date 2"
      value={product.date2 || date2}
      onChange={(e) => handleDateChange(e, product._id, 'date2')}
      readOnly={product.isReadOnly}
    />
    <input
      type="date"
      placeholder="Date 3"
      value={product.date3 || date3}
      onChange={(e) => handleDateChange(e, product._id, 'date3')}
      readOnly={product.isReadOnly}
    />

    <button
      onClick={() => {
        saveDates(product._id, product.date1, product.date2, product.date3);
        const updatedProductDetails = productDetails.map((p) => {
          if (p._id === product._id) {
            return {
              ...p,
              isReadOnly: true,
            };
          }
          return p;
        });
        setProductDetails(updatedProductDetails);
      }}
      disabled={isSaveDisabled}
    >
      Save Dates
    </button>
  </div>
)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

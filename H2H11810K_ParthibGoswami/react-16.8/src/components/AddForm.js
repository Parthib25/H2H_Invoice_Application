import React, { useState } from 'react';
import { makeStyles, InputBase, Button } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: '#666666',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'60vh',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  formFieldLeftTop: {
    width: '25%',
    marginRight: theme.spacing(2),
    backgroundColor: 'white',
  }, formFieldRightTop: {
    width: '50%',
    marginRight: theme.spacing(2),
    backgroundColor: 'white',
  },
  formFieldBottomLeft: {
    width: '25%',
    marginRight: theme.spacing(2),
    backgroundColor: 'white',
  },
  formFieldBottomRight: {
    width: '15.8%',
    marginRight: theme.spacing(2),
    backgroundColor: 'white',
  },


  addButton: {
    backgroundColor: 'red',
    color: 'white !important',
    margin: theme.spacing(2),
    width: '50%',
  },
  clearButton: {
    backgroundColor: 'orange',
    color: 'white',
    margin: theme.spacing(2),
    width: '50%',
  },
}));

const AddForm = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    customerOrderId: '',
    salesOrg: '',
    distributionChannel: '',
    customerNumber: '',
    companyCode: '',
    orderCurrency: '',
    amountInUSD: '',
    orderCreationDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    for (const key in formData) {
      if (formData[key].trim() === '') {
        return false;
      }
    }
    return true;
  };

  const handleAddData = () => {
    console.log(formData)
    if (!isFormValid()) {
      return;
    }

    // Create an object with the form data
    const postData = {
      cust_id: formData.customerOrderId,
      sales_org: formData.salesOrg,
      dis: formData.distributionChannel,
      cus_no: formData.customerNumber,
      comp: formData.companyCode,
      order_curr: formData.orderCurrency,
      amount: formData.amountInUSD,
      order: formData.orderCreationDate,
    };

    // Send the POST request using Axios
    axios
      .post('http://localhost:8080/h2h_milestone_3/addInvoice', postData)
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
        // Reset the form
        setFormData({
          customerOrderId: '',
          salesOrg: '',
          distributionChannel: '',
          customerNumber: '',
          companyCode: '',
          orderCurrency: '',
          amountInUSD: '',
          orderCreationDate: '',
        });
      })
      .catch((error) => {
        // Handle the error if needed
        console.error(error);
      });
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formRow}>
        <InputBase
          className={classes.formFieldLeftTop}
          placeholder="Customer Order ID"
          name="customerOrderId"
          value={formData.customerOrderId}
          onChange={handleInputChange}
        />
        <InputBase
          className={classes.formFieldLeftTop}
          placeholder="Sales Org"
          name="salesOrg"
          value={formData.salesOrg}
          onChange={handleInputChange}
        />
        <InputBase
          className={classes.formFieldRightTop}
          placeholder="Distribution Channel"
          name="distributionChannel"
          value={formData.distributionChannel}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formRow}>
        <InputBase
          className={classes.formFieldBottomLeft}
          placeholder="Customer Number"
          name="customerNumber"
          value={formData.customerNumber}
          onChange={handleInputChange}
        />
        <InputBase
          className={classes.formFieldBottomLeft}
          placeholder="Company Code"
          name="companyCode"
          value={formData.companyCode}
          onChange={handleInputChange}
        />
        <InputBase
          className={classes.formFieldBottomRight}
          placeholder="Order Currency"
          name="orderCurrency"
          value={formData.orderCurrency}
          onChange={handleInputChange}
        />
        <InputBase
          className={classes.formFieldBottomRight}
          placeholder="Amount in USD"
          name="amountInUSD"
          value={formData.amountInUSD}
          onChange={handleInputChange}
        />
        <InputBase
          className={classes.formFieldBottomRight}
          type="date"
          placeholder="Order Creation Date"
          name="orderCreationDate"
          value={"Order Creation Date"}
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.formRow}>
      <Button
        className={classes.addButton}
        disabled={!isFormValid()}
        onClick={handleAddData}
      >
        Add
      </Button>
      <Button
        className={classes.clearButton}
        onClick={() =>
          setFormData({
            customerOrderId: '',
            salesOrg: '',
            distributionChannel: '',
            customerNumber: '',
            companyCode: '',
            orderCurrency: '',
            amountInUSD: '',
            orderCreationDate: '',
          })
        }
      >
        Clear
      </Button>
      </div>
    </div>
  );
};

export default AddForm;

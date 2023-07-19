import React, { useState } from 'react';
import { Modal, Button, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import './EditModal.css'
const EditModal = ({ showModal, handleClose, handleSave, selectedRow }) => {
  const [slno,setSlno]=useState('');
  const [ordercurrency, setOrderCurrency] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [distributionChannel, setDistributionChannel] = useState('');

  React.useEffect(() => {
  }, [showModal]);

  React.useEffect(() => {
    if (selectedRow && selectedRow.length ===1 ) {
      const firstSelectedRow = selectedRow[0];
     if(firstSelectedRow){
        setOrderCurrency(firstSelectedRow.order_currency)
        setCompanyCode(firstSelectedRow.company_code)
        setDistributionChannel(firstSelectedRow.distribution_channel)
        setSlno(firstSelectedRow.sl_no)
     }
     
    }

  }, [selectedRow]);

  console.log(selectedRow)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const data = {
      "sl_no": selectedRow[0].id,
      "value1": ordercurrency,
      "value2": companyCode,
      "value3": distributionChannel
    };
    console.log(data);
    axios.post('http://localhost:8080/h2h_milestone_3/editInvoice', data)
      .then(response => {

        console.log(response); 
      })
      .catch(error => {
       
        console.error(error.response.data); 
      });
  
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal open={showModal} onClose={handleClose}  className='custom-modal'>
      <div className="modal-container " >
        <Typography variant="h6" component="h2" gutterBottom className="text">
          Edit
        </Typography>
        <form onSubmit={handleFormSubmit} className="modal-form">
            <div className="wrap_two">
          <TextField
            label="Order Currency"
            value={ordercurrency}
            className="textInput"
            onChange={(event) => setOrderCurrency(event.target.value)}
            variant="outlined"
            style={{ marginBottom: '16px' }}
            InputProps={{
              style: { paddingLeft: '15px' },
            }}
            fullWidth
          />
          <TextField
            label="Company Code"
            value={companyCode}
            className="textInput"
            onChange={(event) => setCompanyCode(event.target.value)}
            variant="outlined"
            style={{ marginBottom: '16px' }}
            InputProps={{
              style: { paddingLeft: '15px' },
            }}
            fullWidth
          />
          </div>
          <TextField
            label="Distribution Channel"
            value={distributionChannel}
            className="lastinput"
            onChange={(event) => setDistributionChannel(event.target.value)}
            variant="outlined"
            style={{ marginBottom: '16px' }}
            InputProps={{
              style: { paddingLeft: '15px' },
            }}
            fullWidth
          />
          <div className="modal-buttons">
            <Button variant="contained" color="secondary" onClick={handleCancel} className='buttons'>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit"  className='buttons'>
              Edit
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;

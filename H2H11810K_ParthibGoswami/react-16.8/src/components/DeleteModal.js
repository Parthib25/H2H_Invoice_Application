import React, { useState } from 'react';
import { Modal, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import './DeleteModal.css';

const DeleteModal = ({ showModal, handleClose, handleSave, selectedRow }) => {
  const handleCancel = () => {
    handleClose();
  };

  const handleDelete = () => {
    selectedRow.forEach((rowId) => {
        const data = {
            "no": rowId,
          };
      axios
        .post('http://localhost:8080/h2h_milestone_3/deleteInvoice', data)
        .then((response) => {

          console.log(`Delete request successful for rowId: ${rowId}`, response);
        })
        .catch((error) => {
          
          console.error(`Error deleting record with rowId: ${rowId}`, error);
        })
        .finally(() => {

          handleClose();
        });
    });
  };

  return (
    <Modal open={showModal} onClose={handleClose} className="custom-modal">
      <div className="modal-container">
        <Typography variant="h6" component="h2" gutterBottom className="text">
          Delete Records?
        </Typography>
        <Typography variant="body1" component="h2" gutterBottom className="text">
          Are you sure you want to delete these record[s]?
        </Typography>

        <div className="modal-buttons">
          <Button variant="contained" color="secondary" onClick={handleCancel} className="buttons">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleDelete} className="buttons">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

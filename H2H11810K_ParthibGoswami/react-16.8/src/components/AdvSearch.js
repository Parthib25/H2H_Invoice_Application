import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button, Grid, Tooltip } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  filtersContainer: {
    backgroundColor: 'lightblue',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'right',
  },
}));

const AdvSearch = ({ isOpen, onClose, onSave }) => {
  const classes = useStyles();
  const [customerOrderId, setCustomerOrderId] = useState('');
  const [customerNo, setCustomerNo] = useState('');
  const [salesOrg, setSalesOrg] = useState('');
  const [filters, setFilters] = useState([]);
 const [search,setSearch]=useState(true);
  const handleAddFilter = () => {
    if (filters.length >= 12) {
      setSearch(false);
    }

    const filter = `${salesOrg}=value`; 
    setFilters((prevFilters) => [...prevFilters, filter]);
    setSalesOrg('');
  };

  const handleEdit = async () => {
    const filtersString = filters.join('&');

    try {
      const response = await axios.get(`http://localhost:8080/readAll?${filtersString}`);
      const data = response.data;
      onSave(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={classes.modal}>
        <h2>Advanced Search</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Customer Order ID"
              value={customerOrderId}
              onChange={(e) => setCustomerOrderId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Customer No"
              value={customerNo}
              onChange={(e) => setCustomerNo(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sales Org"
              value={salesOrg}
              onChange={(e) => setSalesOrg(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.filtersContainer}>
              <p>ℹ️ Select up to 12 optional filters</p>
              {filters.map((filter, index) => (
                <Tooltip title={`Tooltip ${index}`} key={index}>
                  <span>{filter}</span>
                </Tooltip>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <Button variant="contained" color="primary" onClick={handleEdit} disabled={search}>
              Edit
            </Button>
            <Button variant="contained" color="default" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default AdvSearch;

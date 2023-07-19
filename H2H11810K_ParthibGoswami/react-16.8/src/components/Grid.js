import React from 'react';
import { DataGrid,GridFooterContainer } from '@mui/x-data-grid';
import { makeStyles, Checkbox ,Button} from '@material-ui/core';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import './Grid.css';
import axios from 'axios';
const useStyles = makeStyles({
  root: {
    backgroundColor: '#666666',
    color: 'white !important',
    height: '76vh',
    '& .MuiDataGrid-scrollbar': {
      backgroundColor: 'green',
    },
    '& .MuiTablePagination': {
      '& .MuiTypography-root': {
        color: 'white !important',
      },
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: 'grey',
    },
    '& .MuiCheckbox-root': {
      color: 'white !important',
    },
    '& .MuiCheckbox-colorPrimary.Mui-checked': {
      color: 'orange !important',
    },
    '& .MuiTablePagination-caption.MuiTypography-root': {
      color: 'white !important',
    },
    '& .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit': {
      color: 'white !important',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnSeparator': {
      display: 'none !important',
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
      whiteSpace: 'normal !important',
      wordWrap: 'break-word !important',
      lineHeight: 'normal',
      textAlign: 'left',
    },
    '&.MuiDataGrid-root':{
      border:'none',
      borderRadius:'0px',
    },
    '&.MuiDataGrid-root .MuiDataGrid-footerContainer':{
         minHeight:'25px',
         height:'25px'
    }
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: '5px',
  },
  button: {
    margin: '2%',
    backgroundColor: 'orange',
    color:'white',
    fontWeight:'bold',
  },
});



const Grid = () => {
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedRowsl,setSelectedRowsl]=React.useState([]);
    const [pageSize, setPageSize] = React.useState(8);
    const [initialLoad, setInitialLoad] = React.useState(true);
    const [buttonsEnabled, setButtonsEnabled] = React.useState(false);
    const [delbuttonsEnabled, setdelButtonsEnabled] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [delModal,setDelModal]=React.useState(false);
    
    const handleClose = () => {
      setShowModal(false);
    };
    const handleCloseDel = () => {
      setDelModal(false);
    };
    const handleEdit = () => {
      setShowModal(true);
    };
    const handleSave=()=>{
      console.log("saved!");
    }

    const handleDelete=()=>{
      setDelModal(true)
    }
    const handleSelectionModelChange = React.useCallback((newSelectionModel) => {
      const selectedRowIds = newSelectionModel;
      setSelectedRowsl(selectedRowIds);
      const selectedRows = selectedRowIds.map((rowId) => {
        return rows.find((row) => row.id === rowId); 
      });
      setSelectedRows(selectedRows);
    }, [rows]);
  

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/h2h_milestone_3/readAll`);
          const data = response.data;
          setRows(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      if (initialLoad) {
        fetchData();
        setInitialLoad(false);
      }
    }, [initialLoad]);
    React.useEffect(() => {
      const isSingleRowSelected = selectedRows.length === 1;
      setButtonsEnabled(isSingleRowSelected);

     const isSingleRowSelect = selectedRows.length !== 0;
      setdelButtonsEnabled(isSingleRowSelect);
    }, [selectedRows,selectedRowsl]);

    
    const handlerefresh=()=>{
      setRows([]);
      setInitialLoad(true);
    }
 
   
    
  const column=
  [
    {
      "field": "id",
      "headerName": "SL NO",
      "width": 100,
    },
    {
      "field": "cust_order_id",
      "headerName": "CUSTOMER ORDER ID",
      "width": 140
    },
    {
      "field": "sales_org",
      "headerName": "SALES ORG",
      "width": 110
    },
    {
      "field": "distribution_channel",
      "headerName": "DISTRIBUTION CHANNEL",
      "width": 260
    },
    {
      "field": "company_code",
      "headerName": "COMPANY CODE",
      "width": 130
    },
    {
      "field": "order_creation_date",
      "headerName": "ORDER CREATION DATE",
      "width": 250
    },
    {
      "field": "order_amount",
      "headerName": "ORDER AMOUNT",
      "width": 150
    },
    {
      "field": "amount_in_usd",
      "headerName": "AMOUNT",
      "width": 150
    },
    {
      "field": "order_currency",
      "headerName": "ORDER CURRENCY",
      "width": 150
    },
    {
      "field": "customer_no",
      "headerName": "CUSTOMER NUMBER",
      "width": 250
    },
    {
      "field": "division",
      "headerName": "DIVISION",
      "width": 200
    },
    {
      "field": "released_credit_value",
      "headerName": "RELEASED CREDIT VALUE",
      "width": 200
    },
    {
      "field": "purchase_order_type",
      "headerName": "PURCHASED ORDER TYPE",
      "width": 200
    },
    {
      "field": "order_creation_time",
      "headerName": "ORDER CREATION TIME",
      "width": 200
    },
   
    {
      "field": "requested_delivery_date",
      "headerName": "REQUESTED DELIVERY DATE",
      "width": 200
    },
  ]
  


  return (
    <div className='wrapper'>
      <DataGrid
        components={{
          Checkbox: Checkbox,
        }}
        rows={rows}
        columns={column}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        showPagination={true}
        checkboxSelection
        disableSelectionOnClick
        disableColumnMenu
        rowsPerPageOptions={[8,10,20,30,40,50,100]}
        onSelectionModelChange={handleSelectionModelChange}
        classes={{ root: classes.root }}
      />
    <GridFooterContainer>
      <div className="footer2">
        <Button variant="contained" classes={{root:classes.button}} onClick={handlerefresh} >
          Refresh
        </Button>
        <Button variant="contained" classes={{root:classes.button}}  disabled={!buttonsEnabled} onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="contained" classes={{root:classes.button}}  disabled={!delbuttonsEnabled} onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" classes={{root:classes.button}}   disabled={!buttonsEnabled}>
          Predict
        </Button>
      </div>
      {(buttonsEnabled)&&<EditModal showModal={showModal} handleClose={handleClose} selectedRow={selectedRows} handleSave={handleSave} /> }
      {(delbuttonsEnabled)&&<DeleteModal showModal={delModal} handleClose={handleCloseDel} selectedRow={selectedRowsl} handleSave={handleSave} /> }
    </GridFooterContainer>
    
    </div>
  );
};

export default Grid;

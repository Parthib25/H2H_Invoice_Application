import React from 'react';
import { makeStyles, Button, InputBase } from '@material-ui/core';
import { useState } from 'react';
import Grid from './Grid';
import Grid2 from './Grid2';
import axios from 'axios';
import AddForm from './AddForm';
import MainFooter from './MainFooter';
import Graph from './Graph';
import AdvSearch from './AdvSearch';
const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    backgroundColor: '#666666',
  },
  button: {
    color: 'white',
    borderRadius:'0px !important',
    borderBottom: '2px solid transparent',
    '&:hover': {
      borderBottom: `2px solid white`,
      borderRadius:'0px !important',
    },
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5, 1),
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  advancedButton: {
    marginLeft: theme.spacing(2),
    color: 'white',
    backgroundColor: 'green',
    width:'100px',
    fontWeight:'bolder'
  },
}));

const Header = () => {
  const classes = useStyles();

  const [ison, setison] = useState({
    h: true,
    a: false,
    s: false,
    n: false,
  });
  const [adv, setadv] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [rows, setrows] = useState([]);

  const updateHome = () => {
    setison({
      ...ison,
      h: true,
      a: false,
      s: false,
      n: false,
    });
  };

  const updateAdd = () => {
    setison({
      ...ison,
      h: false,
      a: true,
      s: false,
      n: false,
    });
  };

  const updateSearch = () => {
    setison({
      ...ison,
      h: false,
      a: false,
      s: true,
      n: false,
    });
  };

  const updatean = () => {
    setison({
      ...ison,
      h: false,
      a: false,
      s: false,
      n: true,
    });
  };
  const save=(data)=>{
   setadv(false);
  }

  const close=(data)=>{
    setadv(false);
   }
  
  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const performSearch = async () => {
    if (searchValue) {
      await axios
        .get(`http://localhost:8080/h2h_milestone_3/read`, {
          params: {
            id: searchValue,
          },
        })
        .then((response) => {
          const {data}=response
          console.log(data)
          setrows(data);
          setison({
            ...ison,
            h: false,
            a: false,
            s: true,
            n: false,
          });
        })
        .catch((error) => {
          console.error('Error fetching data', error);
        });
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <div>
          <Button className={classes.button} onClick={updateHome}>
            Home Page
          </Button>
          <Button className={classes.button} onClick={updateAdd}>
            Add Data
          </Button>
          {ison.s && (
            <Button className={classes.button} onClick={updateSearch}>
              Search Results
            </Button>
          )}
          <Button className={classes.button} onClick={updatean}>
            Analytics View
          </Button>
        </div>
        <div className="searchBox" style={{ width: '25vw', display: 'flex', flexDirection: 'row' }}>
          <div className={classes.searchContainer}>
            <InputBase
              className={classes.searchInput}
              placeholder="Search Customer ID"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKeyDown} 
            />
          </div>
          <Button className={classes.advancedButton} onClick={()=>setadv(true)}>Advanced Search</Button>
        </div>
      </div>
      {ison.a&& <AddForm/>}
      {ison.h && <Grid />}
      {ison.s && <Grid2 Rows={rows} />}
      {ison.n&&<Graph/>}
      {adv&&<AdvSearch isOpen={adv} onClose={close} onSave={save}/>}
      <MainFooter/>
    </div>
  );
};

export default Header;
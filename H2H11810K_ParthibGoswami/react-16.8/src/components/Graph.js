import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { TextField, Button} from '@material-ui/core';
import './Graph.css'
const Graph = () => {
  const [chartData, setChartData] = useState([]);
  const [distributionChannel, setDistributionChannel] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [closedInvoices, setClosedInvoices] = useState(0);
  const [openInvoices, setOpenInvoices] = useState(0);
  useEffect(() => {
    fetchData();
  },[]);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/h2h_milestone_3/bargraph');
      const data = response.data;
      setChartData(data);
      calculateInvoiceStatus(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  

  const calculateInvoiceStatus = (data) => {
    const currentDate = new Date();
    let closedCount = 0;
    let openCount = 0;

    data.forEach((item) => {
      const requestedDeliveryDate = new Date(item.requested_delivery_date);
      if (requestedDeliveryDate < currentDate) {
        closedCount++;
      } else {
        openCount++;
      }
    });

    setClosedInvoices(closedCount);
    setOpenInvoices(openCount);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Find the index of the distribution channel in the already loaded data
    const distributionChannelIndex = chartData.findIndex(
      (item) => item.distributionChannel === distributionChannel
    );

    if (distributionChannelIndex !== -1) {
      // Get the total amount for the selected distribution channel
      const totalAmount = parseFloat(chartData[distributionChannelIndex].totalAmount);

      // Fetch data for the customer ID from the server
      try {
        const response = await axios.get(
          `http://localhost:8080/h2h_milestone_3/read?id=${customerNumber}`
        );
        const data = response.data;
        setChartData([{ distributionChannel, totalAmount }]);
        calculateInvoiceStatus(data);
        console.log(data);
      } catch (error) {
        console.log('Error fetching filtered data:', error);
      }

      // Update the chart series data with the selected distribution channel's total amount
      options.series[0].data[distributionChannelIndex] = totalAmount;
    }
  };

  const options = {
    chart: {
      type: 'column',
      height: 400,
      width: 400,
      backgroundColor: '#666666',
    },
    title: {
      text: 'Total Order Amount by Distribution Channel',
      style: {
        color: '#ffffff',
      },
    },
    xAxis: {
      categories: chartData.map((item) => item.distributionChannel).reverse(),
      labels: {
        style: {
          color: '#ffffff',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Total Amount',
        style: {
          color: '#ffffff',
        },
      },
    },
    series: [
      {
        name: 'Total Amount',
        data: chartData.map((item) => parseFloat(item.totalAmount)).reverse(),
        color: 'orange',
      },
    ],
  };

  const pieChartOptions = {
    chart: {
      type: 'pie',
      height: 400,
      width: 400,
      backgroundColor: '#666666',
    },
    title: {
      text: 'Invoice Status',
        style: {
          color: '#ffffff',
        },
    },
    series: [
      {
        name: 'Invoices',
        data: [
          {
            name: 'Closed',
            y: closedInvoices,
          },
          {
            name: 'Open',
            y: openInvoices,
          },
        ],
        color: 'green',
      },
    ],
  };

  return (
    <div className='wrapper_graph'>
        <div className="container">
      <form onSubmit={handleSubmit}>
          
            <TextField
              label="Distribution Channel"
              value={distributionChannel}
              onChange={(event) => setDistributionChannel(event.target.value)}
              fullWidth
            />
          
         
            <TextField
              label="Customer Number"
              value={customerNumber}
              fullWidth
              onChange={(event) => setCustomerNumber(event.target.value)}
            />
          
         
            <Button type="submit" variant="contained" color="primary" style={{ borderColor: '#ffffff', color: '#ffffff', backgroundColor:'transparent', width:'100%' }}>
              Submit
            </Button>
           
          
       
      </form>
      </div>
      <div style={{ marginTop: '40px' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div style={{ marginTop: '40px' }}>
        <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default Graph;

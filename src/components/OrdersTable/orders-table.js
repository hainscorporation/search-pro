import React, {
  useState,
  useEffect
} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  
  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);
  
  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleClick = (event, id) => {
    
    console.log(id);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reference</TableCell>
            <TableCell align="right">Requested</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Ordered</TableCell>
            <TableCell align="right">Results Sent</TableCell>
            <TableCell align="right">Requested by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              hover
              key={row._id}
              onClick={(event) => handleClick(event, row._id)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ref}
              </TableCell>
              <TableCell align="right">{row.requested}</TableCell>
              <TableCell align="right">{row.searchname}</TableCell>
              <TableCell align="right">{row.ordered}</TableCell>
              <TableCell align="right">{row.resultsent}</TableCell>
              <TableCell align="right">{row.requestedby}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
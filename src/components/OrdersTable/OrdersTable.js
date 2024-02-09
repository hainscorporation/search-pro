import React, { useState, useEffect, useReducer } from 'react';
import './OrdersTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import OrderModal from '../OrderModal/OrderModal';

import OrderReducer from "../../reducers/OrderReducer"
import { dateFormatter } from '../../utils/formatDates';

const initalState = { isOpen: false }

export default function OrdersTable() {
  const [state, dispatch] = useReducer(OrderReducer, initalState)

  const [orders, setOrders] = useState([])
  const [orderDialogOpen, setOrderDailogOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(0)
  
  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);
  
  // GET all orders
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  };

  const handleOrderClick = (event, id) => {
    // dispatch(OpenOrderDialog(true))
    setSelectedOrderId(id)
    setOrderDailogOpen(true)
  }

  const handleDialogClose = () => {
    setOrderDailogOpen(false)
  }

  return (
    <>
      <TableContainer className='orders-table-container' component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className='orders-table-head'>
            <TableRow>
              <TableCell>Reference</TableCell>
              <TableCell>Requested</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Ordered</TableCell>
              <TableCell>Results Sent</TableCell>
              <TableCell>Requested by</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='orders-table-body'>
            {orders.map((row) => (
              <TableRow
                hover
                key={row._id}
                onClick={(event) => handleOrderClick(event, row._id)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.ref}
                </TableCell>
                <TableCell>{row.requested ? dateFormatter(row.requested): ''}</TableCell>
                <TableCell>{row.searchName}</TableCell>
                <TableCell>{row.ordered ? dateFormatter(row.ordered) : ''}</TableCell>
                <TableCell>{row.resultSent ? dateFormatter(row.resultSent) : ''}</TableCell>
                <TableCell>{row.requestedBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrderModal orderId={selectedOrderId} isOpen={orderDialogOpen} handleClose={handleDialogClose} />
    </>
  );
}
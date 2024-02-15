import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { Context } from '../../store/Store'
import OrderModal from '../OrderModal/OrderModal';
import SortingTableHead from './SortingTableHead/SortingTableHead';

import { dateFormatter } from '../../utils/formatDates';
import { stableSort, getComparator } from '../../utils/sort';
import './OrdersTable.css'

export default function OrdersTable() {

  const [state, dispatch] = useContext(Context)
  const { showAllOrders, searchTerm } = state

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('requested');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [orders, setOrders] = useState([])
  const [orderDialogOpen, setOrderDailogOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(0)

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [showAllOrders])

  useEffect(() => {
    if (searchTerm === '') {
      fetchOrders() 
    } else {
      fetchFilteredOrdersByTerm({ searchTerm: searchTerm });
    }
  }, [searchTerm])

  const visibleRows = useMemo(
    () =>
      stableSort(orders, getComparator(sortOrder, sortBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [sortOrder, sortBy, page, rowsPerPage, orders],
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  // GET all orders list
  const fetchOrders = async () => {
    const url = showAllOrders ? 'orders' : 'filtered-orders'

    try {
      const response = await fetch(`http://localhost:8000/${url}`)
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  };

    // GET all orders
    const fetchFilteredOrdersByTerm = async (body) => {
      try {
        const response = await axios.post(`http://localhost:8000/orders-by-reference`, body)
        console.log(response.data)
        const data = await response.data
        setOrders(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    };

  const handleRequestSort = (event, property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const handleOrderClick = (event, id) => {
    // dispatch(OpenOrderDialog(true))
    setSelectedOrderId(id)
    setOrderDailogOpen(true)
  }

  const handleDialogClose = () => {
    setOrderDailogOpen(false)
  }

  const OrderModalMemo = useMemo(() => {
    if (orderDialogOpen) {
      return <OrderModal orderId={selectedOrderId} isOpen={orderDialogOpen} handleClose={handleDialogClose} />;
    }
    return null;
  }, [orderDialogOpen, selectedOrderId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <>
      <TableContainer className='orders-table-container' component={Paper}>
        <Table aria-label="simple table">
          <SortingTableHead
            order={sortOrder}
            orderBy={sortBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody className='orders-table-body'>
            {visibleRows.map((row) => (
              <TableRow
                hover
                key={row._id}
                tabIndex={-1}
                onClick={(event) => handleOrderClick(event, row._id)}
              >
                <TableCell component="th" scope="row">
                  {row.ref}
                </TableCell>
                <TableCell>{row.requested ? dateFormatter(row.requested) : ''}</TableCell>
                <TableCell>{row.searchName}</TableCell>
                <TableCell>{row.ordered ? dateFormatter(row.ordered) : ''}</TableCell>
                <TableCell>{row.resultSent ? dateFormatter(row.resultSent) : ''}</TableCell>
                <TableCell>{row.requestedBy}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {OrderModalMemo}
    </>
  );
}
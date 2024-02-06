import React, { useReducer, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import OrderReducer from "../../reducers/OrderReducer"
import OpenOrderDialog from '../../actions/Actions';

const initalState = { isOpen: true }

export default function OrderModal({orderId, isOpen, handleClose}) {

  const [state, dispatch] = useReducer(OrderReducer, initalState)
  //const { isOpen } = state

  const [open, setOpen] = useState(isOpen);
  const [selectedOrder, setSelectedOrder] = useState({})
/*   const handleClickOpen = () => {
    setOpen(true);
  }; */

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId]);

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen]);

  // GET order by id
  const fetchOrderById = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/orders/${orderId}`)
      const data = await response.json()
      setSelectedOrder(data)
    } catch (error) {
      console.error(`Error fetching the order with id: ${orderId}`, error)
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Ref: {selectedOrder.ref} {selectedOrder.searchName}</h2>
          <label id="parent-modal-description">
            Requested by:
          </label>
          <label>{selectedOrder.requestedBy}</label>

          {selectedOrder.buyers 
          ? 
            selectedOrder.buyers.map((o) => (
              <>
                <label id="parent-modal-description">
                  Buyer:
                </label>
                <label>{o.name}</label>
              </>
            )) 
            : null
          }

          {selectedOrder.sellers 
          ? 
            selectedOrder.sellers.map((o) => (
              <>
                <label id="parent-modal-description">
                  Seller:
                </label>
                <label>{o.name}</label>
              </> 
            ))
            : null
          }

          <label id="parent-modal-description">
            Property:
          </label>
          <label>{selectedOrder.propertyAddress}</label>

          <label id="parent-modal-description">
            Lot on Plan:
          </label>
          <label>{selectedOrder.lot}/{selectedOrder.planType}{selectedOrder.plan}</label>

          <label id="parent-modal-description">
            Price:
          </label>
          <label>{selectedOrder.price}</label>

        </Box>
      </Modal>
    </React.Fragment>
  );
}
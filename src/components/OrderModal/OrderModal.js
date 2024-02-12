import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

import "./OrderModal.css";

import OrderReducer from "../../reducers/OrderReducer";
import { dateFormatter } from "../../utils/formatDates";

const initalState = { isOpen: true };

export default function OrderModal({ orderId, isOpen, handleClose }) {
  const [state, dispatch] = useReducer(OrderReducer, initalState);
  //const { isOpen } = state

  const [open, setOpen] = useState(isOpen);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // GET order by id
  const fetchOrderById = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/orders/${orderId}`);
      const data = await response.json();
      setSelectedOrder(data);
    } catch (error) {
      console.error(`Error fetching the order with id: ${orderId}`, error);
    }
  };

  // UPDATE order field
  const updateOrderField = async (orderId, body) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/orders/${orderId}`,
        body
      );
      /* const data = await response.json();
      console.log(data); */
    } catch (error) {
      console.error(`Error updating order field with id: ${orderId}`, error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };

  const handleOrderedClick = () => {
    const now = new Date().toISOString();
    updateOrderField(orderId, { ordered: now });
  };

  const handleResultSentClick = () => {
    const now = new Date().toISOString();
    updateOrderField(orderId, { resultSent: now });
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className='order-modal-container' sx={{ ...style }}>
          <div className="order-modal-top-bar">
            Ref: {selectedOrder.ref}
          </div>
          <div className="order-modal-inner">
            <div className="order-modal-info">
              <h2 id="parent-modal-title">
                {selectedOrder.searchName}
              </h2>
              <div>
                <label className="order-modal-text-label">Requested by: {selectedOrder.requestedBy}</label>
              </div>

              <div className="order-modal-list">
                {selectedOrder.buyers
                  ? selectedOrder.buyers.map((o) => (
                      <label key={o.name} className="order-modal-text-label">Buyer: {o.name}</label>
                    ))
                  : null}
              </div>

              <div className="order-modal-list">
                {selectedOrder.sellers
                  ? selectedOrder.sellers.map((o) => (
                      <label key={o.name} className="order-modal-text-label">Seller: {o.name}</label>
                    ))
                  : null}
              </div>

              <div>
                <label className="order-modal-text-label">Property: {selectedOrder.propertyAddress}</label>
              </div>

              <div>
                <label className="order-modal-text-label">Lot on Plan: {selectedOrder.lot}/{selectedOrder.planType}{selectedOrder.plan}</label>
              </div>

              <div>
                <label className="order-modal-text-label">Price: {selectedOrder.price}</label>
              </div>
            </div>
            <div
              className="order-modal-actions-bar"
            >
              <Button
                variant="outlined"
                onClick={handleOrderedClick}
                disabled={!!selectedOrder.ordered}
              >
                {selectedOrder.ordered
                  ? `ORDERED ${dateFormatter(selectedOrder.ordered)}`
                  : 'MARK ORDERED'}
              </Button>
              <Button
                variant="outlined"
                onClick={handleResultSentClick}
                disabled={!selectedOrder.ordered || !!selectedOrder.resultSent}
              >
                {selectedOrder.resultSent
                  ? `SENT ${dateFormatter(selectedOrder.resultSent)}`
                  : 'SEND RESULTS TO CLIENT'}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

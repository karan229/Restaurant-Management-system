import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar.jsx';


const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://restaurant-management-system-jpbc.onrender.com/api/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching orders');
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://restaurant-management-system-jpbc.onrender.com/api/orders/${orderId}/status`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("Record Updated!")
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="table-container">
      <NavBar onLogout={() => alert('Logged out')} />
      <table className="responsive-table">
        <thead>
          <tr>
            <th className='idO'>Order ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className='idO'>{order._id}</td>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>{order.phoneNumber}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Preparing">Preparing</option>
                  <option value="Serve">Serve</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrder;
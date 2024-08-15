import React, { useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import UpdateItem from "./UpdateItem.jsx";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("https://restaurant-management-system-jpbc.onrender.com/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://restaurant-management-system-jpbc.onrender.com/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdate = () => {
    fetchItems();
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const toggleEditing = (item) => {
    setEditingItem(item);
  };

  return (
    <div className="ItemList">
      <div className="table-responsive">
        <table className="table-list">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>In Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr className="table-row" key={item._id}>
                <td className="first-column">{item.ItemName}</td>
                <td>
                  {item.image && (
                    <img
                      src={`data:${item.imageType};base64,${Buffer.from(
                        item.image.data
                      ).toString("base64")}`}
                      className="item-img"
                      alt="item"
                    />
                  )}
                </td>
                <td>{`${item.quantity || 0}kg`}</td>
                <td>{`$${item.Price}` || "$" + 148.99}</td>
                <td><span className={`${item.Available ? "Available" : "NotAvailable"} `}></span></td>
                <td className="last-column">
                  <button onClick={() => toggleEditing(item)}>Update</button>
                  <button
                    style={{ background: "red" }}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  {editingItem && editingItem._id === item._id && (
                    <UpdateItem
                      item={item}
                      onUpdate={handleUpdate}
                      onCancel={handleCancel}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;

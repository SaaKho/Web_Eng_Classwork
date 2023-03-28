import { useState } from "react";
import "./Question1.css";

// This is the code for Question 1
// The function Question1() is the main function it calls the other functions
function Question1() {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const [newItemPriority, setNewItemPriority] = useState(1);

  const addItem = () => {
    const newItem = {
      text: newItemText,
      priority: newItemPriority,
    };
    setItems([...items, newItem]);
    setNewItemText("");
    setNewItemPriority(1);
  };

  const removeItem = (indexToRemove) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  const updatePriority = (indexToUpdate, newPriority) => {
    const updatedItems = [...items];
    updatedItems[indexToUpdate].priority = newPriority;
    setItems(updatedItems);
  };

  const moveItemToTop = (indexToMove) => {
    const itemToMove = items[indexToMove];
    const updatedItems = [...items];
    updatedItems.splice(indexToMove, 1);
    updatedItems.unshift(itemToMove);
    setItems(updatedItems);
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Widget Control</h1>
      <ul className="wishlist-items">
        {items.map((item, index) => (
          <li key={index} className="wishlist-item">
            <button
              className="wishlist-item-button"
              onClick={() => removeItem(index)}
            >
              Remove
            </button>
            <span className="wishlist-item-text">{item.text}</span>
            <input
              className="wishlist-item-priority"
              type="number"
              value={item.priority}
              onChange={(event) =>
                updatePriority(index, parseInt(event.target.value))
              }
            />
            <button
              className="wishlist-item-button"
              onClick={() => moveItemToTop(index)}
            >
              Move to Top
            </button>
          </li>
        ))}
      </ul>
      <div className="wishlist-form">
        <label>
          New item:
          <input
            className="wishlist-form-input"
            type="text"
            value={newItemText}
            onChange={(event) => setNewItemText(event.target.value)}
          />
        </label>
        <label>
          Priority:
          <input
            className="wishlist-form-input"
            type="number"
            value={newItemPriority}
            onChange={(event) =>
              setNewItemPriority(parseInt(event.target.value))
            }
          />
        </label>
        <button className="wishlist-form-button" onClick={addItem}>
          Add
        </button>
      </div>
    </div>
  );
}

export default Question1;
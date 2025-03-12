import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);

  function toggleSoldOut() {
    setIsSoldOut((prev) => !prev);
  }

  function handlePriceChange(e) {
    setNewPrice(e.target.value);
  }

  function updatePrice() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((res) => res.json())
      .then(onUpdatePlant);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => onDeletePlant(plant.id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <input
        type="number"
        step="0.01"
        value={newPrice}
        onChange={handlePriceChange}
      />
      <button onClick={updatePrice}>Update Price</button>
      <button className={isSoldOut ? "" : "primary"} onClick={toggleSoldOut}>
        {isSoldOut ? "Out of Stock" : "In Stock"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;

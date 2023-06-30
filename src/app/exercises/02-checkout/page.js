"use client";
import React from "react";

import DATA from "./data";
import reducer from "./reducer";
import StoreItem from "./StoreItem";
import CheckoutFlow from "./CheckoutFlow";
import "./styles.css";

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, []);
  const [status, setStatus] = React.useState("loading");

  React.useEffect(() => {
    const savedItems = window.localStorage.getItem("cart-items");

    if (savedItems !== null) {
      dispatch({
        type: "load-initial-items",
        items: JSON.parse(savedItems),
      });
    }

    setStatus("idle");
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("cart-items", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: "add-item",
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          status={status}
          handleDeleteItem={(item) =>
            dispatch({
              type: "delete-item",
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;

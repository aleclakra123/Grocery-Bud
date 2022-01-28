import React, { useReducer, useState } from "react";
import List from "./List";
import Alert from "./Alert";

const initialState = {
  items: [],
  mode: "add",
  editId: -1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "edit":
      const index = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (index >= 0) {
        return {
          ...state,
          mode: "modify",
          editId: state.items[index].id,
        };
      }
      return { ...state };
    case "modify":
      const newItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return {...item, itemName: action.payload.itemName}
        }
        return item;
      });
      return {
        ...state,
        mode: "add",
        items: newItems,
        editId: -1,
      };
    case "deleteAll":
      return { ...state, mode: "add", items: [], editId: -1 };
    case "delete":
      return {
        ...state,
        mode: "add",
        items: state.items.filter((item) => item.id !== action.payload),
        editId: -1,
      };
    case "add":
      return {
        ...state,
        mode: action.type,
        items: [...state.items, action.payload],
        editId: -1,
      };
    default:
      throw new Error();
  }
};

function App() {

  const [formValue, setFormValue] = useState("");
  const [showAlert, setAlert] = useState({show: false, type: "", message: ""});
  const [state, dispatcher] = useReducer(reducer, initialState);

  const removeAlert = ()=>{
    setAlert({...showAlert, show: false});
  }

  const editItem = (id, itemName) => {
    setFormValue(itemName);
    dispatcher({ type: "edit", payload: id });
  };

  const deleteItem = (id) => {
    setFormValue("");
    dispatcher({ type: "delete", payload: id });
    setAlert({...showAlert, show: true, type: "danger", message: "item deleted successfully"});
  };

  const clearItems = function () {
    setFormValue("");
    dispatcher({ type: "deleteAll" });
    setAlert({...showAlert, show: true, type: "danger", message: "items deleted successfully"});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue) {
      switch (state.mode) {
        case "modify":
          dispatcher({
            type: state.mode,
            payload: { id: state.editId, itemName: formValue },
          });
          setFormValue("");
          setAlert({...showAlert, show: true, type: "success", message: "item modified successfully"});
          break;
        case "add":
          dispatcher({
            type: state.mode,
            payload: { id: Date.now(), itemName: formValue },
          });
          setFormValue("");
          setAlert({...showAlert, show: true, type: "success", message: "item added successfully"});
          break;
        default:
          throw new Error();
      }
    } else {
      setAlert({...showAlert, show: true, type: "danger", message: "please enter an item"});
    }
  };

  return (
    <section className="section-center">
      <form className="grocery-form" action="" onSubmit={handleSubmit}>
        {showAlert.show && <Alert message={showAlert.message} type={showAlert.type} removeAlert={removeAlert} />}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {state.mode === "modify" ? "edit" : "submit"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <div className="grocery-items">
          {
            state.items.map(({ id, itemName }) => {
              return (
                <List
                  key={id}
                  id={id}
                  itemName={itemName}
                  editItem={editItem}
                  deleteItem={deleteItem}
                />
              );
            })
          }
          {
            state.items.length > 0 && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => {
                clearItems();
              }}>
              clear items
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;

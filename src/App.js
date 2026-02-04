import React, { useReducer, useEffect } from "react";
import "./styles.css";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

const initialState = {
  contacts: JSON.parse(localStorage.getItem("contacts")) || [],
  filter: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_CONTACT":
      if (state.contacts.find(c => c.name.toLowerCase() === action.payload.name.toLowerCase())) {
        alert(`${action.payload.name} вже є у списку`);
        return state;
      }
      return {
        ...state,
        contacts: [...state.contacts, { id: nanoid(), ...action.payload }]
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(state.contacts));
  }, [state.contacts]);

  const visibleContacts = state.contacts.filter(c =>
    c.name.toLowerCase().includes(state.filter.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "Arial" }}>
      <h1 style={{ color: "white" }}>Phonebook</h1>
      <ContactForm onAddContact={(name, number) => dispatch({ type: "ADD_CONTACT", payload: { name, number } })} />

      <h2 style={{ color: "white" }}>Contacts</h2>
      <Filter value={state.filter} onChange={(val) => dispatch({ type: "SET_FILTER", payload: val })} />
      <ContactList contacts={visibleContacts} onDelete={(id) => dispatch({ type: "DELETE_CONTACT", payload: id })} />
    </div>
  );
}

export default App;

import React, { useReducer } from "react";

const initialState = { name: "", number: "" };

function reducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_NUMBER":
      return { ...state, number: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function ContactForm({ onAddContact }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddContact(state.name, state.number);
    dispatch({ type: "RESET" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={state.name}
        onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
        placeholder="Name"
        required
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      />
      <input
        type="tel"
        value={state.number}
        onChange={(e) =>
          dispatch({ type: "SET_NUMBER", payload: e.target.value })
        }
        placeholder="Number"
        required
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default ContactForm;

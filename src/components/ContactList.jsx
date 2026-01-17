import React from "react";
import ContactItem from "./ContactItem";

function ContactList({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map((c) => (
        <ContactItem key={c.id} contact={c} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ContactList;

const { nanoid } = require("nanoid");

const fs = require("fs").promises;
const contactsPath = require("../../utils/contactsPath");

const addContact = async ({ name, email, phone }) => {
  const allContactsJSON = await fs.readFile(contactsPath, "utf8");
  // console.log(name, email, phone);
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  // console.log(newContact);
  let allContacts = JSON.parse(allContactsJSON);
  // console.log(allContacts);
  allContacts.push(newContact);
  const newContactsJSON = JSON.stringify(allContacts);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return JSON.stringify(newContact);
};

module.exports = addContact;

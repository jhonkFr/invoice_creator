import { databases } from "./config";
import { ID } from "appwrite";

const db = {};
const db_id = import.meta.env.VITE_AW_db;
const collections = [
  {
    dbId: db_id,
    id: import.meta.env.VITE_AW_invoices_list,
    name: "invoice_main",
  },
  {
    dbId: db_id,
    id: import.meta.env.VITE_AW_tbl_gen,
    name: "tacker",
  },
  {
    dbId: db_id,
    id: import.meta.env.VITE_AW_tbl_items,
    name: "tracker_items",
  },
  {
    dbId: db_id,
    id: import.meta.env.VITE_AW_users,
    name: "users",
  },
];

// console.log(db_id);

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, payload, permissions),
    update: (id, payload, permissions) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),
    delete: (id) => databases.deleteDocument(col.dbId, col.id, id),
    list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),
    get: (id) => databases.getDocument(col.dbId, col.id, id),
  };
});

export default db;

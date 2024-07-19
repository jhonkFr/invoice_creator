import { Client, Databases, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_AW_ENDPOINT)
  .setProject(import.meta.env.VITE_AW_project);

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };

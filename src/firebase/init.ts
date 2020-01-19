import * as admin from "firebase-admin";
import * as accountService from "./firebase-config.json";

export default admin.initializeApp({
  credential: admin.credential.cert(accountService as admin.ServiceAccount)
});
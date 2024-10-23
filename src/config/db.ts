import mongoose from "mongoose";
import { DBURI} from "./environment";

const db = async () => {
  try {
    const connection = await mongoose.connect(DBURI ? DBURI : '');
    console.log(`Connected to DB: ${connection.connection.host}`.blue);
  }catch(err) {
    console.log(err, 'Could not connect to DB'.red);
  }
}

export default db;

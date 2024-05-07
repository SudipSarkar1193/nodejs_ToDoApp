import mongoose from "mongoose";
const url = "mongodb://127.0.0.1:27017/project_01_databse"

import { config } from 'dotenv';

config({ path: './data/config.env' })
// mongoose.connect(url).then(()=>{
//     console.log("Connected to database")
// }).catch(
//     (err) =>console.log(err)
// )

// export default mongoose ;


export default async function connectToMongoDB() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    if (error instanceof mongoose.Error && error.name === 'MongoServerError') {
      console.error('MongoServerError:=>', error.message);
    } else {
      console.error('Error:=>', error.message);
    }
  }
}



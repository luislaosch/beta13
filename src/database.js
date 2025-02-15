import mongoose from "mongoose";
import config from './config.js'

mongoose.connect(config.MONGO_URI||"mongodb+srv://admin:admin@hackaton17.crbbn.mongodb.net/H17"
// ,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useCreateIndex: true
// }
)
    .then(db=>console.log("DB conectada"))
    .catch(error => console.log(error))
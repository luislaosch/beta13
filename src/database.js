import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/beta13"
// ,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useCreateIndex: true
// }
)
    .then(db=>console.log("DB conectada"))
    .catch(error => console.log(error))
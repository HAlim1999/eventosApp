const  mongoose =require("mongoose");
const  dotenv =require("dotenv");
dotenv.config({path: './.env'});


/* MOONGOSE SETUP */

const connectDB = async () => {
    try{
await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
console.log('Connected to MongoDB')

    }catch(error){console.log(error)}
}

module.exports={
    connectDB
}
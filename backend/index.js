import express from "express"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
import bookingRoute from './Routes/booking.js'

dotenv.config();

const app = express()
const path = import("path");
const port = process.env.PORT || 5000;

const corsOptions = {
    origin:true,
};

app.get('/', (req,res)=>{
    res.send('api is working');
});

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });

//DATABASE CONNECTION
mongoose.set('strictQuery', false) //if not done then the brorser will generate warning
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('MongoDb database connection is done')
    }

    catch(err) {
        console.log('Mongodb databse connection failed')
    }
}


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/doctors', doctorRoute)
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/bookings', bookingRoute)

app.listen(port, ()=>{
    connectDB();
    console.log('server is running on port ' + port);
})





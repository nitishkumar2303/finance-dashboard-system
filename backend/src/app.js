import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

//routes
import authRoute from './routes/auth.routes.js';
import recordRoute from './routes/record.routes.js';

const app = express();


//Middlewares
app.use(helmet()); 
app.use(cors());
app.use(express.json());


//routing
app.use('/api/auth' , authRoute);
app.use('/api/records', recordRoute);


app.get('/api/health', (req, res) => {
   res.status(200).json({
       success: true,
       message: "Finance Dashboard API is running properly"
   });
});

export default app;
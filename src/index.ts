import express from 'express';
import { router} from './routes/approutes';
import cors from 'cors';
const app = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
  origin: '*', 
  methods: '*',        
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));
app.use('/users',router);
app.use('/uploads', express.static('uploads'));
    app.get('/', (_req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => console.log(`Server is running on port ${port}`));   
import * as process from "process";
require('dotenv').config();
import express,{Express} from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 5001;

const app:Express = express();
app.use(cors());
app.use(express.json());

const startServer = () => {
    app.listen(PORT, ()=>{
        console.log(`Server started on ${PORT} port`);
    })
}
startServer();
import * as process from "process";
require('dotenv').config();
import express,{Express} from 'express';
import cors from 'cors';
import { CronJob } from 'cron';
import { initializeApp } from 'firebase/app';
import { getDatabase, get, set, ref, child } from 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
}

initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());

const autoIsKeyUsed = async()=>{
    await get(child(dbRef, `users`)).then(async(snapshot:any) => {
        if (snapshot.exists()) {
        const keys = Object.keys(snapshot.val());
        for(let i = 0; i < keys.length; i++){
            if(snapshot.val()[keys[i]].auto == 1 && snapshot.val()[keys[i]].info == 1){
                await set(ref(db,`users/${keys[i]}/isKeyUsed`), 2);
            }
        }
        }
    })
}

let auto: number = 0;

const job = new CronJob('0 0 9 * * *', () => {
    autoIsKeyUsed();
});

job.start();


const PORT = process.env.PORT || 5001;

const app:Express = express();
app.use(cors());

const startServer = () => {
    app.listen(PORT, ()=>{
        console.log(`Server started on ${PORT} port`);
    })
}
startServer();
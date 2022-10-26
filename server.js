const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
port = 3500;

app.use('/',require('./Routes/Routes'));

app.listen(port,()=>{
    console.log(`server is alive at ${port}`);
})


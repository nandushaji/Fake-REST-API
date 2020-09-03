const express = require('express');
const path = require('path');
//logger
const logger = require('./middleware/logger');
const app = express();

const PORT = process.env.PORT || 5000 ;
/*set a stat folder 
app.use(express.static(path.join(__dirname,"path")))
*/
//body-parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));
//api routes
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
});
app.use('/api/members', require('./routes/api/members'));
// init middleware
app.use(logger);
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
});
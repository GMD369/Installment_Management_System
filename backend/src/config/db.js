const sqllite3=require('sqlite3').verbose();
const path=require('path');

const dbPath=path.join(__dirname,'../../database/database.db');

const db=new sqllite3.Database(dbPath,(err)=>{
    if(err){
        console.error('Could not connect to database',err);
    }
    else{
        console.log('Connected to database');
    }
});

module.exports=db;
const express = require('express');
const members=require('../../Members')
const router = express.Router();
const uuid = require('uuid');

//get all members 
router.get('/',(req,res)=>{
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.json(members);
})
//get single member
router.get('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        res.json(...members.filter(member => member.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
});
//creatre member
router.post('/',(req,res)=>{
    let newMember = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
    };
    if(!newMember.name || !newMember.email){
        res.status(400).json({"msg?":"please incluse a name and email"});
    }
    else{
        members.push(newMember);
        res.json(members);
    }
})

module.exports = router;
// import express from 'express';
let express = require('express')
let router = express.Router()
let User=require('../models/contactModel')

router.get('/',(req,res)=>{
    //res.send("Hello SeoCho!!!")
    res.render('index',{name:"블록체인교육원"})
})

router.post('/signup',(req,res)=>{ //크롬에서 url접근하면 get방식으로 접근하기 때문에 콘솔창이나 postman으로 확인하자
    console.log(req.body[0],'배열 첫 번째') //postman으로 post한뒤 콘솔창 확인하자
    console.log(req.body[1],'배열 두 번째') 
    console.log(req.body[0].name) 
    console.log(req.body[0].email) 
    console.log(req.body[1].phone) 
    console.log(req.body[1].age) 
    res.send("Success")
    // [{
    //     "name":"신승철",
    //     "email":"서초@naver.com"
    // },
    // {
    //     "phone":"123456789",
    //     "age":"20"
    // }] postman 으로 보내는 body
})

//export default router;
module.exports = router;

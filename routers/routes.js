// import express from 'express';
let express = require('express')
let router = express.Router()
let User=require('../models/contactModel')
let List=require('../models/listModel')

router.get('/',(req,res)=>{ 
    //res.send("Hello SeoCho!!!")
    res.render('index',{name:"블록체인교육원"})
})

router.post('/signup',(req,res,next)=>{ //next인자는 함수가 담기는데 그 함수를 실행하면 페이지를 다음으로 넘긴다.
    //크롬에서 url접근하면 get방식으로 접근하기 때문에 콘솔창이나 postman으로 확인하자

    User.findOne({email:req.body.email},(err,user)=>{//전달 받은 value를 한개 찾는 메소드(전체를 찾으려면 find) ,비동기 처리(동기화)를 위해 콜백함수 사용
        if(err){ //에러발생시 에러표시
            return next(err)
        } else if(user) { //이메일이 존재하면 실행
            return res.send("이미 등록된 유저의 이메일입니다.")
        } else{ //이메일이 존재하지 않으면 아래의 db에 등록하는 함수 실행
            let contact= new User(); //빈 객체를 생성
            contact.name = req.body.name
            contact.password = req.body.password
            contact.email = req.body.email
            contact.gender = req.body.gender
            contact.phone = req.body.phone
            contact.save((err)=>{
                if(err){
                    res.json(err)
                } else{
                    res.json({
                        message:"New Contact created",
                        data:contact
                    })
                }
            })
        }
        
    }) 
})


router.post('/login',(req,res,next)=>{
    let id = req.body.id
    let password = req.body.password
    
    User.findOne({email:id},(err,user)=>{
        if(err) return next(err)
        else if(!user) return res.send('User not founded')
        else {
            if(user.password!=password) {
                res.send('Password is invalid')
            } else {
                res.send(`Welcome to My world ${user.name}~`)
            }
        }
    })
})
    

router.post('/list',(req,res,next)=>{ 
    let list= new List(); 
    list.title = req.body.title
    list.contents = req.body.contents
    list.author = req.body.author
    list.save((err)=>{ //db의 save메소드를 사용해야 db에 저장된다.
        if(err){
            next(err)
        } else{
            // res.json(list) 아래와 같은 코드
            res.json({ 
                message:"New post created",
                data:list
            })
        }
    })
}) 

router.get('/list',(req,res,next)=>{ //get메소드 'list'가 있어야 url에서 입력하고 게시판 입력하는 페이지를 보여준다.
    res.render('inputList')
})

router.get('/search',(req,res,next)=>{ //List table에 있는 모든 데이터들을 불러온다.
    List.find((err,data)=>{
        if(err) return next(err)
        else return res.json(data) //json형식으로 응답한다.
    })
})

// export default router;
module.exports = router;

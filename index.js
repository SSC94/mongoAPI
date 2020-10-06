require('dotenv').config()
//import User from './models/contactModel';
//import router from './routers/routes';
//require('./models/contactModel');
let apiRouter = require('./routers/routes');
let path = require('path');
let cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser'); //express설치할때 자동으로 설치됬다.

let app = express()
let mongoose = require('mongoose')

app.set('views',path.resolve(__dirname+'/views')) //'views'이벤트가 발생하면 콜백실행 , __dirname : 내장 변수로 현재 파일의 절대경로
// console.log("현재경로 :",path.resolve(__dirname+'/views'))
// console.log("현재경로 :",path.join(__dirname,'/views'))

app.set('view engine','ejs') //view엔진으로 ejs를 사용한다.

app.use(express.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use(cors());

app.use('/api',apiRouter) 
//미들웨어 등록할때 쓰는 메소드
//localhost8000/api 로 요청될때 apiRouter가 실행된다. apiRouter에는 '/', '/signup' url로 받아서 결국 api or api/signup 이다.

let mongo_url = process.env.MONGO_URL

mongoose.connect(mongo_url, { 
    useNewUrlParser: true , 
    useUnifiedTopology: true 
    })

let db = mongoose.connection

if(!db){
    console.log("Error Connecting db")
} else {
    console.log("DB Connected Success")
}

let port =process.env.PORT || 8080;

// app.get('/',function(request,response){
//     // console.log(request)
//     response.send("hello world.!!!")
// })

app.listen(port, function(){
    console.log(`server is starting at http://localhost:${port}`)
})

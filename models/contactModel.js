let mongoose = require('mongoose');
let userSchema= mongoose.Schema({
    name:{
        type:String,
        require:true  //mysql에서 not null같은 기능 여기서는 빈값을 입력할 수 없다.
    },
    password : {
        type:String&&Number,
        require:true
    },
    email : {
        type:String,
        require:true
    },
    gender:String,
    phone:Number,
    create_date:{
        type:Date,
        default:Date.now  //입력값이 없을때 기본값
    }

})

let User = mongoose.model("User",userSchema) //스키마의 이름,스키마 데이터
// export default User;
module.exports=User;
let mongoose = require('mongoose');
let listSchema= mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    contents:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    create_date:{
        type:Date,
        default:Date.now 
    }
})

let List = mongoose.model("List",listSchema) 
module.exports=List;
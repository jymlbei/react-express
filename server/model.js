
const mongoose = require('mongoose')
const db_url = 'mongodb://127.0.0.1:27017/data'
mongoose.connect(db_url)
mongoose.connection.on('connected',function(){
    console.log('mongodb connect success');
})

const models = {
    user:{
        'admin':{type:String,require:true},
        'password':{type:String,require:true},
        'type':{type:String,require:true},
        // 头像，简介
        'avatar':{type:String},
        'desc':{type:String},
        'title':{type:String},
        // boss
        'company':{type:String},
        'money':{type:String},
    },
    chat:{

    }
}

for (var m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}

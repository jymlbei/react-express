const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'password':0,'__v':0}


Router.get('/list',function(req,res){
    // User.remove({},function(e,d){})
    User.find({},function(err,doc){
        if(!err){
            return res.json(doc)
        }
    })
})
Router.post('/register',function(req,res){
    // console.log(req.body);
    const {admin,password,type} = req.body
    User.findOne({admin},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const uerModel = new User({admin,type,password:utilsMd5(password)})
        uerModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'端口出错'})
            }
            const {admin,type,_id} = d;
            res.cookie('userid',_id)
            return res.json({code:0,data:{admin,type,_id}})
        })
        // User.create({admin,type,password:utilsMd5(password)},function(e,d){
        //     if(e){
        //         return res.json({code:1,msg:'端口出错'})
        //     }
        //     return res.json({code:0})
        // })
    })
})

Router.post('/update',function(req,res){
    const userid = req.cookies.userid;
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body;
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type,
        },body)
        return res.json({code:0,data})
    })
})

Router.post('/login',function(req,res){
    // console.log(req.body);
    const {admin,password} = req.body
    User.findOne({admin,password:utilsMd5(password)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名不存在或者密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.get('/info',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错'})
        }
        return res.json({code:0,data:doc})
    })
})

function utilsMd5(password){
    const str = 'thisIsdemo!1745'
    return utils.md5(utils.md5(password+str))
}

module.exports = Router

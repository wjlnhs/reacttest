var express = require('express');
var router = express.Router();
var superagent=require('superagent');
var CryptoJS=require('crypto-js');
var _=require('underscore');
var users=require('../config/user.json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/getUserInfo', function(req, res, next) {

});

router.get('/getList', function(req, res, next) {
    var peoplePromiseArr=[];
    var promisearr=[];
    var dataarr=[];
    //获取人员
    var getpeople=function(){
        for(var itemname in users){
            var _name=itemname;
            var _password=users[itemname].password;
            if(!(users[_name] || {}).skey){
                (function(_name){
                    peoplePromiseArr.push(new Promise(function(resolve, reject){
                        superagent.post('http://union.mmtrix.com/user/login')
                            .send("name="+encodeURIComponent(_name)+"&password="+encodeURIComponent(CryptoJS.SHA1(_password))+"")
                            .set('Accept', 'application/json')
                            .end(function(err, result){
                                //alliance_skey=9d672171abc17de72baad9c117938732-647720; alliance_UID=647720
                                //{"info":{"code":0,"msg":"","data":{"user_name":"mb75","email":"mb75@example.com","skey":"bcc4b903e977ba5275b7d7d1288ca934-647720","user_id":"647720","channel":"mmtrix"}}}
                                var info=JSON.parse(result.text || '{}');
                                users[_name]=_.extend(users[_name],info.data || {})
                                resolve();
                            })
                    }))
                })(_name)
            }
        }
        return peoplePromiseArr;
    }

    //获取列表
    var getList=function () {
        for(var i in users){
            var cuuser=users[i];
            var skey=cuuser['skey'];
            var user_id=cuuser['user_id'];
            var _name=i;
            if(skey){
                (function(_name){
					promisearr.push(new Promise(function(resolve, reject) {
                    superagent.get('http://union.mmtrix.com/credit/list/startTime/1476201600/endTime/1476892799/pageNum/1/pageSize/15')
                        .set('Accept', 'application/json')
                        .set('Cookie','alliance_skey='+skey+'; alliance_UID='+user_id+'')
                        .end(function(err, result){
                            console.log(999)
                            var info=JSON.parse(result.text || '{}');
                            if(!_.isEmpty(info.data)){
                                dataarr.push({
                                    name:_name,
                                    data:info.data,
                                    users:users
                                });
                            }
                            resolve(info.data);
                        });

                	}))
				})(_name)
            }

        }
        Promise.all(promisearr).then(function () {
            console.log(8888)
            res.send(dataarr)
        })
    }


    Promise.all(getpeople()).then(function () {
        getList();
    })

})
module.exports = router;

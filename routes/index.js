var express = require('express');
var router = express.Router();

var ejs = require("ejs");
var mysql = require('./mysql');

/* GET home page. */
router.get('/', function(req, res) {
	if(!req.session.userid){
		res.render('index', { title: 'LinkedIn' });
	}else{
		console.log("User id : " +req.session.userid );
		var userid = req.session.userid;
		var qry = "select *, DATE_FORMAT(lastloggedin,'%W, %M %e, %Y @ %h:%i %p') as reqdate from users where user_id= ?";
		var params = [userid];
		mysql.fetchData(qry,params,function(err,results){
			if(err){
				console.log(err);
				throw err;
			}
			else 
			{
				// render on success
				var userdetail;
				var exp;
				var edu;
				var prj;
				var skill;
				console.log("User id : " +req.session.userid );
				var userid = req.session.userid;
				var qry = "select * , DATE_FORMAT(lastloggedin,'%W, %M %e, %Y @ %h:%i %p') as reqdate from users where user_id= ?";
				//res.render('home',{'userdetails':{first_name:'vick'}});
				var params = [userid];
				mysql.fetchData(qry,params,function(err,results){
					if(err){
						console.log(err);
						throw err;
					}
					else 
					{
						var userdetail = results[0];
						var exp_qry = "select *, DATE_FORMAT(start_date,'%Y-%m-%d') as esdate , DATE_FORMAT(end_date,'%Y-%m-%d') as eedate from experience where user_id = ?";
						mysql.fetchData(exp_qry,params,function(err,results){
							if(err){
								throw err;
							}else{
								console.log("exp = " + results.length);
								for(var k =0 ; k<results.length;k++){
									console.log(results[k])
								}
								exp = results;
								var prj_qry = "select *, DATE_FORMAT(startdate,'%Y-%m-%d') as psdate , DATE_FORMAT(enddate,'%Y-%m-%d') as pedate from projects where userid = ?";
								mysql.fetchData(prj_qry,params,function(err,results){
									if(err){
										throw err;
									}else{
										console.log("prjs = " + results + "len=" + results.length);
										for(var k =0 ; k<results.length;k++){
											console.log(results[k]);
										}
										prj =results;
										var skill_qry = "select * from skills where user_id = ?";
										mysql.fetchData(skill_qry,params,function(err,results){
											if(err){
												throw err;
											}else{
												console.log("skill = " +  results.length);
												for(var k =0 ; k<results.length;k++){
													console.log(results[k])
												}
												skill = results;
												var edu_qry = "select * ,DATE_FORMAT(start_date,'%Y-%m-%d') as esdate , DATE_FORMAT(end_date,'%Y-%m-%d') as eedate from education where user_id = ?";
												mysql.fetchData(edu_qry,params,function(err,results){
													if(err){
														throw err;
													}else{
														console.log("edu = " +  results.length);
														for(var k =0 ; k<results.length;k++){
															console.log(results[k])
														}
														edu = results;
														res.render('home',{'userdetails':userdetail , 'exp':exp,'edu':edu,'skill':skill,'prj':prj});	
													}
												});
											}
										});
									}
								});
							}
						});
							
					}  
				});	
			}  
		});	
	}
  
});

 var disProfile = function(req, res) {
	if(!req.session.userid){
		res.render('failLogin.ejs');
		res.end();
	}else{
		var userid = parseInt(req.param("userid"));
		console.log("User id : " +userid );
		//var userid = req.session.userid;
		var qry = "select *, DATE_FORMAT(lastloggedin,'%W, %M %e, %Y @ %h:%i %p') as reqdate from users where user_id= ?";
		var params = [userid];
		mysql.fetchData(qry,params,function(err,results){
			if(err){
				console.log(err);
				throw err;
			}
			else 
			{
				// render on success
				var userdetail;
				var exp;
				var edu;
				var prj;
				var skill;
				console.log("User id : " +userid );
				
				var qry = "select * , DATE_FORMAT(lastloggedin,'%W, %M %e, %Y @ %h:%i %p') as reqdate from users where user_id= ?";
				//res.render('home',{'userdetails':{first_name:'vick'}});
				var params = [userid];
				mysql.fetchData(qry,params,function(err,results){
					if(err){
						console.log(err);
						throw err;
					}
					else 
					{
						var userdetail = results[0];
						var exp_qry = "select *, DATE_FORMAT(start_date,'%Y-%m-%d') as esdate , DATE_FORMAT(end_date,'%Y-%m-%d') as eedate from experience where user_id = ?";
						mysql.fetchData(exp_qry,params,function(err,results){
							if(err){
								throw err;
							}else{
								console.log("exp = " + results.length);
								for(var k =0 ; k<results.length;k++){
									console.log(results[k])
								}
								exp = results;
								var prj_qry = "select *, DATE_FORMAT(startdate,'%Y-%m-%d') as psdate , DATE_FORMAT(enddate,'%Y-%m-%d') as pedate from projects where userid = ?";
								mysql.fetchData(prj_qry,params,function(err,results){
									if(err){
										throw err;
									}else{
										console.log("prjs = " + results + "len=" + results.length);
										for(var k =0 ; k<results.length;k++){
											console.log(results[k]);
										}
										prj =results;
										var skill_qry = "select * from skills where user_id = ?";
										mysql.fetchData(skill_qry,params,function(err,results){
											if(err){
												throw err;
											}else{
												console.log("skill = " +  results.length);
												for(var k =0 ; k<results.length;k++){
													console.log(results[k])
												}
												skill = results;
												var edu_qry = "select * ,DATE_FORMAT(start_date,'%Y-%m-%d') as esdate , DATE_FORMAT(end_date,'%Y-%m-%d') as eedate from education where user_id = ?";
												mysql.fetchData(edu_qry,params,function(err,results){
													if(err){
														throw err;
													}else{
														console.log("edu = " +  results.length);
														for(var k =0 ; k<results.length;k++){
															console.log(results[k])
														}
														edu = results;
														res.render('home',{'userdetails':userdetail , 'exp':exp,'edu':edu,'skill':skill,'prj':prj});	
													}
												});
											}
										});
									}
								});
							}
						});
							
					}  
				});	
			}  
		});	
	}
  
};





function afterSignIn(req,res)
{
	// check user already exists
	var getUser="select * from users where email_id=? and password= ?";
	console.log(req);
	var email = req.param('username');
	var password = req.param('password');
	console.log("email :" + email);
	email = email.trim();
	var params = [email,password];
	console.log("Query is:"+getUser);
	
	mysql.fetchData(getUser,params,function(err,results){
		if(err){
			var msg = "Error occured while logging in " + err;
			res.send({"status":"fail" , 'msg': msg});
			console.log(err);
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("valid Login");
				console.log(results);
				//res.redirect('/successSignIn');
				req.session.userid = results[0].user_id;
				console.log("User id : " +req.session.userid );
				res.send({"status":"success"});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"status":"fail",'msg':'Invalid password or  emailid, please verify and try again'});
			}
		}  
	});
}


function successLogin(req,res){
	if(!req.session.userid){
		res.render('failLogin.ejs');
		res.end();
	}else{
		// render on success
		var userdetail;
		var exp;
		var edu;
		var prj;
		var skill;
		console.log("User id : " +req.session.userid );
		var userid = req.session.userid;
		var qry = "select * , DATE_FORMAT(lastloggedin,'%W, %M %e, %Y @ %h:%i %p') as reqdate from users where user_id= ?";
		//res.render('home',{'userdetails':{first_name:'vick'}});
		var params = [userid];
		mysql.fetchData(qry,params,function(err,results){
			if(err){
				console.log(err);
				throw err;
			}
			else 
			{
				var userdetail = results[0];
				var exp_qry = "select *, DATE_FORMAT(start_date,'%Y-%m-%d') as esdate , DATE_FORMAT(end_date,'%Y-%m-%d') as eedate from experience where user_id = ?";
				mysql.fetchData(exp_qry,params,function(err,results){
					if(err){
						throw err;
					}else{
						console.log("exp = " + results.length);
						for(var k =0 ; k<results.length;k++){
							console.log(results[k])
						}
						exp = results;
						var prj_qry = "select *, DATE_FORMAT(startdate,'%Y-%m-%d') as psdate , DATE_FORMAT(enddate,'%Y-%m-%d') as pedate from projects where userid = ?";
						mysql.fetchData(prj_qry,params,function(err,results){
							if(err){
								throw err;
							}else{
								console.log("prjs = " + results + "len=" + results.length);
								for(var k =0 ; k<results.length;k++){
									console.log(results[k]);
								}
								prj =results;
								var skill_qry = "select * from skills where user_id = ?";
								mysql.fetchData(skill_qry,params,function(err,results){
									if(err){
										throw err;
									}else{
										console.log("skill = " +  results.length);
										for(var k =0 ; k<results.length;k++){
											console.log(results[k])
										}
										skill = results;
										var edu_qry = "select * ,DATE_FORMAT(start_date,'%Y-%m-%d') as esdate , DATE_FORMAT(end_date,'%Y-%m-%d') as eedate from education where user_id = ?";
										mysql.fetchData(edu_qry,params,function(err,results){
											if(err){
												throw err;
											}else{
												console.log("edu = " +  results.length);
												for(var k =0 ; k<results.length;k++){
													console.log(results[k])
												}
												edu = results;
												res.render('home',{'userdetails':userdetail , 'exp':exp,'edu':edu,'skill':skill,'prj':prj});	
											}
										});
									}
								});
							}
						});
					}
				});
					
			}  
		});	        	        	        	     	   
	}
}




function signUp(req,res) {
	console.log('signing up wait!!!!');
	var email = req.param('email');
	var password = req.param('password');
	var firstname = req.param('firstname');
	var lastname = req.param('lastname');
	var location = req.param('location');
	email = email.trim();
	var sqry = "select * from users where email_id = ?";
	var params = [email];
	mysql.fetchData(sqry,params,function(err,results){
		if(err){res.send({'status':'fail','msg':'error while fecthing data'});console.log("error while fecthing data");}
		else{
			if(results.length>0){
				res.send({'status':'fail','msg':'Email Id already exists'});
				console.log('Email Id already exists');
			}else{

				var qry = "insert into users (first_name, last_name,email_id,password,location) values (?,?,?,?,?)";
				firstname = firstname.trim();
				lastname = lastname.trim();
				password = password.trim();		
				location = location.trim();
				var params = [firstname,lastname,email,password,location];
				mysql.execQuery(qry,params, function(err,results){
					if(err){
						
						console.log("error singing up");
						var msg = "error singing up:     " + err;
						res.send({'status':'fail','msg':msg});
						throw err;
						}
					else{
						res.send({'status':'success'});
					}
				});
			}
		}
	});
	
}

function signOut(req,res){
	if(!req.session.userid){
		var msg = "You are not logged in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		var userid = req.session.userid;
		req.session.destroy(function(err) {
				if(!err){
					var d = new Date();
					var datetime =d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+"-"+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
					var qry = "update users set LastLoggedIn = ? where user_id = ?";
					var params = [datetime,userid];
					mysql.execQuery(qry,params,function(err,results){
						if(err){							
							var msg ="Error Executing query "+ qry + "Error: "+ err;
							res.send({status:'error',msg:msg});
							res.end();
						}else{
							var msg ="";
							res.send({status:'success',msg:msg});
							res.end();	
						}
					});
				}else{
					var msg = "Error Signing out ! " + err;
					res.send({status:'error',msg:msg});
					res.end();
				}
			});
	}
}function verifyUser(req,res){
	if(!req.session.userid){
		var msg = "You must be logged in to access this page, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		res.send({status:'success',msg:''});
		res.end();
	}
}
function showProfile(req,res){
	if(!req.session.userid){
		res.render('failLogin.ejs');
		res.end();
	}else{
		// render on success
		var userdetail;
		var exp;
		var edu;
		var prj;
		var skill;
		console.log("User id : " +req.session.userid );
		var userid = req.session.userid;
		var qry = "select * , DATE_FORMAT(lastloggedin,'%W, %M %e, %Y @ %h:%i %p') as reqdate from users where user_id= ?";
		//res.render('home',{'userdetails':{first_name:'vick'}});
		var params = [userid];
		mysql.fetchData(qry,params,function(err,results){
			if(err){
				console.log(err);
				throw err;
			}
			else 
			{
				var userdetail = results[0];
				var exp_qry = "select * , DATE_FORMAT(start_date,'%Y-%m-%d') as esdate , DATE_FORMAT(end_date,'%Y-%m-%d') as eedate  from experience where user_id = ?";
				mysql.fetchData(exp_qry,params,function(err,results){
					if(err){
						throw err;
					}else{
						console.log("exp = " + results.length);
						for(var k =0 ; k<results.length;k++){
							console.log(results[k])
						}
						exp = results;
						var prj_qry = "select * , DATE_FORMAT(startdate,'%Y-%m-%d') as psdate , DATE_FORMAT(enddate,'%Y-%m-%d') as pedate from projects where userid = ?";
						mysql.fetchData(prj_qry,params,function(err,results){
							if(err){
								throw err;
							}else{
								console.log("prjs = " + results + "len=" + results.length);
								for(var k =0 ; k<results.length;k++){
									console.log(results[k]);
								}
								prj =results;
								var skill_qry = "select * from skills where user_id = ?";
								mysql.fetchData(skill_qry,params,function(err,results){
									if(err){
										throw err;
									}else{
										console.log("skill = " +  results.length);
										for(var k =0 ; k<results.length;k++){
											console.log(results[k])
										}
										skill = results;
										var edu_qry = "select *, DATE_FORMAT(start_date,'%Y-%m-%d') as esdate , DATE_FORMAT(end_date,'%Y-%m-%d') as eedate  from education where user_id = ?";
										mysql.fetchData(edu_qry,params,function(err,results){
											if(err){
												throw err;
											}else{
												console.log("edu = " +  results.length);
												for(var k =0 ; k<results.length;k++){
													console.log(results[k])
												}
												edu = results;
												var exp_flag = 1;
												var prj_flag = 1;
												var edu_flag = 1;
												
												if(exp.length == 0){
													exp_flag =0;
												}
												if(prj.length == 0){
													prj_flag =0;
												}
												if(edu.length == 0){
													edu_flag =0;
												}
												var explen = exp.length ? exp.length : 1 ;
												var skilllen = skill.length ? skill.length :0 ;
												var prjlen = prj.length ? prj.length :1 ;
												var edulen = edu.length ? edu.length : 1 ;
												res.render('updateProfile',{'userdetails':userdetail , 'exp':exp,'edu':edu,'skill':skill,'prj':prj,explen:explen,edulen:edulen,prjlen:prjlen,skilllen:skilllen,'prj_flag':prj_flag,'edu_flag':edu_flag,'exp_flag':exp_flag});	
											}
										});
									}
								});
							}
						});
					}
				});
					
			}  
		});
	}
	
}
	
function getConnect(req,res){
	if(!req.session.userid){
		res.render('failLogin.ejs');
		res.end();
	}else{
		var user_id = req.session.userid;
		var params = [user_id];
		var qry1 = "select to_user_id as user_id , CONCAT(u.first_name, ' ' ,u.last_name) as" +
				" fullname , status from connection c, users u where c.to_user_id = u.user_id and c.from_user_id = ? and status = 'accepted'";
		var qry2 = "select from_user_id as user_id , CONCAT(u.first_name, ' ' ,u.last_name) as fullname , status from connection c, users u where c.to_user_id = u.user_id " +
				"and c.to_user_id = ? and status = 'accepted'";
		var qry3 = "select from_user_id , to_user_id , CONCAT(u.first_name, ' ' ,u.last_name) as fullname , status from connection c, users u where c.to_user_id = u.user_id " +
				"and c.from_user_id = ? and status = 'pending'";
		var qry4= "select from_user_id , to_user_id , CONCAT(u.first_name, ' ' ,u.last_name) as fullname , status from connection c, users u where c.from_user_id = u.user_id " +
				"and c.to_user_id = ? and status = 'pending'";
		var qry5 = "select distinct user_id, CONCAT(first_name, ' ' ,last_name) as fullname from users\
					where  user_id IN (select user_id from users where \
					user_id NOT IN( select from_user_id from connection where to_user_id = ? ) )\
					AND user_id IN (select user_id from users where \
					user_id NOT IN( select to_user_id from connection where from_user_id = ? ) ) and user_id != ? order by user_id";
		var accepted = [];
		var pending_from_you;
		var pending_from_other;
		var not_yet_connected;
		var total_conections= 0 ;
		mysql.execQuery(qry1,params, function(err,results){
			if(err){
				throw err;
			}else{
				accepted.push(results);	
				total_conections = total_conections + results.length;
				mysql.execQuery(qry2,params, function(err,results){
					if(err){
						throw err;
					}else{
						accepted.push(results);
						total_conections = total_conections + results.length;
					/*	console.log("accepted 1 : "+accepted[0][0].to_user_id);
						console.log("accepted 2: "+ accepted[1][0].from_user_id);*/
						for(var i=0;i<accepted.length ; i++){
							var temp = accepted[i] ;
							for(var j=0 ; j< temp.length ; j++) {
								console.log("name = > "+ temp[j].fullname);
							}
						}
						mysql.execQuery(qry3,params, function(err,results){
							if(err){
								throw err;
							}else{								
								pending_from_other = results;
								//console.log("pending from other " + pending_from_other[0].to_user_id);
								mysql.execQuery(qry4,params, function(err,results){
									if(err){
										throw err;
									}else{										
										pending_from_you = results;
									//	console.log("pending from you " + pending_from_you[0].from_user_id);
										params.push(user_id);
										params.push(user_id);
										mysql.execQuery(qry5,params, function(err,results){
											if(err){
												throw err;
											}else{			
												
												not_yet_connected = results;
												console.log("not_yet_connected " + not_yet_connected[0]);
												res.render('connect.ejs',{total_conections: total_conections, accepted: accepted,not_yet_connected:not_yet_connected, pending_from_you:pending_from_you,pending_from_other:pending_from_other});
												res.end();
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});

	}
}
function saveSummary(req,res){
	if(!req.session.userid){
		var msg = "You must be logged in to change values, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		console.log("User id in save sumary: " +req.session.userid );
		var summ = req.param("summary");
		if(summ){summ = summ.trim();}
		//res.send({'status':'success'});
		var userid = req.session.userid;
		var qry = "update users set Summary= ? where user_id = ?";
		var params = [summ,userid];
		console.log("qry : " + qry + "params : " +userid );
		mysql.execQuery(qry,params, function(err,results){
			if(err){				
				console.log("error updating sumary up" + err);
				var msg = "error updating summary up:     " + err;
				res.send({'status':'fail','msg':msg});
				res.end();
				
				}
			else{
				res.send({'status':'success'});
				res.end();
			}
		});
		
	}
}


function saveExp(req,res){
	if(!req.session.userid){
		var msg = "You must be logged in to change values, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		console.log("User id in save exp: " +req.session.userid );
		
		var data = req.param("data");
		console.log(data);
		//res.send({'status':'success'});
		var userid = req.session.userid;
		var qry = "delete from experience where user_id = ?";
		var params = [userid];
		mysql.execQuery(qry,params,function(err,results){
			if(err){
				var msg = "Error Executing query" + qry + " \n Error : " + err;
				res.send({status:'error',msg:msg});
				res.end();
			}else{
				var qry = "insert into experience (company_name,user_id,title,location," +
						"start_date,end_date,description) values (?,?,?,?,?,?,?)";
				var i=1;
				var no_of_exp = Object.keys(data).length;
				console.log("rowss = " + no_of_exp);
				var errorflag = 0;
				for(var key in data){
					console.log(data[key].companyname,userid,data[key].title,data[key].location,data[key].sdate,data[key].edate,data[key].desc);								
					var params=[data[key].companyname,userid,data[key].title,data[key].location,data[key].sdate,data[key].edate,data[key].desc];
					mysql.execQuery(qry,params,function(err,results){
						if(err){
							var msg = "Error Executing query "+ qry + "Error: " +  err;
							res.send({status:'error',msg:msg});
							res.end();
							//throw err;
						}else{
							//(function(){
								console.log("loop ending"+ i);							
								if(i == no_of_exp){
								console.log("sending message");
								var msg = "Saved Expereinces succesfully";
								res.send({status:'success',msg:msg});
								res.end();
								}
						//	})(i);
							i++;
						}
					});
					
				}
				
			}
		});
		
		
		
	}
}
function saveEdu(req,res){
	if(!req.session.userid){
		var msg = "You must be logged in to change values, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		console.log("User id in save edu: " +req.session.userid );
		
		var data = req.param("data");
		console.log(data);
		//res.send({'status':'success'});
		var userid = req.session.userid;
		var qry = "delete from education where user_id = ?";
		var params = [userid];
		mysql.execQuery(qry,params,function(err,results){
			if(err){
				var msg = "Error Executing query" + qry + " \n Error : " + err;
				res.send({status:'error',msg:msg});
				res.end();
			}else{
				var qry = "insert into education (level,user_id,univ_name,field,description,start_date,end_date) " +
						"values(?,?,?,?,?,?,?)";
				var i=1;
				var no_of_edu = Object.keys(data).length;
				console.log("rowss = " + no_of_edu);
				var errorflag = 0;
				for(var key in data){
					console.log(data[key].level,userid,data[key].school,data[key].field,data[key].desc,data[key].sdate,data[key].edate);								
					var params=[data[key].level,userid,data[key].school,data[key].field,data[key].desc,data[key].sdate,data[key].edate];
					mysql.execQuery(qry,params,function(err,results){
						if(err){
							var msg = "Error Executing query "+ qry + "Error: " +  err;
							res.send({status:'error',msg:msg});
							res.end();
							//throw err;
						}else{
							//(function(){
								console.log("loop ending"+ i);							
								if(i == no_of_edu){
								console.log("sending message");
								var msg = "Saved Education succesfully";
								res.send({status:'success',msg:msg});
								res.end();
								}
						//	})(i);
							i++;
						}
					});
					
				}
				
			}
		});
		
		
		
	}
}

function savePrj(req,res){
	if(!req.session.userid){
		var msg = "You must be logged in to change values, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		console.log("User id in Prj: " +req.session.userid );
		
		var data = req.param("data");
		console.log(data);
		//res.send({'status':'success'});
		var userid = req.session.userid;
		var qry = "delete from projects where userid = ?";
		var params = [userid];
		mysql.execQuery(qry,params,function(err,results){
			if(err){
				var msg = "Error Executing query" + qry + " \n Error : " + err;
				res.send({status:'error',msg:msg});
				res.end();
			}else{
				var qry = "insert into projects (name,company,startdate,enddate,description,userid) values(?,?,?,?,?,?)";
				var i=1;
				var no_of_prj = Object.keys(data).length;
				console.log("rowss = " + no_of_prj);
				var errorflag = 0;
				for(var key in data){
					console.log(data[key].name,data[key].company,data[key].sdate,data[key].edate,data[key].desc,userid);								
					var params=[data[key].name,data[key].company,data[key].sdate,data[key].edate,data[key].desc,userid];
					mysql.execQuery(qry,params,function(err,results){
						if(err){
							var msg = "Error Executing query "+ qry + "Error: " +  err;
							res.send({status:'error',msg:msg});
							res.end();
							//throw err;
						}else{
							//(function(){
								console.log("loop ending"+ i);							
								if(i == no_of_prj){
								console.log("sending message");
								var msg = "Saved Project succesfully";
								res.send({status:'success',msg:msg});
								res.end();
								}
						//	})(i);
							i++;
						}
					});
					
				}
				
			}
		});
		
		
		
	}
}
function saveSkills(req,res){
	if(!req.session.userid){
		var msg = "You must be logged in to change values, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		console.log("User id in skills: " +req.session.userid );
		
		var data = req.param("data");
		console.log(data.length);
		//res.send({'status':'success'});
		var userid = req.session.userid;
		var qry = "delete from skills where user_id = ?";
		var params = [userid];
		mysql.execQuery(qry,params,function(err,results){
			if(err){
				var msg = "Error Executing query" + qry + " \n Error : " + err;
				res.send({status:'error',msg:msg});
				res.end();
			}else{
				var qry = "insert into skills (user_id,skillset) values (?,?)";
				var i=1;
				var no_of_skills = data.length;
				console.log("no of skills = " + no_of_skills);
				var errorflag = 0;
				for(var j=0 ; j<no_of_skills ; j++){
					var params = [userid,data[j]];
					mysql.execQuery(qry,params,function(err,results){
						if(err){
							var msg = "Error Executing query "+ qry + "Error: " +  err;
							res.send({status:'error',msg:msg});
							res.end();
							//throw err;
						}else{
							//(function(){
								console.log("loop ending"+ i);							
								if(i == no_of_skills){
								console.log("sending message");
								var msg = "Saved Skils succesfully";
								res.send({status:'success',msg:msg});
								res.end();
								}
						//	})(i);
							i++;
						}
					});
					
				}
				
			}
		});
		
		
		
	}
}
function acceptConn(req,res) {
	if(!req.session.userid){
		var msg = "You must be logged in to change values, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		
		var user_id= req.session.userid;
		console.log(req.body);
		var from_user_id = req.param("username");
		console.log("from user id " + from_user_id);
		
		var qry = "update connection set status = 'accepted' where from_user_id= ? and to_user_id = ? ";
		var params = [from_user_id,user_id];
		console.log("params " + params);
		mysql.execQuery(qry,params,function(err,results){
			if(err){
				var msg = "Error Executing query "+ qry + "Error: " +  err;
				res.send({status:'error',msg:msg});
				res.end();	
			}else{
				var msg = "Updated Successfully";
				console.log("inside acceptConn");
				res.send({status:'success',msg:msg});
				res.end();
			}			
		});
	}
	
}
function rejectConn(req,res) {
	if(!req.session.userid){
		var msg = "You must be logged in to change values, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		
		var user_id= req.session.userid;
		console.log(req.body);
		var fromuserid = req.param("fromuserid");
		console.log("from user id " + fromuserid);
		
		var qry = "update connection set status = 'rejected' where from_user_id= ? and to_user_id = ? ";
		
		var params = [fromuserid,user_id];
		console.log("params " + params);
		mysql.execQuery(qry,params,function(err,results){
			if(err){
				var msg = "Error Executing query "+ qry + "Error: " +  err;
				res.send({status:'error',msg:msg});
				res.end();	
			}else{
				var msg = "Request Ignored";
				console.log("inside acceptConn");
				res.send({status:'success',msg:msg});
				res.end();
			}			
		});
	}
	
}
function sendConnReq(req,res) {
	if(!req.session.userid){
		var msg = "You must be logged in to change values, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		
		var user_id= req.session.userid;
		console.log(req.body);
		var to_user_id = req.param("touserid");
		console.log("from user id " + to_user_id);
		
		var qry = "insert into connection (from_user_id,to_user_id,status) values (?,?,'pending')";
		
		var params = [user_id,to_user_id];
		console.log("params " + params);
		mysql.execQuery(qry,params,function(err,results){
			if(err){
				var msg = "Error Executing query "+ qry + "Error: " +  err;
				res.send({status:'error',msg:msg});
				res.end();	
			}else{
				var msg = "Request Sent";
				console.log("inside acceptConn");
				res.send({status:'success',msg:msg});
				res.end();
			}			
		});
	}
}
function getSearch(req,res) {
	if(!req.session.userid){
		res.render('failLogin.ejs');
		res.end();
	}else{
		
		var user_id= req.session.userid;
		res.render('search.ejs');
	}
}


function getRecords(req,res){
	if(!req.session.userid){
		res.render('failLogin.ejs');
		res.end();
	}else{
		var name = req.param('name');
		name = name.trim();
		console.log('name=>'+ name);
		var qry = "select * from users where first_name like '%"+name+"%' or last_name like '%"+name+"%'";
		var params = [name,name];
		mysql.execQuery(qry,params,function(err,results){
			if(err){
				var msg = "Error Executing query "+ qry + "Error: " +  err;
				res.send({status:'error',msg:msg});
				res.end();	
			}else{
				console.log(results[0]);
				res.send({status:'success',result:results,records:['a','b','c']});
				res.end();
			}			
		});
	}
	
	
}
function save(req,res){
	console.log("entering save");
	if(!req.session.userid){
		console.log("1st if");
		var msg = "You must be logged in to change values, please log in.";
		res.send({status:'error',msg:msg});
		res.end();
	}else{
		console.log("1st else");
		var user_id= req.session.userid;
		console.log(req.body);
		var status=req.param("status");
		var inputFirstName=req.param("firstname");
		var inputLastName=req.param("lastname");
		var residence=req.param("location");
		
		
		var qry = "UPDATE users set first_name=?,last_name=?,location=? where user_id=?";
		
		var params = [inputFirstName,inputLastName,residence,user_id];
		console.log("params " + params);
		mysql.execQuery(qry,params,function(err,results){
			if(err){
				console.log("2st if");
				var msg = "Error Executing query "+ qry + "Error: " +  err;
				res.send({status:'error',msg:msg});
				res.end();	
			}else{
				console.log("2st else");
				var msg = "Request Sent";
				console.log("inside acceptConn");
				res.send({status:'success',msg:msg});
				res.end();
			}			
		});
	}
	
}


router.post('/signin',afterSignIn);
router.post('/getRecords',getRecords);
router.get('/successLogin', successLogin);
router.post('/signup', signUp);
router.get('/showProfile', showProfile);
router.get('/signout',signOut);
router.get('/getConnect',getConnect);
router.post('/saveSummary',saveSummary);
router.post('/saveExp',saveExp);
router.post('/savePrj',savePrj);
router.post('/saveSkills',saveSkills);
router.get('/verifyUser',verifyUser);
router.post('/saveExp',saveExp);
router.post('/saveEdu',saveEdu);
router.get('/disProfile',disProfile);
router.post('/acceptConn',acceptConn);
router.post('/rejectConn',rejectConn);
router.post('/sendConnReq',sendConnReq);
router.get('/getSearch',getSearch);
router.post('/save',save);
module.exports = router;

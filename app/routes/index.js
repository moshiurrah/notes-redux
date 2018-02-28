'use strict';

var path = process.cwd();
var Users=require(path + '/app/models/users.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			return res.send(403, { error: "Invalid password!" });
		}
	}
	
	//this needs work :`(
	/*
	function parseMongooseErr (errMsg){
		
		console.log(errMsg.errors);
		for (var error in errMsg.errors) {
			var errToReport=errMsg.errors[error].message;
			if (errMsg.errors[error].message.includes('Cast')) {
				errToReport="Please provide a number.";
			}
		}
		return {errors:errToReport};
	}
	*/

	app.route('/')
		.get(function (req, res) {
		//.get(isLoggedIn, function (req, res) {
			//res.sendFile(path + '/public/index.html');
			if (process.env.NODE_ENV==='production') {
				//console.log('production url');
				res.sendFile(path + '/client/build/index.html');
			} else {
				res.redirect(process.env.APP_URL.substring(0,process.env.APP_URL.length-1)+":"+process.env.REACT_PORT);
			}
		});


	/*	
	app.route('/login')
		.get(function (req, res) {
			//res.sendFile(path + '/public/login.html');
			res.redirect('/');
		});
		
	app.route('/test')
		.get(function (req, res) {
			res.send('Hello World!');
		});
	*/
	
	app.route('/logout')
		.get(function (req, res) {
			console.log(req.url);
			req.logout();
			//res.redirect('/');
			res.json({content:'Successfully logged out!'});
			//res.redirect('https://fccwebapps-mtanzim.c9users.io:8081');
		});
		
		
	//passport docs, local sign up/login
	app.post('/signup', function(req, res, next) {
		//console.log(req.auth);
	  passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err); }
	    if (!user) { 
	    	return res.send(403, { error: "Invalid password!" });
	    }
	    //possibile optimization: don't even get the notes from the server?
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      //return res.redirect('/');
	      //console.log(req.user);
	      //res.json({content:req.user});
	      var fullUser = Object.assign({}, user.toJSON({ virtuals: true })); 
	      //var fullUser = user.toJSON({ virtuals: true });
	      delete fullUser['notes'];
	    	res.json({content:fullUser});
	    });
	  })(req, res, next);
	});
	
	
	//get user information for specific userID
	app.route('/api/:id')
		.get(isLoggedIn, function(req, res) {
				console.log(req.url);
				console.log(req.params.id);
				Users.findById(req.params.id, function (err, user) {
		    	if (err) {
		    		//res.json({isError:true});
		    		return res.send(403, { error: "User not found!" });
		    	} else {
			    	console.log(user.notes);
		    		//res.json({isError:false, content:user.notes});
		    		res.json({content:user.notes});
		    	}
		    });
		})
		

  function changeNote (req,res, action) {
  	console.log(action);
  	var toReturn ={};
		Users.findById(req.params.id, function (err, user) {
			if (err) {
				return res.send(403, { error: "User not found!" });
			} else {
				var editNote= user.notes.id(req.params.noteID);
				switch (action) {
					case 'refresh':
						console.log(req.body.content);
						user.notes=[];
						user.notes=req.body.content;
						toReturn= {content:user.notes};
						break;
					case 'add':
						user.notes.unshift(req.body);
						console.log(user.notes[0]);
						toReturn= {content:user.notes[0]};
						break;
					case 'edit':
						editNote.content=req.body.content;
						editNote.color=req.body.color;
						toReturn = {content:	editNote};
						break;
					case 'delete':
						editNote.remove({ _id: req.params.noteID }, function(err, note) {
							if (err) return res.send(403, { error: "Remove Failed!" });
						});
						toReturn = {content:editNote};
						break;
					case 'deleteall':
						var noteLen=user.notes.length-1;
						for (let i=noteLen; i > -1 ; i--){
							user.notes.id(user.notes[i]._id).remove();
						}
						//do a non mutating action here instead
						toReturn = {};
						break;
					default:
						return res.send(403, { error: "Operation not completed!" });
				}
				user.save(function(err) {
					if (err){
						console.log(err);
						return res.send(403, { error: "Changes Failed!" });
					} else {
						console.log('Notes Changed');
						res.json(toReturn);
					} 
				});
			}
		})
	}
	
	
	
	app.route('/api/:id/refresh')
		.post(isLoggedIn, function (req, res){
			//console.log(req.url);
			console.log(req.params.id);
			console.log(req.body);
			return changeNote(req,res,'refresh');
		})
	//add note
	app.route('/api/:id/add')
		.post(isLoggedIn, function (req, res){
			//console.log(req.url);
			console.log(req.params.id);
			console.log(req.body);
			return changeNote(req,res,'add');
		})
		
	app.route('/api/:id/del')
		.delete(isLoggedIn, function (req, res){
			//console.log(req.url);
			console.log(req.params.id);
			console.log(req.body);
			return changeNote(req,res,'deleteall');
		})

	app.route('/api/:id/:noteID')
		//edit note
		.put (isLoggedIn, function(req, res){
			console.log(`Edit requested for ${req.params.id} with ${req.body.content} `)
			console.log(req.params.id)
			console.log(req.params.noteID);
			console.log(req.body);
			return changeNote(req,res,'edit');
		})
		//delete note
		.delete(isLoggedIn, function(req,res){
			return changeNote(req,res,'delete');
		});
	
	

	app.route('/api/:id/changePass')
		.post(isLoggedIn, function (req, res) {
			console.log('Changing Password');
			console.log(req.params.id);
			console.log(req.user.id);
			console.log(req.body);
			//not using the params id yet, makes more sense to use the user of the session
			Users.findById(req.user.id, function (err, user) {
	    	if (err) {
	    		return res.send(403, { error: "User not found!" });
	    	} else {
		    	console.log(user);
		    	if (!user.validPassword(req.body.curPass)) {
						return res.send(403, { error: "Invalid password!" });
		    	} else {

            user.changePassword(req.body.newPass);
            user.save(function(err) {
							if (err) {
								//res.json({isError:true, content:err});
								return res.send(403, { error: "User save failed!" });
							} else {
								res.json({content:"Password Changed! Please log back in. Logging out..."});
							}
						});
		    	}
	    	}
	    });
			
		});
		
		app.route('/api/:id/deleteAccount')
		.post(isLoggedIn, function (req, res) {
			Users.findById(req.user.id, function (err, user) {
	    	if (err) {
	    		return res.send(403, { error: "User not removed!" });
	    	} else {
		    	console.log(user);
					user.remove(function (err, user) {
					  if (err){
					  	console.log(err);
					  	return res.send(403, { error: "User not removed!" });
					  } else {
					  	Users.findById(user._id, function (err, user) {
					    	console.log(user) // null
					    	console.log(err);
					  	});
							res.json({content:"Account deleted! Goodbye forver :`("});
				  	}
				})
	    		
	    	}
	    });
		});
	
		/*
	//connected accounts
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
	
	
	//facebook login routes
	app.get('/auth/facebook', passport.authenticate('facebook', { 
    scope : ['public_profile', 'email']
  }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect: '/',
					failureRedirect: '/login'
      }));

	app.route('/getCurUser')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.toJSON({ virtuals: true }));
		});
		
	//get userNames
	//uses virtual getters
	app.route('/getUsers')
		.get(isLoggedIn, function(req, res) {
				Users.find(function (err, users) {
		    	if (err) {
		    		res.json({isError:true});
		    	} else {
		    		var userArray=[];
		    		users.forEach( user => {
		    			console.log (user.displayName);
		    			var jsonUser = user.toJSON({ virtuals: true });
		    			userArray.push(jsonUser);
		    		});
			    	//console.log(user._id);
			    	//var jsonUser = user.toJSON({ virtuals: true });
		    		res.json({isError:false, content:userArray});
		    	}
		    });
		})
		
		//get user information for specific userID
		app.route('/api/:id')
		.get(isLoggedIn, function(req, res) {
				console.log(req.url);
				Users.findById(req.params.id, function (err, user) {
		    	if (err) {
		    		res.json({isError:true});
		    	} else {
			    	console.log(user);
		    		res.json({isError:false, content:user.toJSON({ virtuals: true })});
		    	}
		    });
		})
		
	//add recipe for specified user
	app.route('/api/:id/recipe')
		.post(function (req, res){
			//console.log(req.params.recipeID);
			console.log(req.body);
			//console.log(req.params.id);
			Users.findById(req.params.id, function (err, user) {
			//Users.findOne({ 'facebook.id': req.user.facebook.id }, function (err, user) {
				console.log(user);
				if (err){
					res.json({isError:true, content:parseMongooseErr(err)});
				} else {
					user.recipes.unshift(req.body);
					user.save(function(err) {
						if (err) {
							res.json({isError:true, content:parseMongooseErr(err)});
						} else {
							console.log('New recipe added successfully!');
							res.json({isError:false, content:user.recipes});
						}
					});
				}
			});
		})
	//delete all recipes
	app.route('/api/:id/recipeDelAll')
		.delete( function(req,res){
			Users.findById(req.params.id, function (err, user) {
				if (err){
					res.json({isError:true, content:parseMongooseErr(err)});
				} else {
					console.log(user);
					var recipeL=user.recipes.length-1;
					for (let i=recipeL; i > -1 ; i--){
						user.recipes.id(user.recipes[i]._id).remove();
					};
					user.save(function(err) {
						if (err) {
							res.json({isError:true, content:parseMongooseErr(err)});
						} else {
							res.json({isError:false, content:'All recipes deleted'});
						}
					});
				}
				
			});
		});
	
	//delete one ingredient; edit ingredient name
	app.route('/api/:id/recipe/:recipeID/:ingID')
		//edit ingredient name
		.put (function(req, res){
			console.log(req.body);
			Users.findById(req.user.id, function (err, user) {
			//Users.findOne({ 'facebook.id': req.user.facebook.id }, function (err, user) {
				if (err){
					res.json({isError:true, content:parseMongooseErr(err)});
				} else {
					var editRecipe= user.recipes.id(req.params.recipeID);
					//console.log(recipe);
					editRecipe.ingredients.id(req.params.ingID).set(req.body);
					//console.log(recipe);
					user.save(function(err) {
						if (err) {
							res.json({isError:true, content:parseMongooseErr(err)});
						} else {
							console.log('Ingredient edited successfully!');
							//res.json(req.body);
							res.json({isError:false, content:req.body});
						}
					});
				}

			});
		})
		//delete ingredient
		.delete( function(req,res){
			Users.findById(req.params.id, function (err, user) {
				if (err) {
					res.json({isError:true, content:parseMongooseErr(err)});
				} else {
					var editRecipe= user.recipes.id(req.params.recipeID);
					editRecipe.ingredients.id(req.params.ingID).remove();
					console.log(editRecipe);
					user.save(function(err) {
						if (err) {
							res.json({isError:true, content:parseMongooseErr(err)});
						} else {
							console.log('Ingredient removed successfully!');
							res.json({isError:false, content:editRecipe});
						}
					});
				}
			});
	});
	//delete all ingredients
	app.route('/api/:id/recipeDelAllIng/:recipeID')
		.delete( function(req,res){
			Users.findById(req.params.id, function (err, user) {
				if (err) {
					res.json({isError:true, content:parseMongooseErr(err)});
				} else {
					var editRecipe= user.recipes.id(req.params.recipeID);
					var ingredientL=editRecipe.ingredients.length-1;
					for (let i=ingredientL; i > -1 ; i--){
						editRecipe.ingredients.id(editRecipe.ingredients[i]._id).remove();
					};
					//console.log('New Recipe:');
					//console.log(editRecipe);
					user.save(function(err) {
						if (err) {
							res.json({isError:true, content:parseMongooseErr(err)});
						} else {
							console.log('All ingredients removed successfully!');
							res.json({isError:false, content:editRecipe});
						}
					});
				}
			});
	});

	//add new ingredients, edit recipe name, or delete recipe
	app.route('/api/:id/recipe/:recipeID')
		.put (function(req, res){
			console.log(req.params.recipeID);
			console.log(req.body);
			Users.findById(req.params.id, function (err, user) {
				if (err) {
					res.json({isError:true, content:parseMongooseErr(err)});
				} else {
					var editRecipe= user.recipes.id(req.params.recipeID);
					editRecipe.title=req.body.title;
					user.save(function(err) {
						if (err){
							res.json({isError:true, content:parseMongooseErr(err)});
						} else {
							console.log('Recipe Edited');
							res.json({isError:false, content:editRecipe});
						} 
					});
				}
			})
			//res.json({ message: 'Added ingredient to '+req.params.recipeID});
		})
		.post(function(req,res){
			console.log(req.params.recipeID);
			console.log(req.body);
			Users.findById(req.params.id, function (err, user) {
			//Users.findOne({ 'facebook.id': req.user.facebook.id }, function (err, user) {
				if (err) {
					res.json({isError:true, content:parseMongooseErr(err)});
				} else {
					var editRecipe= user.recipes.id(req.params.recipeID);
					console.log(editRecipe);
					editRecipe.ingredients.unshift(req.body);
					user.save(function(err) {
						if (err){
							res.json({isError:true, content:parseMongooseErr(err)});
						} else {
							console.log('New ingredient added successfully!');
							res.json({isError:false, content:editRecipe});
						} 
					});
				}
			})
			//res.json({ message: 'Added ingredient to '+req.params.recipeID});
		})
		.delete( function(req,res){
			Users.findById(req.params.id, function (err, user) {
				if (err) {
					res.json({isError:true, content:parseMongooseErr(err)});
				} else {
					var editRecipe= user.recipes.id(req.params.recipeID);
					console.log(editRecipe);
					editRecipe.remove({ _id: req.params.recipeID }, function(err, recipe) {
					 if (err) {
						res.json({isError:true, content:parseMongooseErr(err)});
					} else {
						 user.save(function(err) {
		 					if (err){
								res.json({isError:true, content:parseMongooseErr(err)});
							} else {
								res.json({isError:false, content: 'Recipe ' +req.params.recipeID + ' has been deleted' });
							} 
						});
					}
						 
				 });
				}	
			});
	});
	*/

};

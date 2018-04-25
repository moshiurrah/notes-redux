'use strict';

var path = process.cwd();
var Users = require(path + '/app/models/users.js');

module.exports = function (app, passport) {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.send(403, { error: "Please log in!" });
    }
  }


  app.route('/')
    .get(function (req, res) {
      //.get(isLoggedIn, function (req, res) {
      //res.sendFile(path + '/public/index.html');
      if (process.env.NODE_ENV === 'production') {
        //console.log('production url');
        res.sendFile(path + '/client/build/index.html');
      } else {
        res.redirect(process.env.APP_URL.substring(0, process.env.APP_URL.length - 1) + ":" + process.env.REACT_PORT);
      }
    });

  app.route('/logout')
    .get(function (req, res) {
      console.log(req.url);
      req.logout();
      res.json({ content: 'Successfully logged out!' });
    });


  //passport docs, local sign up/login
  app.post('/signupuser', function (req, res, next) {
    //console.log(req.auth);
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        console.log(info);
        return res.send(403, { error: info.message });
      }
      //possibile optimization: don't even get the notes from the server?
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        var fullUser = Object.assign({}, user.toJSON({ virtuals: true }));
        delete fullUser['notes'];
        res.json({ content: fullUser });
      });
    })(req, res, next);
  });

  app.post('/loginuser', function (req, res, next) {
    //console.log(req.auth);
    passport.authenticate('local-login', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        console.log(info);
        return res.send(403, { error: info.message });
      }
      //possibile optimization: don't even get the notes from the server?
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        var fullUser = Object.assign({}, user.toJSON({ virtuals: true }));
        delete fullUser['notes'];
        res.json({ content: fullUser });
      });
    })(req, res, next);
  });


  //get user information for specific userID
  app.route('/api/:id')
    .get(isLoggedIn, function (req, res) {
      console.log(req.url);
      console.log(req.params.id);
      Users.findById(req.params.id, function (err, user) {
        if (err) {
          //res.json({isError:true});
          return res.send(403, { error: "User not found!" });
        } else {
          console.log(user.notes);
          //res.json({isError:false, content:user.notes});
          res.json({ content: user.notes });
        }
      });
    })


  function changeNote(req, res, action) {
    console.log(action);
    var toReturn = {};
    var errMsg = '';
    Users.findById(req.params.id, function (err, user) {
      if (err) {
        return res.send(403, { error: "User not found!" });
      } else {
        var editNote = user.notes.id(req.params.noteID);
        switch (action) {
          case 'refresh':
            console.log(req.body.content);
            user.notes = [];
            user.notes = req.body.content;
            toReturn = { content: user.notes };
            errMsg = 'Note refresh failed!';
            break;
          case 'add':
            user.notes.unshift(req.body);
            console.log(user.notes[0]);
            toReturn = { content: user.notes[0] };
            errMsg = 'Adding note failed! Please check the length of the note.';
            break;
          case 'edit':
            editNote.content = req.body.content;
            editNote.color = req.body.color;
            toReturn = { content: editNote };
            errMsg = 'Editing note failed! Please check the length of the note.';
            break;
          case 'delete':
            editNote.remove({ _id: req.params.noteID }, function (err, note) {
              if (err) return res.send(403, { error: "Remove Failed!" });
            });
            errMsg = 'Failed to delete note!';
            toReturn = { content: editNote };
            break;
          case 'deleteall':
            var noteLen = user.notes.length - 1;
            for (let i = noteLen; i > -1; i--) {
              user.notes.id(user.notes[i]._id).remove();
            }
            //do a non mutating action here instead
            errMsg = 'Failed to delete notes!';
            toReturn = {};
            break;
          default:
            return res.send(403, { error: "Operation not completed!" });
        }
        user.save(function (err) {
          if (err) {
            console.log(err);
            return res.send(403, { error: errMsg });
          } else {
            console.log('Notes Changed');
            res.json(toReturn);
          }
        });
      }
    })
  }



  app.route('/api/:id/refresh')
    .post(isLoggedIn, function (req, res) {
      //console.log(req.url);
      console.log(req.params.id);
      console.log(req.body);
      return changeNote(req, res, 'refresh');
    })
  //add note
  app.route('/api/:id/add')
    .post(isLoggedIn, function (req, res) {
      //console.log(req.url);
      console.log(req.params.id);
      console.log(req.body);
      return changeNote(req, res, 'add');
    })

  app.route('/api/:id/del')
    .delete(isLoggedIn, function (req, res) {
      //console.log(req.url);
      console.log(req.params.id);
      console.log(req.body);
      return changeNote(req, res, 'deleteall');
    })

  app.route('/api/:id/:noteID')
    //edit note
    .put(isLoggedIn, function (req, res) {
      console.log(`Edit requested for ${req.params.id} with ${req.body.content} `)
      console.log(req.params.id)
      console.log(req.params.noteID);
      console.log(req.body);
      return changeNote(req, res, 'edit');
    })
    //delete note
    .delete(isLoggedIn, function (req, res) {
      return changeNote(req, res, 'delete');
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
            user.save(function (err) {
              if (err) {
                //res.json({isError:true, content:err});
                return res.send(403, { error: "User save failed!" });
              } else {
                res.json({ content: "Password Changed! Please log back in. Logging out..." });
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
            if (err) {
              console.log(err);
              return res.send(403, { error: "User not removed!" });
            } else {
              Users.findById(user._id, function (err, user) {
                console.log(user) // null
                console.log(err);
              });
              res.json({ content: "Account deleted! Goodbye forever :`(" });
            }
          })

        }
      });
    });

};

//Controller template
var path = require("path");
var mongoose = require('mongoose');
var Content = mongoose.model('Content');
var htmlPath = path.join(__dirname, "./../../server/");
var requireFolder = require("./../config/req_folder.js");
var models = requireFolder("models");

  module.exports = {
    create: function(req, res){
      console.log(req.body)
      var document = new Content(req.body)
      document.content = {}
      for (each in req.body) {
        if ( each != 'type' ) {
          console.log("each:", each, req.body[each])
          document.content[each] = req.body[each]
        }

      }

      console.log("new document: \n" + document)
      document.save(function(err, content) {
        if (err) {
          console.log("\n\n\n\n!!!!!!!!!!!!!!!!!\n" + err)
        } else {
          console.log("\n\n\n\n!!!!\n"+content)
          res.redirect('/admin/content#executives')
        }
      })

      console.log(Content.find({type:'executive'}));
    },
    update: function(req, res) {
      console.log("\n\n\n\n!!!!!!!!\nUPDATING!!!\n")
      // console.log(req.params.id)
      var updates = {};
      updates.content = {};
      for (each in req.body) {
        if ( each != 'type' ) {
          console.log("each:", each, req.body[each])
          updates.content[each] = req.body[each]
        }
      }
      console.log(updates)
      Content.update({_id: req.params.id}, updates, {}, function(err) {
          if (err) { console.log("\n\n\nERROR!!!!\n"+err); res.send( "ERROR:\n" + err ) }
          else {
            res.redirect('/admin/content#executives')
          }
        })
      // })
      // Content.findOne({_id: req.params.id}, function(err, content) {
      //   console.log("\nORIGINAL CONTENT:\n"+content)
      //   for (each in req.body) {
      //     if ( each != 'type' ) {
      //       console.log("each:", each, req.body[each])
      //       content.content[each] = req.body[each]
      //     }
      //   }
        // content.save(function(err) {
        //   if (err) { console.log("\n\n\nERROR!!!!\n"+err); res.send( "ERROR:\n" + err ) }
        //   else {
        //     console.log("\nUPDATED CONTENT:\n"+content)
        //     res.redirect('/admin/content#executives')
        //   }
        // })
      // })

    }
  }

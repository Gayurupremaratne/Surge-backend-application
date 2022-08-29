const response = require('../helpers/response');
const NotesModel = require('../models/notes');


const studentRoutes = {


  createNote: (req, res) => {
          const {
            title,
            description,
            id,
            createdDate
          } = req.body;
       
          const note = new NotesModel({
            title: title,
            description:description,
            userID:id,
            createdDate:createdDate
        });
      
          note.save( (err, data) => {
            if (err) {
              response.fail(
                req,
                res,
                response.messages.unable_to_load,
                "note create",
                err
              );
              return;
            } else {
              response.success(req, res, data, "successfully created");
              return;
            }
          });
        },
      
    
    
    getNotesByUserID: (req, res) => {
      const { id } = req.params;
    
      NotesModel.find({ userID: id }, (err, data) => {
        if (err) {
            response.fail(req, res, response.messages.db_error, 'Get notes', err);
            return;
        }
        else {
            response.success(req, res, data, "successfully retrieved");
            return;

        }
    });
    },



    update: (req, res) => {
        const { id } = req.params;
        const { title, description, userID, createdDate } = req.body;

        const userData = {
            title:title,
            description:description,
            userID:userID,
            createdDate:createdDate
        };
        console.log("data",id)
        NotesModel.updateOne({_id:id},
          {$set: 
              { "title":title,
                "description":description
                
          }}).then(result =>{
              if (!result) {
                  response.fail(req, res, response.messages.db_error, 'Save note', result);
                  return;
              }
              else {

                  response.success(req, res, result, 'Successfully updated');
                  return;
              }
          })
      //   NotesModel.findByIdAndUpdate(id, userData, { useFindAndModify: false }).then(result =>{
      //     if (!result) {
      //         response.fail(req, res, response.messages.db_error, 'update note', result);
      //         return;
      //     }
      //     else {

      //         response.success(req, res, result, 'Successfully updated');
      //         return;
      //     }
      // })
             
        //   if(err){
        //     response.fail(req, res, response.messages.db_error, 'update note', err);
        //     return;
        //   }
        //   else {

        //     response.success(req, res, result, 'Successfully updated');
        //     return;
        // }
    },

    delete: (req, res) => {
      NotesModel.findByIdAndRemove(req.params.id, (err, data) => {
          if (err) {
            response.fail(
              req,
              res,
              response.message.unable_to_load,
              "delete note",
              err
            );
            return;
          } else {
            response.success(req, res, data, "successfully deleted");
            return;
          }
        });
      },

      getNoteByID: (req, res) => {
        const { id } = req.params;
        NotesModel.findById(id, (err, data) => {
            if (err) {
                response.fail(req, res, response.messages.db_error, 'Get student', err);
                return;
            }
            else {
                response.success(req, res, data, "successfully retrieved");
                return;

            }
        });
    },



};
module.exports = studentRoutes;

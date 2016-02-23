// This file reads through the /images folder and creates a student entry for
// each unique image. Currently, the server must be restarted to sync the images.
// It uses the same concepts as mongoose.js.

var fs       = require('fs'),
    mongoose = require('mongoose');

var Student = mongoose.model('Student');


var img_path = __dirname + '/../../images';

fs.readdirSync(img_path).forEach(function(file){
	if(file.indexOf('.jpg') > 0){
    Student.findOne({img: file}, function(err, student){
      //console.log(student);
      if(!student){
        var new_student = new Student({img: file, needs_info: true, name: '', cohort: ''});
        new_student.save(function(err){
          console.log('Image added')
        })
      }
    })
	}
})

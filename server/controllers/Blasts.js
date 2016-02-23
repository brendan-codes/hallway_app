var mongoose = require('mongoose');
var Blast = mongoose.model('Blast');


module.exports = (function(){

  return {
    get_blast: function(req, res){
      Blast.findOne({}, function (err, blast){
        if(err){
          console.log('broke as f');
        }else{
          console.log(blast);
          res.json(blast);
        }
      })
    },

    update_blast: function(req, res){
      res.end();
    }
  };

})();

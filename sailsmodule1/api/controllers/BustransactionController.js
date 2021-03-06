module.exports = {
   signupForTransport : function(req, res) {
    var signupDetails = req.allParams();
    Bustransaction.create(signupDetails).exec(function(err, response) {
      if(err) return  console.log(err);

      if(response) {
        console.log(signupDetails.transcript_number);
        return res.json(response);
      }
    });
  },
  updateFeeStatus : function(req, res) {
    Bustransaction.update({id : req.param('id')}, {feeStatus : true}).exec(function(err, responseTransaction) {
        if(err) return console.log(err);

        if(responseTransaction.length) {
          Businfo.create({profile_id : responseTransaction[0].profile_id, bus_id : responseTransaction[0].stop_details}).exec(function(response) {
            if(err) return console.log(err);

            return res.json(response);
          });
        }
        else {
          return res.status(404).json({error : "Transaction not found with the given transaction number"});
        }
    });
  }
};

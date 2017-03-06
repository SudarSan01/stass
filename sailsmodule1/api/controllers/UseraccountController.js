/**
 * UseraccountController
 *
 * @description :: Server-side logic for managing Useraccounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	generateAccount : function(req, res) {
		var accountDetails = req.allParams();
		Useraccount.create(accountDetails).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
		});
	},

	authenticate : function(req, res) {
		Useraccount.findOne({roll_number : req.param('roll_number')}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				if(response.password === req.param('password')) {
					delete response.password
					return res.json(response);
				}
				else {
					return res.json({error : 'Password incorrect...'});
				}
			}
			else {
				return res.json({error : 'Username incorrect...'});
			}
		});
	},

	createAccount : function(req, res) {
		var accountDetails = req.allParams();
		Useraccount.update({id : accountDetails.id}, accountDetails).exec(function(err, response) {
			if(err)	return	console.log(err);

			if(response.length>0) {
				delete response[0].password;
				return res.json(response[0]);
			}
			else {
				return res.status(404).json({error : 'The account seems to be missing...'});
			}
		});
	},

	findAccountByRollNumber : function(req, res) {
		Useraccount.findOne({roll_number : req.param('roll_number')}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				delete response.password;
				return res.json(response);
			}	else {
				return res.json({error : 'Username is invalid...'})
			}
		});
	}
};

var config = require('../../configs/configs');


/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
	*/

	var smtpTransport = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: config.Gmailuser,
			pass: config.Gmailpassword
		},
		tls: {rejectUnauthorized: false},
		debug:true
	});



	exports.SendMail = function(req,res){
		var mailOptions={
			to : config.Gmailuser,
			subject : req.body.subject,
			text : req.body.text
		}
		console.log(mailOptions);
		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
				res.end("error");
			}else{
				console.log("Message sent: " + response.message);
				res.end("sent");
			}
		});
	};
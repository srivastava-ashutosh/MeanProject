var config = require('./configs');

/*************
Purpose: Grenerate Token using JWT
Parameter: {
	logindetails: It accept username and password of user
}
Return: String
****************/
exports.getToken = function(logindetails) {

    var token = jwt.sign({
        auth: logindetails,
        algorithm: "HS256",
        exp: Math.floor(new Date().getTime() / 1000) + config.tokenExpiry
    }, config.securityToken);
    return token;
}

/*************
Purpose: It check token expiration
Parameter: {
	token: Token generated for a user.
}
Return: Boolean
****************/
function checkExpiration(token) {
    var decoded = jwt.decode(token);
    let now = parseInt(new Date().getTime() / 1000);
    let expTime = decoded.exp
    if (now > expTime) {
        return false;
    } else {
        return true;
    }

}

/*************
Purpose: It is created to check the useris suthorised or not
Parameter: {
	token: Token generated for a user.
}
Return: Number/Object
******************/
exports.isAuthorised = function(token) { 
    let arrToken = global.permission
    let len = arrToken.length;
    console.log("length", len)
    if (len) {
        for (let i = 0; i < len; i++) {
            //console.log("toke: ",arrToken[i].tokenID)
            if (arrToken[i].tokenID == token) {
                if (checkExpiration(token)) {
                    val = {
                        email: '' + arrToken[i].emailID + '',
                        role: '' + arrToken[i].role + ''
                    };
                    break;
                } else {
                    val = 0
                }

            } else {
                val = 0;
            }

        }
        return val;
    } else {
        return undefined;
    }
}

/*************
Purpose: Checking the role Admin/User
Parameter: {
	emailID: The email Id need to check for admin
}
Return: Boolean
****************/
exports.checkAdmin = function(emailID) {
	let admins = config.adminEmails.split(',')
	for(var i=0; i<admins.length; i++)
	{
		if(admins[i]==emailID){ return true}
	}
return false;
/*return emailID == 'chandrakanta1@indianic.com' || emailID == 'chandrakanta@indianic.com' || emailID == 'chandrakanta2@indianic.com'*/
}

/*************
Purpose: Remove duplicate logged in user 
Parameter: {
	emailID: N/A
}
Return: Array 
****************/
exports.eliminateDuplicates = function(arr) {
    function compare(a, b) {
        if (a.emailID < b.emailID)
            return -1;
        if (a.emailID > b.emailID)
            return 1;
        return 0;
    }

    arr.sort(compare);

    if (arr.length > 1) {
        for (var i = 0; i < arr.length - 1; i++) {

            if (arr[i].emailID == arr[i + 1].emailID) {

                arr.splice(i, 1)
            }
        }
        return arr;
    } else {
        return arr;
    }
}

exports.getTokenIndex = function(arrToken, token) {
    console.log("to: ", token,"arrToken",arrToken)
    let len = arrToken.length;
    console.log("len: ", len)
    if (len) {
        for (var i = 0; i < len; i++) {
            if (arrToken[i].tokenID == token) {
                return i;
            }

        }
    } else {
        return -1;
    }
}
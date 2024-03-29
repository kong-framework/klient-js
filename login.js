/// Account authenticatation input
class KongAccountAuthInput{
    constructor(username, password){
	this.username = username;
	this.password = password;
    }

    /// Validate input
    validate(){
	Validate.username(this.username);
	Validate.password(this.password)
    }
}

const KongLoginAPI = {
    address: "/login",
    /// Authenticate (login) user
    async authenticate(account_auth_input){
	if (!account_auth_input instanceof KongAccountAuthInput){
	    throw KongError.InvalidInput;
	}

	// validate input
	account_auth_input.validate();

	return fetch(this.address, {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(account_auth_input),
	})
	    .then((response) => {
		switch (response.status){
		case 200:
		    return response.json();
		case 400:
		    throw KongError.InvalidInput;
		case 401:
		    throw KongError.InvalidInput;
		case 404:
		    throw KongError.NotFound;
		case 500:
		    throw KongError.InternalServer;
		}
	    })
	    .catch((error) => {
		throw error;
	    });
    },
}

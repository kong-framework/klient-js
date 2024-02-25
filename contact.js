class KongContactMessageInput{
    constructor(name, email, message){
	this.name = name;
	this.email = email;
	this.message = message;
    }

    /// Validate input
    validate(){
	Validate.email(this.email);
    }
}

const KongContactMessageAPI = {
    address: "/contact",

    /// send message
    async send_message(contact_message_input){
	if (!contact_message_input instanceof KongContactMessageInput){
	    throw KongError.InvalidInput;
	}

	// validate input
	contact_message_input.validate();

	return fetch(this.address, {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(contact_message_input),
	})
	    .then((response) => {
		switch (response.status){
		case 201:
		    return response.json();
		case 400:
		    throw KongError.InvalidInput;
		case 401:
		    throw KongError.InvalidInput;
		case 404:
		    throw KongError.AccountNotFound;
		case 500:
		    throw KongError.InternalServer;
		}
	    })
	    .catch((error) => {
		throw error;
	    });
    },
}

class KongNewsletterSubcriberInput{
    constructor(email){
	this.email = email;
    }

    /// Validate input
    validate(){
	Validate.email(this.email);
    }
}

const KongNewsletterAPI = {
    address: "/newsletter",

    /// subscribe to newsletter
    async subscribe(subscription_input){
	if (!subscription_input instanceof KongNewsletterSubcriberInput){
	    throw KongError.InvalidInput;
	}

	// validate input
	subscription_input.validate();

	return fetch(this.address, {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(subscription_input),
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

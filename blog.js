/// Account creation input
class KongBlogInput {
    constructor(title, subtitle, overview, author, cover, content){
	this.title = title;
	this.subtitle = subtitle;
	this.overview = overview;
	this.author = author;
	this.cover = cover;
	this.content = content;
    }

    /// Validate input
    validate(){
	// TODO:
    }
}

const KongBlogAPI = {
    address: "/blog",

    /// Submit blog
    async post_blog(input) {
	if (!input instanceof KongBlogInput){
	    throw KongError.InvalidInput;
	}

	// validate input
	input.validate();

	const formData = new FormData();

	formData.append("title", input.title);
	formData.append("content", input.content);
	formData.append("subtitle", input.subtitle);
	formData.append("overview", input.overview);
	formData.append("author", input.author);
	formData.append("cover", input.cover);

	return fetch(this.address, {
	    method: "POST",
	    body: formData,
	})
	    .then((response) => {
		switch (response.status){
		case 201:
		    return response.json();
		case 400:
		    throw KongError.InvalidInput;
		case 401:
		    throw KongError.Unauthorized;
		case 500:
		    throw KongError.InternalServer;
		}
	    })
	    .catch((error) => {
		throw error;
	    });
    },

    /// Get all blog posts
    async get_all() {
	return fetch(this.address, {
	    method: "GET",
	})
	    .then((response) => {
		switch (response.status){
		case 200:
		    return response.json();
		case 400:
		    throw KongError.InvalidInput;
		case 401:
		    throw KongError.Unauthorized;
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
    /// Get single blog post by id
    async get_by_id(id) {
	return fetch(this.address+"/"+id, {
	    method: "GET",
	})
	    .then((response) => {
		switch (response.status){
		case 200:
		    return response.json();
		case 400:
		    throw KongError.InvalidInput;
		case 401:
		    throw KongError.Unauthorized;
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
    /// Get single blog post by id
    async delete_by_id(id) {
	return fetch(this.address+"/"+id, {
	    method: "DELETE",
	})
	    .then((response) => {
		switch (response.status){
		case 200:
		    return response.json();
		case 400:
		    throw KongError.InvalidInput;
		case 401:
		    throw KongError.Unauthorized;
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

    /// Submit blog
    async update(id, input) {
	if (!input instanceof KongBlogInput){
	    throw KongError.InvalidInput;
	}

	// validate input
	input.validate();

	const formData = new FormData();

	formData.append("title", input.title);
	formData.append("content", input.content);
	formData.append("subtitle", input.subtitle);
	formData.append("overview", input.overview);
	formData.append("author", input.author);
	formData.append("cover", input.cover);

	return fetch(this.address+"/"+id, {
	    method: "PUT",
	    body: formData,
	})
	    .then((response) => {
		switch (response.status){
		case 201:
		    return response.json();
		case 400:
		    throw KongError.InvalidInput;
		case 401:
		    throw KongError.Unauthorized;
		case 500:
		    throw KongError.InternalServer;
		}
	    })
	    .catch((error) => {
		throw error;
	    });
    }
};

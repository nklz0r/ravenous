const apiKey = 'removed for security reasons :)';
//http://gobetween.oklabs.org/
//https://cors-anywhere.herokuapp.com/
//http://www.whateverorigin.org/get?url=

export const Yelp = {

    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}&autocomplete`, { headers: { Authorization: `Bearer ${apiKey}` } }).then(
            response => {
                return response.json();
            }
        ).then(jsonResponse => {
            try {
                if (jsonResponse.businesses) {
                    // console.log(jsonResponse.businesses);
                    return jsonResponse.businesses.map(business => {
                        // console.log(business);
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: business.categories[0].title,
                            rating: business.rating,
                            reviewCount: business.review_count
                        };
                    });
                }
                throw Error('No matches! Please try again with a bigger city :)')
            } catch (e) {
                alert(e);
                window.location.reload();
            }
        })





    }
};

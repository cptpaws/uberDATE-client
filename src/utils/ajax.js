const BASE_URL = 'http://api.uberdate.com';

export default url => ({
    get(params = {}) {
        let queryString = Object.keys(params).reduce((query, key) => {
            query += key;
            query += '='
            query += params[key];
        }, '?');

        if (queryString.length === 1) {
            queryString = '';
        }

        return fetch(BASE_URL + url + queryString)
            .then(response => response.json());
    }
});
import axios from 'axios';

export default axios.create({
    baseURL: 'https://bookshelf-api-bangkit.herokuapp.com/',
    headers: {
        "Content-Type": "application/json"
    }
});
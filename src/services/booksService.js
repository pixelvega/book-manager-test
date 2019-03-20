const ENDPOINT = './data/api.json';

const fetchBooks = () => fetch(ENDPOINT).then((resp) => resp.json());

export {fetchBooks};
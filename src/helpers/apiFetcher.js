function apiFetcher(keyWord) {
  fetch(
    `https://newsapi.org/v2/everything?q=${keyWord}&from=2022-10-28&sortBy=popularity&apiKey=e30be37faba149bab93e668c8f451943`
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
}
export default apiFetcher;

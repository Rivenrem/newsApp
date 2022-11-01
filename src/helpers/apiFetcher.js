async function apiFetcher(keyWord) {
  try {
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${keyWord}&from=2022-10-28&sortBy=popularity&apiKey=e30be37faba149bab93e668c8f451943`
    );
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
export default apiFetcher;

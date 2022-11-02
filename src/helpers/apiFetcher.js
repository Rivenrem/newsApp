async function apiFetcher(keyWord) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${keyWord}&from=2022-10-28&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
export default apiFetcher;

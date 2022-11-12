const apiKey = process.env.REACT_APP_API_KEY;
const url = "https://newsapi.org";

async function apiFetcher(keyWord, pageNumber = 1, pageSize = 6) {
  try {
    const response = await fetch(
      `${url}/v2/everything?q=${keyWord}&pageSize=${pageSize}&page=${pageNumber}&from=2022-10-28&sortBy=popularity&apiKey=${apiKey}`
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}
export default apiFetcher;

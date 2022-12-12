const apiKey = process.env.REACT_APP_API_KEY;
const url = "https://newsapi.org";

async function apiFetcher(
  keyWord,
  pageNumber = 1,
  pageSize = 6,
  sortBy = "popularity"
) {
  try {
    const response = await fetch(
      `${url}/v2/everything?q=${keyWord}&pageSize=${pageSize}&page=${pageNumber}&sortBy=${sortBy}&apiKey=${apiKey}`
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}
export default apiFetcher;

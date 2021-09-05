export default function API(keyWord, page) {
  const APIkey = "21721511-ce488bab5f3ab5c9e5600089b";
  const baseURL = "https://pixabay.com/api/";
  const URL = `${baseURL}?q=${keyWord}&page=${page}&key=${APIkey}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(URL).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
}

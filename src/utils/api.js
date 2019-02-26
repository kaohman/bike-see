export const fetchData = async (path, method, data = null) => {
  let options;
  switch (method) {
    case 'DELETE':
      options = { method };
      break
    case 'GET':
      options = data;
      break
    default:
      options = {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      };
  }
  const response = await fetch(path, options);

  if (response.status === 204) {
    return
  } else if (response.ok) {
    return response.json();
  } else {
    throw Error(response.statusText);
  }
};
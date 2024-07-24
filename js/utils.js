export async function apiFetch(url, method = "GET", body = null, headers = {}) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  }
  
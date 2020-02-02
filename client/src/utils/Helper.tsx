
/**
 * API Request handler
 * @param url - api endpoint
 * @param method - http method
 * @param bodyParams - body parameters of request
 * @param token - JWT token
 */
export const apiRequest = async (
  url: string,
  method: string,
  bodyParams?: string | object
): Promise<any> => {
  const response = await fetch(url, {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: bodyParams ? JSON.stringify(bodyParams) : undefined
  });
  return await response.json();
};


export const apiTokenVerification = async (
  token: string,
): Promise<any> => {
  const response = await fetch("http://localhost:3001/api/users/verify", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "Accept": 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

export const apiRequestWithImg = async (
  url: string,
  method: string,
  bodyParams?: any
): Promise<any> => {
  const response = await fetch(url, {
    mode: 'no-cors',
    method,
    body: bodyParams
  });
  return await response;
};
export const productKey = "product";
export const tokenKey = "tokenKey";
export const userKey = "userKey";



//save token and get token from storage
export function saveToken(token) {
  saveToStorage(tokenKey, token)

}
export function getToken() {
  return getFromStorage(tokenKey)

}

// save user and get user from storage
export function saveUser(user) {
  saveToStorage(userKey, user)

}

export function getUser() {

  const user = getFromStorage(userKey)
  if (user) {
    return user.username;
  } else {
    return null;

  }
}

//save to storage function
export function saveToStorage(key, value) {

  localStorage.setItem(key, JSON.stringify(value))

};

//get from storage function
export function getFromStorage(key) {

  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  } else {
    return (JSON.parse(item));
  }

}
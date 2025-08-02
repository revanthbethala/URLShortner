export const validateUrl = (url) => {
  const exp = RegExp("https?://[a-zA-z0-9]{3,7}");
  return url.match(exp);
};

export function generateShortCode() {
  const letters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += letters[Math.floor(Math.random() * (letters.length) - 1)];
  }
  return code;
}

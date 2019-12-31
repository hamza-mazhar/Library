const header = {
  "Content-Type": "application/x-www-form-urlencoded",
  authorization: localStorage.getItem("token")
};

export { header };

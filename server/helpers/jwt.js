const expressJWT = require("express-jwt");

const authenticationJWT = () => {
  console.log(process.env.API_SECRET_KEY);
  return expressJWT({
    secret: process.env.API_SECRET_KEY,
    algorithms: ["HS256"],
  });
};
module.exports = authenticationJWT;

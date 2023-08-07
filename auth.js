const jwtSecret = "your_jwt_secret"; // This has to be the same key used in the JWTStrategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); // local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username that's being encoded in the JWT
    expiresIn: "7d", // This specifies that the token will expire in 7 days
    algorithm: "HS256", // Algorithm used to “sign” or encode the values of the JWT
  });
};

/* POST login. */
module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something isnt right.",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM2YmI2NDZmZGEyODdkNjQyZjU5YTMiLCJVc2VybmFtZSI6Ik1hcnNoYWxsIiwiUGFzc3dvcmQiOiJ0ZXN0cGFzc3dvcmQzMDAiLCJFbWFpbCI6InRlc3R1c2VyMTAxQGdtYWlsLmNvbSIsIkJpcnRoZGF5IjoiMTk1My0wOS0wMlQwNDowMDowMC4wMDBaIiwiRmF2b3JpdGVNb3ZpZXMiOlsiNjRjNWFhMTc5YzQwMmI3ZWRiMTQwZjM0Il0sIl9fdiI6MCwiaWF0IjoxNjkxMTA3Nzk3LCJleHAiOjE2OTE3MTI1OTcsInN1YiI6Ik1hcnNoYWxsIn0.zpap8s9cWvLF_QOv_ZPQVUDl2UlqhqB-iEXhEM_6kT8

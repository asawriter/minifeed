// require("dotenv").config();
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const {
//   getUserByEmail,
//   createUser,
//   getUserById,
// } = require("../services/userService");

// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3001/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
 
//       const data = {
//         username: profile.displayName,
//         email: profile.emails[0].value,
//         profilePic : profile.photos[0].value
//       };

//       getUserByEmail(data.email)
//         .then((existingUser) => {
//           if (existingUser) {
//             console.log("Existing User Google");
//             return done(null, existingUser);
//           }

//           const user = createUser(data.email, data.username, data.profilePic);
//           user
//             .then((newUser) => {
//               console.log("Saved new User Google");
//               return done(null, newUser);
//             })
//             .catch((err) => console.log(err));
//         })
//         .catch((err) => console.log(err));
//     }
//   )
// );

// passport.serializeUser((user, done) => done(null, user.id));

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await getUserById(id);
//     return done(null, user);
//   } catch (error) {
//     return done(error);
//   }
// });

// module.exports = {
//   initialize: passport.initialize(),
//   session: passport.session(),
// };

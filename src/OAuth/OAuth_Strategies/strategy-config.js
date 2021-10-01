// import GoogleStrategy from 'passport-google-oauth20'
import FacebookStrategy from 'passport-facebook'
import passport from 'passport'
import User from '../../db/models/User.js'
import { JWTAuthenticate } from '../jwt-aux.js'


// const googleStrategyConfig = {
//     clientID: process.env.GOOGLE_API_OAUTH_ID,
//     clientSecret: process.env.GOOGLE_API_SECRET_KEY,
//     callbackURL: process.env.BE_URL + process.env.PORT + '/user/googleRedirect',
// }
const facebookStrategyConfig = {
    clientID: process.env.FACEBOOK_API_OAUTH_ID,
    clientSecret: process.env.FACEBOOK_API_SECRET_KEY,
    callbackURL: process.env.BE_URL + process.env.PORT + '/user/facebookRedirect',
}

// export const googleStrategy = new GoogleStrategy(
//     googleStrategyConfig
// ,
//     async (accessToken, refreshToken, profile, passportNext) => {
//         try {
//           console.log(profile)
    
//           const user = await User.findOne({ googleId: profile.id })
    
//           if (user) {
//             const tokens = await JWTAuthenticate(user)
//             passportNext(null, { tokens })

//           } else {
//             const newUser = {
//               name: profile.name.givenName,
//               surname: profile.name.familyName,
//               email: profile.emails[0].value,
//               role: "User",
//               googleId: profile.id,
//             }
    
//             const createdUser = new User(newUser)
//             const savedUser = await createdUser.save()
//             const tokens = await JWTAuthenticate(savedUser)
    
//             passportNext(null, { user: savedUser, tokens })
//           }
//         } catch (error) {
//           console.log(error)
//           passportNext(error)
//         }
//       }
    
    
// )
export const facebookStrategy = new FacebookStrategy(
  facebookStrategyConfig
,
    async (accessToken, refreshToken, profile, passportNext) => {
        try {
          console.log(profile)
    
          const user = await User.findOne({ facebook_Id: profile.id })
    
          if (user) {
            const tokens = await JWTAuthenticate(user)
            passportNext(null, { tokens })

          } else {
            const newUser = {
              name: profile.name.givenName,
              surname: profile.name.familyName,
              email: profile.emails[0].value,
              role: "guest",
              facebook_Id: profile.id,
            }
    
            const createdUser = new User(newUser)
            const savedUser = await createdUser.save()
            const tokens = await JWTAuthenticate(savedUser)
    
            passportNext(null, { user: savedUser, tokens })
          }
        } catch (error) {
          console.log(error)
          passportNext(error)
        }
      }
    
    
)


passport.serializeUser(function (user, passportNext) {
  passportNext(null, user)
})

export default googleStrategy
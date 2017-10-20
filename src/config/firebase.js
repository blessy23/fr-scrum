export const firebase = {
  apiKey: "AIzaSyBVPKq9-fL36OGT3L_3H21PkJDiK0NX76w",
  authDomain: "cnc-scrum.firebaseapp.com",
  databaseURL: "https://cnc-scrum.firebaseio.com",
  projectId: "cnc-scrum",
  storageBucket: "cnc-scrum.appspot.com", 
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
  // profileDecorator: (userData) => ({ email: userData.email }) // customize format of user profile
}

export const env = 'development'

export default { firebase, reduxFirebase, env }
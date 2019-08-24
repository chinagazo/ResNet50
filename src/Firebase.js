import * as firebase from 'firebase'
let database;
let config = {
    apiKey: "AIzaSyCSa3Vfhsfe6UCuijYr_RoaNb3kzFnwLZM",
    authDomain: "openhackfinal.firebaseapp.com",
    databaseURL: "https://openhackfinal.firebaseio.com",
    projectId: "openhackfinal",
    storageBucket: "",
    messagingSenderId: "113425041146",
    appId: "1:113425041146:web:58106b374a7d6631"
}

export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
 	database = firebase.database()
}

export const getFireDB = () => {
    return database.ref('/').once('value');
}
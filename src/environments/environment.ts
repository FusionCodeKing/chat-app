// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA-jirCCm4CzWUgtRoLW0y3L8ImxoCId7M',
    authDomain: 'chat-5f67d.firebaseapp.com',
    databaseURL: 'https://chat-5f67d.firebaseio.com',
    projectId: 'chat-5f67d',
    storageBucket: 'chat-5f67d.appspot.com',
    messagingSenderId: '941467250243'
  }
};

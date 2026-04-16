importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDzPV_Sno4HLTNOnMpbF0JN_iH-F7sIFyo",
    authDomain: "houseapp-10b27.firebaseapp.com",
    projectId: "houseapp-10b27",
    storageBucket: "houseapp-10b27.firebasestorage.app",
    messagingSenderId: "962464125604",
    appId: "1:962464125604:web:b3e8ceb64f360c6cb54c31",
    measurementId: "G-HYSCEZ509F"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background Notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.image
  });
});

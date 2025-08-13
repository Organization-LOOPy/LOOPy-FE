importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBb9zf1oaRyehw5EVzcDDIT0YGpq5GLBj8",
  authDomain: "loopy-task.firebaseapp.com",
  projectId: "loopy-task",
  messagingSenderId: "32311132987",
  appId: "1:32311132987:web:1a1e9e3179d12615d36d1e",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 알림:", payload);
  const notification = payload.notification;
  self.registration.showNotification(notification.title, {
    body: notification.body,
    icon: "/logo192.png", 
  });
});

// const INACTIVITY_TIMEOUT = 20 * 60 * 5000; // 20 minutes in milliseconds

// let lastActivityTime = new Date()

// window.addEventListener('click', () => {
//     lastActivityTime = new Date();
// });

// setInterval(() => {
//     const currentTime = new Date();
//     const timeSinceLastActivity = currentTime - lastActivityTime;

//     if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
//         let USER = sessionStorage.getItem('user')
//         if(USER){
//             sessionStorage.removeItem('user');
//         }
//     }
// }, 1000);

export default function ({ $root }) {
    if (process.client) {
      window.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          localStorage.clear();
        }
      });
    }
  }
<template>
    <div>
        <script src="https://www.googletagmanager.com/gtm.js?id=GTM-MR3XTCWQ"></script>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MR3XTCWQ" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      // Ensure the script is added only once
      if (!document.getElementById('gtm-script')) {
        const script = document.createElement('script');
        script.id = 'gtm-script';
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-MR3XTCWQ';
        document.body.appendChild(script);
  
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MR3XTCWQ" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `;
        document.body.appendChild(noscript);
      }
    },
  };
  </script>
  
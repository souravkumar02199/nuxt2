<template>
    <div>
      <header-bar></header-bar>
      <menu-bar class="d-none d-md-block"></menu-bar>
      <section class="pagetitle">
        <div class="title">
            <h1>Cookie Policy</h1>
        </div>
    </section>

    <section class="terms">
        <div class="container_wrap">
            <h2>What are cookies?</h2>
            <p>Cookies are small text files that are sent by a website to a web browser and contain information that is transferred to your computer’s hard drive. This enables the website to identify and track the web browser. Cookies can, among other functions,
                enable a website to recognise a device each time it visits, remember user preferences and recommend content. Cookies in themselves do not identify the individual user, but rather the computer used. However, some cookies will contain personal
                information such as a user name.</p>

            <p>Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a more personalised user experience when you browse our website and also allows us to improve our website. By continuing to browse
                and use our website, you are agreeing to our use of cookies.</p>

            <p>Different cookies do different things and some are essential to the operation of a website, whilst others are not. The different types of cookie are:</p>

            <ul>
                <li>Strictly necessary cookies. These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website such as your account profile.</li>

                <li>Analytical/performance cookies. These allow us to recognise and count the number of visitors to our website and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for
                    example, by ensuring that users are finding what they are looking for easily.</li>

                <li>Functionality cookies. These are used to recognise you when you return to our website, enabling us to personalise our content for you, greet you by name and remember your preferences.
                </li>

                <li>Targeting cookies. These cookies record your visits to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your
                    interests. We may also share this information (in anonymised form) with third parties for this purpose.</li>


            </ul>

            <p>To the extent that any personal information is collected through our use of cookies, our Privacy Policy will apply to our processing of that personal information.</p>

            <h3>What about third-party cookies?</h3>
            <p>Third parties, including, for example, advertising networks and providers of external services like web traffic analysis services, also use cookies. These cookies are likely to be analytical/performance cookies or targeting cookies. They are
                used, for example, to track how many users have seen a particular ad and to ensure that you see ads that are relevant to you. These cookies are placed by the relevant third party and we have no control over these cookies other than allowing
                them to be served. See the table above for more specific information about some of the third party cookies which are used on our website.</p>

            <h3>Can I refuse or opt out of cookies?</h3>
            <p>Most browsers automatically accept cookies, but you can usually change your browser settings to limit or prevent cookies. Unless you have adjusted your browser settings so that it will refuse cookies, our system will issue cookies as soon
                as you visit our website. If you set your browser to not accept cookies, it may result in certain sections of our website not working properly and certain personalised services not being provided to users of your computer.</p>

            <p>More information about cookies generally can be found at: http://www.allaboutcookies.org/.</p>

            <p>You can find out how to opt out of being tracked by Google Analytics by visiting https://tools.google.com/dlpage/gaoptout.
            </p>

            <h3>Making changes to this policy</h3>

            <p>We may update this policy from time to time. Please check back here whenever you visit our website to see if any changes have been made. When we update this policy, we will also update the &quot;Last Updated&quot; date at the top of the page.</p>

            <h3>We use cookies</h3>
            <p>We use cookies and other tracking technologies to enhance your browsing experience on our website, to present you personalised content and targeted ads, to analyse our website traffic, and to understand where our visitors are coming from.</p>
        </div>
    </section>
    </div>
  </template>
  
  <script>
  import HeaderBar from '../components/layout/HeaderBar.vue'
  import MenuBar from '../components/layout/MenuBar.vue';
  export default {
    middleware: 'scrollToTopMiddleware',
    components: { HeaderBar, MenuBar },
  }
  </script>
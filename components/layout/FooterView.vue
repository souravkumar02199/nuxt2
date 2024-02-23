<template>
    <div>
        <footer class="bg-dark text-white py-5">
            <div class="container px-0 row py-md-5">
                <div class="col-12 col-md-6 col-lg mb-4 mb-md-0">
                    <DpLogo class="text-white" />
                    <p class="text-light mt-4">Dock - Space City, Unit 109 75 Exploration Drive, Leicester LE4 5NU</p>
                    <p class="text-light my-4">Call Us: 0800 756 3711 <br class="mb-3">sales@digitalpress.co.uk</p>
                    <div class="flex " style="gap: 1rem;">
                        <a href="https://www.facebook.com/digitalpressofficial/" target="_blank"><img src="~/assets/images/icons/facebook.svg" width="20" height="20" alt="facebook"></a>
                        <a href="https://www.instagram.com/digitalpress_official/" target="_blank"><img src="~/assets/images/icons/instagram.svg" width="20" height="20" alt="instagram"></a>
                        <a href="https://www.youtube.com/@DigitalPress_Official" target="_blank"><img src="~/assets/images/icons/youtube.svg" width="20" height="20" alt="youtube"></a>
                        <a href="https://www.linkedin.com/company/digital-press-official/" target="_blank"><img src="~/assets/images/icons/linkedin.svg" width="20" height="20" alt="linkedin"></a>
                        <a href="https://twitter.com/digitalpress_uk" target="_blank"><img src="~/assets/images/icons/twitter.svg" width="18" height="18" alt="twitter"></a>
                    </div>
                </div>
                <div class="col-6 col-md-6 col-lg mb-4 mb-md-0">
                    <p class="fw-bold mb-3 text-white text-uppercase">Who we are </p>
                    <ul>
                        <li><Nuxt-link to="/about">About Us</Nuxt-link></li>
                        <li><Nuxt-link to="/blogs">Our Blogs</Nuxt-link></li>
                        <li><Nuxt-link to="/enviromental_policy">Enviromental Policy</Nuxt-link></li>
                        <li><Nuxt-link to="/modern-slavery-act-policy-statement">Modern Slavery Statement</Nuxt-link></li>
                        <li><Nuxt-link to="/equal_gender_policy">Pay Policy</Nuxt-link></li>
                        <li><Nuxt-link to="/terms-and-condition">Terms & Conditions</Nuxt-link></li>
                    </ul>
                </div>
                <div class="col-6 col-md-4 col-lg mb-4 mb-md-0">
                    <p class="fw-bold mb-3 text-white text-uppercase">Learn more</p>
                    <ul>
                        <li><Nuxt-link to="/paper-size">Paper Size</Nuxt-link></li>
                        <li><Nuxt-link to="/return-policy">Return Policy</Nuxt-link></li>
                        <li><Nuxt-link to="/white-label-packaging">White Label</Nuxt-link></li>
                        <li><Nuxt-link to="/design-and-proofing">Artwork Proofing</Nuxt-link></li>
                        <li><Nuxt-link to="/privacy-policy">Privacy Policy</Nuxt-link></li>
                        <li><Nuxt-link to="/cookie-policy">Cookie Policy</Nuxt-link></li>
                    </ul>
                </div>
                <div class="col-6 col-md-4 col-lg mb-4 mb-md-0">
                    <p class="fw-bold mb-3 text-white text-uppercase">Products</p>
                    <ul>
                        <li><Nuxt-link to="/c/wedding-stationery">Wedding Stationery</Nuxt-link></li>
                        <li><Nuxt-link to="/c/exhibition-display-stands">Exhibition Displays</Nuxt-link></li>
                        <li><Nuxt-link to="/c/lightbox-displays">Lightboxes</Nuxt-link></li>
                        <li><Nuxt-link to="/c/brochure-and-booklets">Brochure & Booklets</Nuxt-link></li>
                        <li><Nuxt-link to="/bespoke_services">Bespoke Services</Nuxt-link></li>
                        <li><Nuxt-link to="/request_quote">Request a Quote</Nuxt-link></li>
                    </ul>
                </div>
                <div class="col-6 col-md-4 col-lg mb-4 mb-md-0">
                    <p class="fw-bold mb-3 text-white text-uppercase">Here to help </p>
                    <ul>
                        <li><Nuxt-link to="/contact">Contact Us</Nuxt-link></li>
                        <li><a href="#Newsletter">Newsletter</a></li>
                        <li><Nuxt-link to="/request_quote">Apply for an Account</Nuxt-link></li>
                        <li><Nuxt-link to="/request_quote">Request a Quote</Nuxt-link></li>
                        <li><Nuxt-link to="/request_quote">Design Request</Nuxt-link></li>
                    </ul>
                </div>
            </div>
        </footer>
        <section class="bg-black" style="background-color: #000">
            <div class="container py-4 row row-cols-1 row-cols-md-2 g-4 align-items-center">
                <small class="text-light text-center text-md-startmt-0">
                    © 2023 Tuli Print & Technologies Ltd trading as DigitalPress.co.uk. <br>
                    Registered in England. Registration number: 15228142. All rights reserved. <br>
                </small>
                <div class="d-flex justify-content-center mt-3 mt-md-0 justify-content-md-end">
                    <div class="text-white d-flex flex-column justify-content-end text-end" style="gap: 0.75rem;">
                        <img width="368" height="37" loading="lazy" src="~/assets/images/all/Layer3.png" class="w-50 ms-auto h-auto"
                            alt="Payment cards">
                            <small>
                                <a href="https://tulitechnologies.com/">e-commerce</a> by <b class="tuli-text">Tuli Technologies</b>
                            </small>
                    </div>
                
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import DpLogo from './DpLogo.vue'
export default {
    components: { DpLogo }
}
</script>
<style scoped>
p.h5 {
    font-size: 1.1rem;
}

ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    color: #EEE;
}

ul li a,
p {

    font-size: 0.9rem;
}

ul li a:hover {
    text-decoration: underline;
}

.tuli-text{
    font-size: 0.8rem !important;
}

</style>

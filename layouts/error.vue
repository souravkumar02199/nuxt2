<template>
    <section class="error-404-page">
        <div class="container text-center">
            <div class="image mx-auto text-center">
                <img src="@/assets/images/all/404.png" class="image-fluid" alt="">
            </div>
            <nuxt-link to="/" class="access-btn text-white d-inline-block bg-dark justify-content-center text-uppercase mx-auto mt-4" type="button">
                Back To Home
            </nuxt-link>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'user'
}
</script>

<style scoped>
.error-404-page .image img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 70vh;
    margin: auto;
    margin-top: 3rem;
}

.access-btn {
    padding: 5px 20px;
    border: 1px solid #888;
    border-radius: 20px;
    display: flex;
    align-items: center;
    outline: none;
    color: #888;
    background: #fff;
    font-weight: 600;
    justify-content: space-between;
}
</style>
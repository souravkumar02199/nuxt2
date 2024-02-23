<template>
    <div>
        <div class="review_info mb-4">
                <div class="review_stars text-center mb-3">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="text-muted text-center">
                    From our reviews
                </p>
            </div>
            <no-ssr>
                <carousel v-if="reviews" :items="4" :margin="27" :loop="true" :autoplay="false" :autoplayTimeout="3000"
                    :autoplaySpeed="800" :dots="false" :nav="true" :responsive="{
                        0: {
                            items: 1,
                        },
                        576: {
                            items: 2,
                        },
                        1024: {
                            items: 3,
                        },
                    }">
                    <div class="review_item" v-for="review in reviews" :key="review.id">
                        <div class="d-flex justify-content-center align-items-center mb-3">
                            <div class="review_by">
                                <div class="review_info">
                                    <div class="review_stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="review_content">
                            <p class="text-center text-sm"><small>{{ review.description }}</small></p>
                            <h5 class="text-center mt-3"><strong>{{ review.customer_name }}</strong></h5>
                            <p class="text-center text-muted" v-if="review.company_name">{{ review.company_name }}</p>
                        </div>
                    </div>
                </carousel>
            </no-ssr>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reviews: null,
        }
    },
    mounted() {
        this.getReviewsList()
    },
    methods: {
        async getReviewsList() {
            await this.$store.getters.client.get('/reviews').then((res) => {
                this.reviews = res.data.data
            })
        },
    }
}
</script>

<style></style>
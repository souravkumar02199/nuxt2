<template>
  <div>
    <header-bar></header-bar>
    <menu-bar class="d-none d-md-block"></menu-bar>
    <section class="pagetitle">
        <div class="title">
            <h1>Guide to understand Paper Sizes </h1>
        </div>
    </section>
    <section class="guide pt-0">
        <div class="container_wrap">
            <h3>A Quick Guide to 'A' Sizes</h3>
            <p>The table below offers a comparative visual of the different A sizes that we offer for printing. This will help you get an estimate of how large your finished print product will come out when it is delivered. Everyone is usually familiar with
                the A4 size of a sheet of paper, so you may consider the picture of A4 paper size while understanding the aspect ratio. Be careful while assessing your preferred marketing space before printing to make certain that your print fits the
                space correctly.
            </p>
            <img :src="size ? `${MEDIA_URL}/${size[0].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">

            <h3>Booklets</h3>
            <p>Booklets are available in the following dimensions:</p>
            <!-- <img src="~/assets/images/banner/placeholder.webp" alt="paper-size banner image"> -->
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[1].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <p>We also provide a short edge bound stapled and wirebound booklets (in all sizes excluding DL) that implies you will get a landscape booklet. You just need to turn over the dimensions to get this orientation.</p>
            <!-- <img src="~/assets/images/banner/placeholder.webp" alt="paper-size banner image"> -->
            <p>Kindly note that we offer our thread sewn hardback and paperback books in 2 sizes only that are A4 and A5. If these do not suit you and you have a different size requirement of thread sewn book, please reach out to our expert account management
                team. They can conveniently arrange a custom-made print order based on your preferred specifications.
            </p>

            <h3>Business Cards</h3>
            <p>You can choose your desired dimension for business cards from the following available sizes:</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[3].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">

            <p>*Standard business card size is applicable to other types of cards as well such as our loyalty, recycled, premium, economy, and Kraft business cards.
            </p>

            <!-- <img src="~/assets/images/banner/placeholder.webp" alt="paper-size banner image"> -->
            <p>To check how the above listed dimensions measure up to international paper sizes, and business cards in the USA and Canada, you can go through our business card size guide. </p>
            <h3>Exhibition Stands</h3>
            <p>Our exhibition stands are available in the following three different variants:</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[5].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[6].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[7].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <p>Our exhibition stand sizes are labeled in numbers like this owing to the number of panels in each stand. Our stands come with three divisions, of which two cannot be entirely seen, and the center part is divided based on how large the stand
                is.
            </p>
            <p>We need to set the resolution at 150dpi because exhibition stands are larger and take a lot more space than our other items.</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[8].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[9].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[10].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <p>We supply all of our exhibition stands with a pedestal. You can make use of this to keep your stand when you are not using it and it can even be turned into a functional table for your event. The same size graphic is used for podium as for
                all of other stand sizes.</p>
            <h3>Flags</h3>
            <p>Our flags are available in the following dimensions:</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[12].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <p>We suggest that you use one of our templates and fill the total area with your artwork while setting up your flag artwork. </p>
            <p>In the following table, we have mentioned the total area of the artwork, that will be printed before your flag is cut. The visual area represents the part that you will see once the flag is ready for use.</p>
            <!-- <img src="~/assets/images/banner/placeholder.webp" alt="paper-size banner image"> -->
            <h3>Flyers & Leaflets</h3>
            <p>You can choose from the following available dimensions and styles of flyers and leaflets:</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[13].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <!-- <img src="~/assets/images/banner/placeholder.webp" alt="paper-size banner image"> -->
            <h3>Folded Leaflets</h3>
            <p>Our folded leaflets are available in the following dimensions and styles:</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[14].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <!-- <img src="~/assets/images/banner/placeholder.webp" alt="paper-size banner image"> -->
            <h3>Posters</h3>
            <p>You can select from the following available sizes of posters:</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[18].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <!-- <img src="~/assets/images/banner/placeholder.webp" alt="paper-size banner image"> -->
            <p>We offer indoor and outdoor poster frames in sizes A4, A3, A2, and A1. We also provide Pavement style A-frames in sizes A2 and A1.</p>
            <h3>Roller Banners</h3>
            <p>Our roller banners are available in the following dimensions:</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[15].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[16].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <!-- <img src="~/assets/images/banner/placeholder.webp" alt="paper-size banner image"> -->
            <h3>Signage</h3>
            <p>We provide signage in the following dimensions:</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[19].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <h3>Stickers</h3>
            <p>You can choose from the following available sizes and styles of stickers:</p>
            <img class="w-100" :src="size ? `${MEDIA_URL}/${size[17].image}` : '~/assets/images/banner/placeholder.webp'" alt="paper-size banner image">
            <p>We recommend using square shape while you are setting up your circle sticker artwork. For instance, for a 37mm circle sticker, kindly choose your artwork dimension as a 37mm x 37mm square and make sure that significant details are kept away
                from the borders. The corners will become your bleed area. </p>
            <p>Some more tips-</p>
            <ul>
                <li> Make sure that you plan and adjust your document size before you begin your design work, it is crucial that you properly plan everything to get the best print possible.</li>
                <li>We recommend that you check out the product you desire on the website to discover the accurate sizes in mm</li>
            </ul>
            <h3>Need assistance?</h3>
            <p>If you are still having doubts and want more guidance on how to select the correct size of product as per your desired printing specifications, do contact our client service advisors who are there to guide you and resolve all your queries.
                On the other hand, you can try our sample pack that has a collection of our popular products in a range of sizes without any charges. So order your free sample pack today.</p>
        </div>
    </section>
  </div>
</template>

<script>
import { MEDIA_URL } from "@/api/urls";
import HeaderBar from '../components/layout/HeaderBar.vue'
import MenuBar from '../components/layout/MenuBar.vue'
export default {
    middleware: 'scrollToTopMiddleware',
  components: { HeaderBar, MenuBar },
data(){
    return{
        size:null,
        MEDIA_URL:MEDIA_URL,
    }
},
mounted(){
    this.getTeamData()
},
methods:{
    async getTeamData(){
        await this.$store.getters.client.get('/paper-size').then((res)=>{
            this.size = res.data.data
        })
    },
}
}
</script>

<style>

</style>
<template>
    <b-col cols="4">
        <div>
            <NuxtLink class="d-block w-100 rounded" style="aspect-ratio: 649/361;" :to="list3D[0].path">
                <img width="649" height="361" :src="list3D[0].url" class="w-100 h-auto" alt="product video" />
            </NuxtLink>
            <img loading="lazy" width="383" height="100" src="@/assets/images/header/4.jpg" class="w-100 h-auto mt-3"
                alt="offer">
        </div>
        <!-- <div v-else>
            <NuxtLink class="d-block w-100 rounded" style="aspect-ratio: 649/361;" :to="list3D[0].path">
                <img width="649" height="361" :src="list3D[0].url" class="w-100 h-auto" alt="product video" />
            </NuxtLink>
            <img loading="lazy" width="383" height="100" src="@/assets/images/header/5.png" class="w-100 h-auto mt-3"
                alt="offer">
        </div> -->
    </b-col>
</template>

<script>
export default {
    data() {
        return {
            list3D: [
                {
                    url: 'https://digitalpress.sirv.com/Digital%20press/Black%20cafe%20barrier%20bundle/Black%20cafe%20barrier%20bundle.spin?image=72&gif.lossy=5&w=650&h=361',
                    path: '/p/black-café-barrier-bundle',
                },
                {
                    url: 'https://digitalpress.sirv.com/Digital%20press/Gazebo/2x2/2x2.spin?image=72&gif.lossy=5&w=650&h=361',
                    path: '/c/outdoor-displays',
                },
                {
                    url: 'https://digitalpress.sirv.com/Digital%20press/Curved%20Pop-up/3x4/3x4.spin?image=72&gif.lossy=5&w=650&h=361',
                    path: '/c/Curved-Pop-Up-Stands',
                },
                {
                    url: 'https://digitalpress.sirv.com/Digital%20press/Snake%20Stand/Snake%20Stand/Snake%20Stand.spin?image=72&gif.lossy=5&w=650&h=361',
                    path: '/p/Snake-Curved-Display-Stand-1',
                },
                {
                    url: 'https://digitalpress.sirv.com/Digital%20press/Curved%20Wall/4m/4m.spin?image=72&gif.lossy=5&w=650&h=361',
                    path: '/c/Curved-Banner-Stands',
                },
                {
                    url: 'https://digitalpress.sirv.com/Digital%20press/Straight%20Wall/3m/3m.spin?image=72&gif.lossy=5&w=650&h=361',
                    path: '/c/Straight-Fabric-Display-Walls',
                },
                {
                    url: 'https://digitalpress.sirv.com/Digital%20press/Table%20Cloth/Table%20Cloth/Table%20Cloth.spin?image=72&gif.lossy=5&w=650&h=361',
                    path: '/c/tablecloths',
                },
                {
                    url: 'https://digitalpress.sirv.com/Digital%20press/Hard%20Base%20Monolith/1500m/1500m.spin?image=72&gif.lossy=5&w=650&h=361',
                    path: '/c/Megalith-Fabric-Display-Stands',
                },
            ]
        }
    },
    mounted() {
        window.setInterval(() => {
            this.pollimages();
        }, 3000);

    },
    methods: {
        pollimages() {
            const first = this.list3D.shift();
            this.list3D = this.list3D.concat(first);
        }
    }
}
</script>

<style></style>
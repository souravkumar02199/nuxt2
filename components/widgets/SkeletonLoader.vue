<template>
    <div :style="loaderStyles" class="skeleton-loader" :class="dpClass"></div>
</template>
  
<script>
export default {
    props: {
        height: {
            type: String,
            default: 'auto',
        },
        width: {
            type: String,
            default: '100%',
        },
        aspectRatio: {
            type: String,
            default: '1:1',
        },
        borderRadius: {
            type: String,
            default: '4px',
        },
        dpClass:{
            type: String,
            default: '',
        }
    },
    computed: {
        loaderStyles() {
            return {
                height: this.height,
                width: this.width,
                aspectRatio: this.aspectRatio,
                borderRadius: this.borderRadius,
            };
        },
    },
};
</script>
  
<style scoped>
.skeleton-loader {
    background-color: #f0f0f0;
    /* Set your desired background color */
    animation: loading 1s infinite;
}

@keyframes loading {
    0% {
        opacity: 0.5;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.5;
    }
}
</style>
  
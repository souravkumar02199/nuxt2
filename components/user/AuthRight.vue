<template>
  <div class="gallery">
    <div>
      <img src="~/assets/images/user/1.jpg" height="1251" width="554" alt="gallery" class="w-100 h-100" />
    </div>
    <div>
      <img :src="images[2]" alt="gallery" height="609" width="554" class="w-100 h-100" />
    </div>
    <div class="grid-text-box" style="background-color:#f1c5d1;" :style="{ 'background-color': textContent[0].color }">
      <p class="grid-title">{{ textContent[0].title }}</p>
      <p class="grid-desc">{{ textContent[0].desc }}</p>
      <span></span>
    </div>
    <div class="grid-text-box" style="background-color:#f1c5d1;" :style="{ 'background-color': textContent[3].color }">
      <p class="grid-title">{{ textContent[3].title }}</p>
      <p class="grid-desc">{{ textContent[3].desc }}</p>
      <span></span>
    </div>
    <div>
      <img :src="images[0]" alt="gallery" height="609" width="554" class="w-100 h-100" />
    </div>
    <div class="grid-text-box" style="background-color:#f1c5d1;" :style="{ 'background-color': textContent[1].color }">
      <p class="grid-title">{{ textContent[1].title }}</p>
      <p class="grid-desc">{{ textContent[1].desc }}</p>
      <span></span>
    </div>
    <div>
      <img :src="images[1]" alt="gallery" height="609" width="554" class="w-100 h-100" />
    </div>
    <div class="grid-text-box" style="background-color:#f1c5d1;" :style="{ 'background-color': textContent[2].color }">
      <p class="grid-title">{{ textContent[2].title }}</p>
      <p class="grid-desc">{{ textContent[2].desc }}</p>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textContent: [
        { title: 'EVERY PIECE', desc: 'OF ARTWORK CHECKED MANUALLY', color: '#f1c5d1' },
        { title: '100%', desc: 'satisfaction guarantee', color: '#9cd8ca' },
        { title: 'Reduce Carbon', desc: 'Emission with our eco range', color: '#a2d89c' },
        { title: '360˚ View', desc: 'Available on most of our products', color: '#fcdad0' },
      ],
      images: [
        require(`/assets/images/user/2.jpg`),
        require(`/assets/images/user/3.jpg`),
        require(`/assets/images/user/4.jpg`),
      ]
    }
  },
  mounted() {
    window.setInterval(() => {
      this.pollcontent();
      this.pollimages();
    }, 3000);

  },
  methods: {
    pollcontent() {
      const first = this.textContent.shift();
      this.textContent = this.textContent.concat(first);
    },
    pollimages() {
      const first = this.images.shift();
      this.images = this.images.concat(first);
    }
  }
}
</script>

<style>
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5rem;
  align-items: start;
  justify-items: center;
  position: sticky;
  top: 0.5rem;
}

.gallery div {
  height: 100%;
  overflow: hidden;
}

.gallery img {
  object-fit: cover;
}

.gallery div:first-child {
  grid-column: span 1;
  grid-row: span 2;
}

.grid-title {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.2;
}

.grid-desc {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.grid-text-box {
  display: grid;
  align-content: center;
  padding: 0 1.25rem;
  text-transform: uppercase;
}

.grid-text-box span {
  width: 50%;
  height: 5px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 1200px) {
  .grid-title {
    font-size: 1.5rem;
  }

  .grid-desc {
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }
}
</style>

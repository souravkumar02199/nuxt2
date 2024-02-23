<template>
  <div class="dp-loader-bg">
    <div class="dp-loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loadingbar",
};
</script>

<style>
.dp-loader-bg{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
}
.dp-loader,
.dp-loader:before,
.dp-loader:after {
  background: #0096ae;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.dp-loader {
  color: #e13f6e;
  position: fixed;
  top: 50%;
  font-size: 11px;
  animation-delay: -0.16s;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  z-index: 101;
}
.dp-loader:before,
.dp-loader:after {
  position: absolute;
  top: 0;
  content: "";
}
.dp-loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.dp-loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>

<template>
    <div id="loading" v-show="loading">
        <div class="mg-loading"></div>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        computed: {
            loading() {
                return this.$store.state.loading
            }
        },
        watch: {
            loading: {
                immediate: true,
                handler: (n, o) => {
                    let htmlBodyElement = document.querySelector('body');
                    htmlBodyElement.style.overflowY = n ? 'hidden' : 'auto';
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    #loading {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #F9F9F9;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mg-loading {
        position: relative;
        width: 50px;
        perspective: 200px;
    }

    .mg-loading:before,
    .mg-loading:after {
        position: absolute;
        width: 20px;
        height: 20px;
        content: "";
        animation: jumping 0.5s infinite alternate;
        background: rgba(0, 0, 0, 0);
    }

    .mg-loading:before {
        left: 0;
    }

    .mg-loading:after {
        right: 0;
        animation-delay: 0.15s;
    }

    @keyframes jumping {
        0% {
            transform: scale(1) translateY(0px) rotateX(0deg);
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        }

        100% {
            transform: scale(1.2) translateY(-25px) rotateX(45deg);
            background: $color-primary;
            box-shadow: 0 25px 40px $color-primary;
        }
    }
</style>

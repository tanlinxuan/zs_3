<template>
    <div class="app-main">
        <div class="component">
            <div class="main-page">
                <transition name="slide-fade" mode="out-in">
                    <keep-alive :include="keepAlive">
                        <router-view :key="key"/>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<script type="text/jsx">
    export default {
        name: 'Main',
        computed: {
            keepAlive() {
                return this.$store.getters.cachedViews
            },
            key() {
                return this.$route.fullPath
            }
        }
    }
</script>
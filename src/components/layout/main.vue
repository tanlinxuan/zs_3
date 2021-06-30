<template>
    <div class="app-main">
        <router-view :key="key"/>
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
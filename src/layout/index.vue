<template>
    <a-layout>
        <a-layout-header>
            <PageHeader/>
        </a-layout-header>
        <a-layout>
            <Main/>
        </a-layout>
    </a-layout>
</template>
<script>
     import PageHeader from  './header'
     import Main from  './main'
    import './index.less'
    export default {
        name: "PageLayout",
        components: {
           PageHeader, //头部
            Main
        }
    }
</script>

<style scoped>

</style>
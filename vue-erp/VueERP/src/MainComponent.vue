<!--a.html-->
<template>
    <h1>{{name}}</h1>
</template>

<script>
    var Tom = {
        data(){
            return {
                name: 'Tom'
            }
        }
    }

    export default Tom
</script>

<!--b.html-->
<div id="app">
    <TomComponent/>
</div>

<script>
    import Tom from ''Tom from ''

    var vm = new Vue({
        el: '#app',
        components: {
            'TomComponent':Tom
        }
    })
</script>
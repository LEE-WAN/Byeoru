<template>
    <div class='header'>
        Header
        <div class='panes'>
            <div class='pane editor'>
                Editor
            </div>
            <div class='pane preview'>
                Preview
            </div>
        </div>
    </div>
</template>

<script>
 
    export default {
        components: {

        },
        data () {
            return {
                test: 'Hello World!'
            }
        },
        methods: {
            change: function(x) {
                this.test = 'note that'
            }
        },
        // layout: 'editor'
    }
</script>

<style lang="scss">
    @import '~assets/utils';
    .header {
        .panes {
            height: calc(100vh - 4rem);
            display: flex;
            background: $oc-gray-1;
            .pane {
                display: flex;
                flex: 1;
            }
        }
    }
</style>
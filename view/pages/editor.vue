<template>
    <section class='editor'>
        <div class='header'>
            Header
        </div>
        <div class='cover'>
            <Title/>
        </div>
        <content class='content'>
            <section class='markdown-editor'>
                <MarkdownEditor/>
            </section>
        </content>
    </section>
</template>

<script>
import Title from '~/components/editor/Title.vue';
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue';

export default {
    components: {
        Title, MarkdownEditor
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
    .editor {
        .header {
            background: $oc-gray-1;
            position: absolute;
        }
        .cover {
            height: 450px;
            border_bottom: 1px $oc-gray-8;
            position: relative;
            .title {
            }
        }
        .content section {
            max-width: 64rem;
            padding: 2rem 6rem;
            margin: 0 auto;
        }
    }
</style>
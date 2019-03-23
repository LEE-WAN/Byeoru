<template>
    <section class='editor'>
        <div class='header'>
            Header
        </div>
        <section class="cover">
            <GenreSelctor/>
        </section>        
        <section  class="inputs">
            <Title/>
            <br/>
            <TagsInput/>
        </section>
        <content class='content'>
            <section class='markdown-editor'>
                <MarkdownEditor/>
            </section>
        </content>
    </section>
</template>

<script>
import GenreSelctor from '~/components/editor/GenreSelector.vue';
import Title from '~/components/editor/Title.vue';
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue';
import  TagsInput  from  '~/components/editor/TagsInput.vue';

export default {
    components: {
        Title, MarkdownEditor, GenreSelctor, TagsInput
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
        .cover  {
            height: 220px;
        }
        .inputs {
            width: 700px;
            height: 8rem;
            bottom: 80px;
            margin: 0 auto;
        }
        .content section {
            max-width: 64rem;
            padding: 2rem 6rem;
            margin: 0 auto;
        }
    }
</style>
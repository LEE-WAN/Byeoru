<template>
    <section class='editor'>
        <Header/>
        <CategorySelector/>        
        <section  class="inputs">
            <Title/>
            <TagsInput/>
            <br/>
        </section>
        <section class='editor'>
            <MarkdownEditor/>
        </section>
        <div class='Footer'>
            Footer
        </div>
    </section>    
</template>

<script>
import CategorySelector from '~/components/editor/CategorySelector.vue';
import Title from '~/components/editor/Title.vue';
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue';
import TagsInput  from  '~/components/editor/TagsInput.vue';
import Popup  from  '~/components/editor/Popup.vue';
import Header from '~/components/Header.vue'
import axios from 'axios';

import { api } from '~/config';

export default {
    components: {
        Title, MarkdownEditor, CategorySelector, TagsInput, Header, Popup
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
    layout: 'default',
    async asyncData ({req, params, store}) {
        try {
            const { data } = await axios.get(api('/editor/category'));
            // console.log(data);
            store.commit('fixed/updateCategoryList', data);

        } catch (e) {
            // store commit ERROR
        }
    },
    // layout: 'editor'
}
</script>

<style lang="scss">
    @import '~assets/utils';
    .editor {
        position: relative;
        .inputs {
            display: table;
            width: 700px;
            height: 8rem;
            bottom: 80px;
            margin: 0 auto;
            padding-top: 4rem;
            padding-bottom: 4rem;
        }
        .editor {
            max-width: 90%;
            width: 1000px;
            min-height: 80%;
            padding: auto;
            margin: 0 auto;
        }
    }
</style>
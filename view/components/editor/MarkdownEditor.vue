<template>
    <div class="markdown-editor">
        <textarea style="display:none"></textarea>
    </div>
</template>

<script>
//            https://simplemde.com/
//            https://github.com/F-loat/vue-simplemde/blob/master/src/markdown-editor.vue
let SimpleMDE = 'simplemde';

export default {
    name: 'markdown-editor',
    mounted() {
        SimpleMDE = require('simplemde');
        this.initialize();
    },
    activated() {
        const editor = this.simplemde;
        if (!editor) return;
        const isActive = editor.isSideBySideActive() || editor.isPreviewActive();
        if (isActive) editor.toggleFullScreen();
    },
    methods: {
        initialize() {
            this.simplemde = new SimpleMDE({ 
                element: this.$el.firstElementChild,
                spellChecker: false,
            });
        }
    }
}
</script>
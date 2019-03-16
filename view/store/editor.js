export const state = () => ({
  title: '',
  subtitle: '',
  tags: [],
  content: '',
})

export const mutations = {
  updateTitle (state, text) {
    state.title = text;
  },
  updateSubtitle (state, text) {
    state.subtitle = text;
  },
  updateTags (state, tags) {
    tags.array.forEach(element => {
      console.log(element);      
    });
  },
  updateContent (state, text) {
    state.content = text;
  }
}
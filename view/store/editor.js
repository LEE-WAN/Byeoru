export const state = () => ({
  title: '',
  category: '',
  tags: [],
  content: '',
})

export const mutations = {
  updateTitle (state, text) {
    state.title = text;
  },
  updateCategory (state, text) {
    state.category = text;
  },
  addTags (state, tag) {
    let re = /([ㄱ-ㅎㅏ-ㅣ가-힣A-Za-z\-\_]+)/g
    let tags = tag.match(re);
    if (tags) tags.forEach((x) => {
      if (!state.tags.includes(x)) state.tags.push(x);
    });    
  },
  removeTag (state, tag) {
    let index = state.tags.findIndex( x => x === tag);
    if (index !== -1) state.tags.splice(index,1);
  },
  removeLastTag (state) {
    state.tags.pop();
  },
  updateContent (state, text) {
    state.content = text;
  }
}
export const state = () => ({
  categoryList: [],
  modalOpen: false,
  needSidebar: false,
})

export const mutations = {
  updateCategoryList (state, list) {
    state.categoryList = list;
  },
  updateModalStatus(state, status){
    if (!process.server) {
      if(status) document.body.classList.add('modalOpen');
      else document.body.classList.remove('modalOpen');
    }
    state.modalOpen = status;
  },
  updateNeedSidebar(state, status){
    state.needSidebar = status;
  }
}
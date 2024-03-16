import {defineStore} from "pinia";

export const useThemeStore = defineStore('theme', {

    state: () => {
        return {
            navigationMain: true,
            navigationEditPost: false,
        }
    },
    actions: {
        changeStatusNavigationMain(status) {
            this.navigationMain = status
        },
        changeStatusNavigationEditPost(status) {
            this.navigationEditPost = status
        }
    }

});
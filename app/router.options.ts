import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to.path === '/' && savedPosition) {
      // If navigating to the home page and there's a saved position, restore it
      return savedPosition;
    }
  },
}
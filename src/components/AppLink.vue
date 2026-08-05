
<template>
  <RouterLink
    v-if="isVueApp"
    v-bind="$props"
    custom
    v-slot="{ isActive, href, navigate }"
  >
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </RouterLink>

  <a
    v-else
    v-bind="$attrs"
    :href="to"
  >
    <slot />
  </a>
</template>

<script>
import { RouterLink } from 'vue-router'
import { getCurrentInstance } from 'vue'

export default {
  name: 'AppLink',

  inheritAttrs: false,

  props: {
    ...RouterLink.props,
    inactiveClass: String,
  },

  computed: {
    isVueApp() {
      return !!getCurrentInstance()
        ?.appContext.config.globalProperties.$router
    }
  },
}
</script>

# Vue.js Production Guide 💚

A reference guide for building modern, scalable Vue.js applications using Vue 3, the Composition API, `<script setup>`, Pinia, and Nuxt 3.

---

## 🎯 Key Architectural Principles

1. **`<script setup>` by Default**: Always use `<script setup lang="ts">` for concise syntax, first-class TypeScript support, and optimized runtime performance.
2. **Modular Composables**: Encapsulate reusable stateful logic into composable functions (`useFeature()`) following standard naming conventions.
3. **Store Splitting with Pinia**: Divide global state into small, domain-specific Pinia stores rather than a single monolithic store.
4. **Reactivity Safety**: Understand the difference between `ref()` (for primitives and full object replacement) and `reactive()` (for objects where reference is preserved).

---

## 💡 Best Practices

### 1. Composable Pattern
Encapsulate asynchronous workflows and lifecycle hooks inside composables:

```typescript
// composables/useFetchUser.ts
import { ref } from 'vue';

export function useFetchUser(userId: string) {
  const user = ref<UserProfile | null>(null);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  async function fetchUser() {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error('Failed to load user');
      user.value = await res.json();
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isLoading.value = false;
    }
  }

  return { user, isLoading, error, fetchUser };
}
```

### 2. State Management with Pinia
```typescript
// stores/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const user = ref<User | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  function setSession(newToken: string, newUser: User) {
    token.value = newToken;
    user.value = newUser;
  }

  function logout() {
    token.value = null;
    user.value = null;
  }

  return { token, user, isAuthenticated, setSession, logout };
});
```

### 3. Performance & Reactivity Rules
- Use `shallowRef()` for large, immutable data sets (e.g., thousands of table rows) to avoid deep reactivity tracking overhead.
- Use `v-memo` for large static lists that rarely change.
- Prefer `computed` over manual `watch` when deriving state from existing reactive values.

---

## ⚠️ Common Pitfalls to Avoid

- ❌ **Destructuring Reactive Objects directly**: `const { count } = reactiveState` breaks reactivity. Use `toRefs(reactiveState)` or access via the object.
- ❌ **Using `v-for` with `v-if` on the same element**: In Vue 3, `v-if` has higher precedence and cannot access the loop variable. Use a wrapper `<template>` or a computed filtered list.

---

## 🔧 Recommended Ecosystem

- **Meta-Framework**: [Nuxt 3](https://nuxt.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Utilities**: [VueUse](https://vueuse.org/) (collection of 200+ essential Vue composition utilities)
- **UI Component Libraries**: [PrimeVue](https://primevue.org/), [Vuetify](https://vuetifyjs.com/), [Shadcn-Vue](https://www.shadcn-vue.com/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)

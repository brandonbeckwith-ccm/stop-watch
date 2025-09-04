<template>
  <div class="research-section">
    <h1>Vue Reactivity Research Findings</h1>
    <p class="intro">
      Based on real-world Vue projects and open-source codebases, here are
      insights and patterns around Vue’s reactivity system, how developers
      actually use <strong>ref</strong>, <strong>reactive</strong>, and
      <strong>computed</strong>.
    </p>

    <section>
      <h2>Common Patterns</h2>
      <ul>
        <li>
          <strong>ref(): </strong> is most common for simple values like
          toggles, inputs, and counters.
        </li>
        <li>
          <strong>reactive(): </strong> is preferred when managing grouped or
          form-like state.
        </li>
        <li>
          <strong>computed(): </strong> is frequently used to simplify templates
          or derive state dynamically.
        </li>
      </ul>
    </section>

    <section>
      <h2>Use Cases & Best Practices</h2>
      <ul>
        <li>
          <strong>Use toRefs():</strong> when destructuring keeps the reactivity
          link intact.
        </li>
        <li>
          <strong>Use computed()</strong> for derived values like filters, class
          toggles, or totals.
        </li>
        <li>
          <strong>Keep side effects out of computed()</strong>
          use watch() for API calls or DOM updates.
        </li>
        <li>
          <strong>customRef()</strong> is great for debounce or throttled
          inputs.
        </li>
      </ul>
    </section>

    <section>
      <h2>Interesting Observations</h2>
      <ul>
        <li>
          <strong>toValue()</strong> is often used to handle ref, computed, and
          plain values interchangeably.
        </li>
        <li>
          <strong>Memory leaks</strong> can happen with misused computed()
          inside dynamic components (e.g., modals).
        </li>
        <li>
          Dev friction with .value has led many to use macros or VueUse’s auto
          unwraps.
        </li>
        <li>
          Some apps generate reactive logic from config schemas clever for
          scaling forms or dashboards.
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useNavigation } from "../composables/useNavigation";

const { updateNavigation } = useNavigation();

onMounted(() => {
  updateNavigation({
    title: "Documentation",
    icon: "fal fa-book",
    status: "Vue Reactivity Guide",
  });
});
</script>

<style scoped>
.research-section {
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #ffffff;
  color: #2c3e50;
  font-family: "Segoe UI", sans-serif;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.2rem;
  color: #34495e;
}

h2 {
  font-size: 1.3rem;
  margin-top: 2rem;
  color: #414649;
}

.intro {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #555;
}

ul {
  list-style: disc;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

code {
  background-color: #f2f2f2;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Fira Code", monospace;
  font-size: 0.95rem;
}
</style>

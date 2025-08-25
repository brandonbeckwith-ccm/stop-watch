<template>
  <div class="home">
    <h1>Welcome to My App</h1>
    <p>This is the home page. Explore the features and enjoy your time.</p>
    <div class="features">
      <h4>Click below Links to check features</h4>
      <div class="card-list">
        <RouterLink to="/stopwatch" class="card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6l4 2"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
            />
          </svg>
          Stopwatch
        </RouterLink>

        <RouterLink to="/worldclock" class="card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2"
            />
          </svg>
          World Clock
        </RouterLink>

        <RouterLink to="/calculator" class="card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 3h6a2 2 0 012 2v14a2 2 0 01-2 2H9a2 2 0 01-2-2V5a2 2 0 012-2zm0 4h6M10 11h1m2 0h1m-4 3h1m2 0h1"
            />
          </svg>
          Calculator
        </RouterLink>

        <RouterLink to="/about" class="card">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 16v-4m0-4h.01"
            />
          </svg>
          About
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}

.features {
  margin-top: 1rem;
}

.card-list {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  width: 180px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #00aced;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

.icon {
  width: 24px;
  height: 24px;
  stroke: #00aced;
}
</style>

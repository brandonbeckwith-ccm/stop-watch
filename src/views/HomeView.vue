<script setup lang="ts">
import { useRouter } from 'vue-router'
import { CButton } from '@ccm-engineering/ui-components'

const router = useRouter()

const features = [
  {
    title: 'Stopwatch',
    description: 'Precise stopwatch with lap timing functionality',
    icon: '⏱️',
    route: '/stopwatch'
  },
  {
    title: 'World Clock',
    description: 'Track current times across multiple timezones',
    icon: '🌍',
    route: '/world-clock'
  }
]
</script>

<template>
  <div class="home-container">
    <div class="hero-section">
      <h1 class="hero-title">Time Management App</h1>
      <p class="hero-subtitle">Professional time app with stopwatch and world clock, built with Vue 3</p>
    </div>
    
    <div class="features-grid">
      <div 
        v-for="feature in features" 
        :key="feature.title"
        class="feature-card"
      >
        <div class="feature-icon">{{ feature.icon }}</div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
        <CButton 
          theme="primary"
          :label="`Go to ${feature.title}`"
          @clicked="router.push(feature.route)"
          class="feature-button"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--ccm-color-primary);
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--ccm-color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background: var(--ccm-color-surface);
  border: 1px solid var(--ccm-color-border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ccm-color-text-primary);
  margin-bottom: 1rem;
}

.feature-description {
  color: var(--ccm-color-text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feature-button {
  width: 100%;
}

.info-section {
  background: var(--ccm-color-surface);
  border: 1px solid var(--ccm-color-border);
  border-radius: 12px;
  padding: 2rem;
}

.info-section h2 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--ccm-color-text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.features-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.features-list li {
  padding: 0.75rem 1rem;
  background: var(--ccm-color-surface-hover);
  border-radius: 8px;
  color: var(--ccm-color-text-primary);
  position: relative;
  padding-left: 2rem;
}

.features-list li::before {
  content: '✓';
  position: absolute;
  left: 0.75rem;
  color: var(--ccm-color-primary);
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .features-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .feature-card {
    padding: 1rem;
  }
}
</style> 
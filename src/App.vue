<script setup lang="ts">
import Home from './views/Home.vue'
import Footer from './components/Footer.vue'
</script>

<template>
    <div class="app">
        <header class="app-header">
            <h1 class="title">Ikezuki Pedigree</h1>
            <span class="subtitle">Pedigree for Japanese Derby horses*</span>
        </header>

        <main class="app-main">
            <Home />
        </main>

        <Footer />
    </div>
</template>

<style scoped>
.app{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.app-header {
    display: flex;
    align-items: baseline;
    gap: 0.8rem;
    padding: 0.8rem 1.3rem;
    border-bottom: 1px solid var(--app-border);
}

.title{
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
}

.subtitle{
    color: var(--app-muted);
    font-size: 0.9rem;
}

.app-main{
    flex: 1;
    padding: 1.3rem;
    min-width: 0;
}
</style>
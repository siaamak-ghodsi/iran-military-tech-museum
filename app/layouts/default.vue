<template>
  <div class="min-h-screen bg-museum-bg text-museum-text museum-grid-bg">
    <MuseumHeader />
    <main id="main" class="mx-auto max-w-7xl px-4 py-8">
      <slot />
    </main>
    <footer class="border-t border-museum-border py-6 text-center text-xs text-museum-muted">
      {{ $t('museum.disclaimer') }}
    </footer>
  </div>
</template>

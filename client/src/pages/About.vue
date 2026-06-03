<template>
  <div class="about-page">

    <!-- Hero -->
    <section class="about-hero">
      <div class="container">
        <div class="row align-items-end">
          <div class="col-lg-8">
            <p class="about-eyebrow">Our Story</p>
            <h1 class="about-heading">About <b class="about-brand">SO<span class="about-brand-accent">U</span>L</b></h1>
            <p class="about-description">
              SOUL isn't just about what you wear; it's about how you express what's inside. We created this clothing line to bridge the gap between minimalist streetwear and personal identity. From the heavy knit of our sweaters to the structured silhouette of our footwear, every piece we showcase is designed with purpose, premium comfort, and an unmistakable identity.
            </p>
          </div>
          <div class="col-lg-4 d-none d-lg-flex justify-content-end">
            <div class="about-year-block">
              <span class="about-year">Est.</span>
              <span class="about-year-num">2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="about-divider"></div>

    <!-- Values -->
    <section class="about-values">
      <div class="container">
        <div class="row g-0">
          <div class="col-12 mb-5">
            <p class="section-label">What We Stand For</p>
          </div>
          <div class="col-md-4 value-item">
            <span class="value-number">01</span>
            <h3 class="value-title">Identity First</h3>
            <p class="value-text">Every cut, every stitch is a statement. We design for people who know exactly who they are — and those still finding out.</p>
          </div>
          <div class="col-md-4 value-item">
            <span class="value-number">02</span>
            <h3 class="value-title">Built to Last</h3>
            <p class="value-text">No fast fashion. No shortcuts. Premium materials sourced with intention, crafted to outlast trends and seasons.</p>
          </div>
          <div class="col-md-4 value-item">
            <span class="value-number">03</span>
            <h3 class="value-title">Wear Your Truth</h3>
            <p class="value-text">Clothes are a language. We help you speak it fluently — whether that's quiet confidence or loud expression.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="about-divider"></div>

    <!-- Team -->
    <section class="about-team">
      <div class="container">
        <p class="section-label">The People Behind It</p>
        <div class="row g-4 mt-2">
          <div class="col-sm-6 col-md-3" v-for="member in team" :key="member.name">
            <div class="team-card">
              <div class="team-card_avatar">{{ member.initials }}</div>
              <p class="team-card_name">{{ member.name }}</p>
              <p class="team-card_role">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="about-divider"></div>

    <!-- CTA -->
    <section class="about-cta">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h2 class="cta-heading">Ready to find your piece?</h2>
            <p class="cta-sub">Browse our curated collection of timeless streetwear essentials.</p>
          </div>
          <div class="col-md-4 d-flex justify-content-md-end mt-4 mt-md-0">
            <RouterLink :to="{ name: 'Products' }" class="cta-btn">Shop Now →</RouterLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>

const team = [
  { name: 'Sebastian Angeles', role: 'Front-end Developer', initials: 'S' },
  { name: 'Andrei Paguio', role: 'Back-end Developer', initials: 'A' }
]

</script>

<style scoped>

</style>
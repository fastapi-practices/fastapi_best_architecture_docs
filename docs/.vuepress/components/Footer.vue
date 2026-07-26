<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Brand Section -->
      <div class="footer-section brand-section">
        <div class="section-title">FastAPI Best Architecture</div>
        <div class="section-description">
          {{ t('footer.description') }}
        </div>
        <div class="social-links">
          <a href="https://github.com/fastapi-practices/fastapi-best-architecture" target="_blank" class="social-link">
            <Icon name="line-md:github" size="2rem" />
          </a>
          <a href="https://discord.com/invite/yNN3wTbVAC" target="_blank" class="social-link">
            <Icon name="line-md:discord" size="2rem" />
          </a>
          <a :href="resolveLink(withLocale('/blog/'))" class="social-link">
            <Icon name="la:blog" size="2rem" />
          </a>
        </div>
      </div>
      <div class="footer-section">
        <div class="section-title">{{ t('footer.docs') }}</div>
        <div class="link-list">
          <a v-for="link in links.product" :key="link.name" :href="resolveLink(link.href)"
            :target="link.href.startsWith('http') ? '_blank' : undefined" rel="noopener noreferrer" class="footer-link">
            {{ link.name }}
          </a>
        </div>
      </div>
      <div class="footer-section">
        <div class="section-title">{{ t('footer.ecosystem') }}</div>
        <div class="link-list">
          <a v-for="link in links.community" :key="link.name" :href="resolveLink(link.href)"
            :target="link.href.startsWith('http') ? '_blank' : undefined" rel="noopener noreferrer" class="footer-link">
            {{ link.name }}
          </a>
        </div>
      </div>
      <div class="footer-section">
        <div class="section-title">{{ t('footer.plugins') }}</div>
        <div class="link-list">
          <a v-for="link in links.resources" :key="link.name" :href="resolveLink(link.href)"
            :target="link.href.startsWith('http') ? '_blank' : undefined" rel="noopener noreferrer" class="footer-link">
            {{ link.name }}
          </a>
        </div>
      </div>
      <div class="footer-section">
        <div class="section-title">{{ t('footer.more') }}</div>
        <div class="link-list">
          <a v-for="link in links.friendlyLinks" :key="link.name" :href="resolveLink(link.href)" rel="noopener noreferrer"
            class="footer-link">
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>

    <div class="separator"></div>

    <div class="footer-bottom">
      <div class="footer-bottom-left">
        <span>Copyright © 2023-{{ currentYear }} FastAPI Practices and
          <a href="https://github.com/fastapi-practices/fastapi-best-architecture/graphs/contributors" target="_blank"
            rel="noopener noreferrer" class="footer-link">
            contributors.
          </a>
        </span>
        <span>
          Released under the
          <a href="https://github.com/fastapi-practices/fastapi-best-architecture/blob/master/LICENSE" target="_blank"
            rel="noopener noreferrer" class="footer-link">
            MIT License
          </a>
        </span>
      </div>
      <span>
        Made with ❤️ by
        <a href="https://wu-clan.github.io/homepage/" target="_blank" rel="noopener noreferrer" class="footer-link">
          wu-clan
        </a>
      </span>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { withBase } from "vuepress/client";
import { useI18n } from "../composables/useI18n";

const currentYear = new Date().getFullYear();
const { t, withLocale } = useI18n();

const resolveLink = (href) => href.startsWith("http") ? href : withBase(withLocale(href));

const links = computed(() => ({
  product: [
    { name: t("footer.quickStart"), href: "/backend/summary/quick-start" },
    { name: "Vben UI", href: "/frontend/summary/intro" },
    { name: t("footer.apiDocs"), href: "https://apifox.com/apidoc/shared-28a93f02-730b-4f33-bb5e-4dad92058cc0" },
    { name: t("footer.faq"), href: "/questions" },
    {
      name: t("footer.changelog"),
      href: "https://github.com/fastapi-practices/fastapi-best-architecture/blob/master/CHANGELOG.md"
    },
  ],
  community: [
    { name: t("footer.techStack"), href: "/stack" },
    { name: t("footer.chatGroups"), href: "/group" },
    { name: t("footer.githubIssues"), href: "https://github.com/fastapi-practices/fastapi-best-architecture/issues" },
    { name: t("footer.githubDiscussions"), href: "https://github.com/fastapi-practices/fastapi-best-architecture/discussions" },
    { name: t("footer.ideas"), href: "https://discord.gg/xp8M6nY4NA" },
  ],
  resources: [
    { name: t("footer.pluginDev"), href: "/plugin/dev" },
    { name: t("footer.pluginShare"), href: "/plugin/share" },
    { name: t("footer.pluginInstall"), href: "/plugin/install" },
    { name: t("footer.marketplace"), href: "/marketplace" },
  ],
  friendlyLinks: [
    { name: t("footer.privacy"), href: "/privacy-policy" },
    { name: t("footer.status"), href: "https://status.wu-clan.site/status/services" },
  ],
}));
</script>

<style scoped>
.footer {
  background-color: var(--vp-c-bg-alt);
  padding: 3rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto;
}

.footer-section {
  min-width: 140px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
}

.brand-section {
  flex: 1;
  min-width: 280px;
  max-width: 400px;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-description {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  margin-bottom: 0.875rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.social-link,
.footer-link {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  text-decoration: none !important;
  transition: color 0.2s;
}

.social-link:hover,
.footer-link:hover {
  color: var(--vp-c-text);
  text-decoration: none !important;
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.separator {
  border-top: 1px solid var(--vp-c-border);
  margin: 3rem 0 2rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  max-width: 1500px;
  margin: 0 auto;
}

.footer-bottom-left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }

  .footer-section {
    min-width: 100%;
    max-width: 100%;
  }

  .brand-section {
    min-width: 100%;
    max-width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

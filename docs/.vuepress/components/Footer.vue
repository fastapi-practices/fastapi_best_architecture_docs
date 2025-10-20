<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Brand Section -->
      <div class="footer-section brand-section">
        <div class="section-title">FastAPI Best Architecture</div>
        <div class="section-description">
          基于 FastAPI 构建的企业级后端架构解决方案
        </div>
        <div class="social-links">
          <a
              href="https://github.com/fastapi-practices/fastapi_best_architecture"
              target="_blank"
              class="social-link"
          >
            <Icon name="line-md:github" size="2rem" />
          </a>
          <a
              href="https://discord.com/invite/yNN3wTbVAC"
              target="_blank"
              class="social-link"
          >
            <Icon name="line-md:discord" size="2rem" />
          </a>
          <a href="/fastapi_best_architecture_docs/blog/" class="social-link">
            <Icon name="la:blog" size="2rem" />
          </a>
        </div>
      </div>
      <div class="footer-section">
        <div class="section-title">使用文档</div>
        <div class="link-list">
          <a
              v-for="link in links.product"
              :key="link.name"
              :href="link.href"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="footer-link"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
      <div class="footer-section">
        <div class="section-title">生态系统</div>
        <div class="link-list">
          <a
              v-for="link in links.community"
              :key="link.name"
              :href="link.href"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="footer-link"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
      <div class="footer-section">
        <div class="section-title">插件系统</div>
        <div class="link-list">
          <a
              v-for="link in links.resources"
              :key="link.name"
              :href="link.href"
              :target="link.href.startsWith('http') ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="footer-link"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
      <div class="footer-section">
        <div class="section-title">更多</div>
        <div class="link-list">
          <a
              v-for="link in links.friendlyLinks"
              :key="link.name"
              :href="link.href"
              rel="noopener noreferrer"
              class="footer-link"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>

    <div class="separator"></div>

    <div class="footer-bottom">
      <div class="footer-bottom-left">
        <span>Copyright © 2023-{{ currentYear }} FastAPI Practices and contributors.</span>
        <span>
          Released under the
          <a
              href="https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
          >
            MIT License
          </a>
        </span>
      </div>
      <span>
        Made with ❤️ by
        <a
            href="https://wu-clan.github.io/homepage/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
        >
          wu-clan
        </a>
      </span>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();

const links = {
  product: [
    { name: "快速开始", href: "/fastapi_best_architecture_docs/backend/summary/quick-start" },
    { name: "Vben UI", href: "/fastapi_best_architecture_docs/frontend/summary/intro" },
    { name: "Apifox", href: "https://apifox.com/apidoc/shared-28a93f02-730b-4f33-bb5e-4dad92058cc0" },
    { name: "常见问题", href: "/fastapi_best_architecture_docs/questions" },
    {
      name: "更新记录",
      href: "https://github.com/fastapi-practices/fastapi_best_architecture/blob/master/CHANGELOG.md"
    },
  ],
  community: [
    { name: "开源项目", href: "/fastapi_best_architecture_docs/opensource" },
    { name: "技术栈", href: "/fastapi_best_architecture_docs/stack" },
    { name: "用户登记", href: "/fastapi_best_architecture_docs/users" },
    { name: "Github 问题", href: "https://github.com/fastapi-practices/fastapi_best_architecture/issues" },
    { name: "Github 讨论", href: "https://github.com/fastapi-practices/fastapi_best_architecture/discussions" },
  ],
  resources: [
    { name: "插件开发", href: "/fastapi_best_architecture_docs/plugin/dev" },
    { name: "插件分享", href: "/fastapi_best_architecture_docs/plugin/share" },
    { name: "插件安装", href: "/fastapi_best_architecture_docs/plugin/install" },
    { name: "插件市场", href: "/fastapi_best_architecture_docs/market" },
  ],
  friendlyLinks: [
    { name: "视频教程", href: "https://space.bilibili.com/284237214/lists" },
    { name: "博客", href: "/fastapi_best_architecture_docs/blog/" },
    { name: "隐私政策", href: "/fastapi_best_architecture_docs/privacy-policy" },
  ],
};
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
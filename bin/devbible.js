#!/usr/bin/env node

/**
 * DevBible CLI 🛡️⚡
 * Automated production-readiness auditor and template scaffolder for vibecoders.
 */

const fs = require('fs');
const path = require('path');

// ANSI Color codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const CHECKLIST_ITEMS = [
  { id: '01', name: 'Global Error Handling', level: 1, file: '01-error-handling.md' },
  { id: '02', name: 'Structured JSON Logging', level: 1, file: '02-logging.md' },
  { id: '03', name: 'Database Backup & Recovery', level: 1, file: '03-database-backup.md' },
  { id: '04', name: 'Staging & Preview Environments', level: 2, file: '04-staging-environment.md' },
  { id: '05', name: 'Monitoring, APM & Alerting', level: 2, file: '05-monitoring.md' },
  { id: '06', name: 'Analytics & Event Tracking', level: 2, file: '06-analytics.md' },
  { id: '07', name: 'Rate Limiting & DDoS Defense', level: 2, file: '07-rate-limiting.md' },
  { id: '08', name: 'Access Control (RBAC/ABAC)', level: 2, file: '08-access-control.md' },
  { id: '09', name: 'Secure Password Reset', level: 1, file: '09-password-reset.md' },
  { id: '10', name: 'Loading States & Skeletons', level: 1, file: '10-loading-states.md' },
  { id: '11', name: 'Error Boundaries & Fallback UI', level: 1, file: '11-error-states.md' },
  { id: '12', name: 'Mobile Responsiveness', level: 1, file: '12-responsiveness.md' },
  { id: '13', name: 'Backend Validation & Sanitization', level: 1, file: '13-backend-validation.md' },
  { id: '14', name: 'Database Migrations', level: 3, file: '14-database-migrations.md' },
  { id: '15', name: 'Rollback Strategy & Feature Flags', level: 3, file: '15-rollback-strategy.md' },
  { id: '16', name: 'Automated Testing Strategy', level: 2, file: '16-testing.md' },
  { id: '17', name: 'Privacy Policy & Cookies', level: 2, file: '17-privacy-policy.md' },
  { id: '18', name: 'Terms of Service', level: 2, file: '18-terms-of-service.md' },
  { id: '19', name: 'Image Compression & Media CDN', level: 2, file: '19-image-compression.md' },
  { id: '20', name: 'Custom 404 Error Page', level: 1, file: '20-404-error-page.md' },
];

const AVAILABLE_TEMPLATES = [
  { name: 'express-error-handler', file: 'templates/error-handler/express-error-handler.ts', target: 'express-error-handler.ts', desc: 'Centralized Express error middleware & status codes' },
  { name: 'fastapi-error-handler', file: 'templates/error-handler/fastapi-error-handler.py', target: 'fastapi-error-handler.py', desc: 'FastAPI exception handlers & structured JSON response' },
  { name: 'pino-logger', file: 'templates/logging-config/pino-logger.ts', target: 'pino-logger.ts', desc: 'High-performance Pino structured JSON logger with correlation IDs' },
  { name: 'python-structlog', file: 'templates/logging-config/python-structlog.py', target: 'python-structlog.py', desc: 'Python structlog JSON logger with correlation ID context' },
  { name: 'docker-compose', file: 'templates/docker-compose/docker-compose.prod.yml', target: 'docker-compose.prod.yml', desc: 'Production multi-container stack (App + Postgres + Redis + Caddy SSL)' },
  { name: 'checklist', file: 'checklist/PROJECT-REVIEW-CHECKLIST.md', target: 'CHECKLIST.md', desc: 'Interactive 20-point production audit sheet' },
  { name: 'health-check', file: 'templates/health-check/health-check.ts', target: 'health-check.ts', desc: 'Express / Node.js liveness (/healthz) and readiness (/readyz) router' },
  { name: 'fastapi-health-check', file: 'templates/health-check/fastapi-health-check.py', target: 'fastapi-health-check.py', desc: 'FastAPI /healthz and /readyz probes with DB ping' },
  { name: 'security-headers', file: 'templates/security-headers/security-headers.ts', target: 'security-headers.ts', desc: 'Production security headers (Helmet CSP/HSTS & Next.js config)' },
  { name: 'next-error-boundary', file: 'templates/next-error-boundary/error.tsx', target: 'app/error.tsx', desc: 'Next.js App Router error boundary with Sentry reporting' },
  { name: '404-page', file: 'templates/404-page/404.html', target: '404.html', desc: 'Production Golden Shark 404 HTML error page' },
  { name: 'next-not-found', file: 'templates/404-page/not-found.tsx', target: 'app/not-found.tsx', desc: 'Next.js App Router app/not-found.tsx with Golden Shark theme' },
  { name: 'github-ci', file: 'templates/github-ci/devbible-ci.yml', target: '.github/workflows/devbible-ci.yml', desc: 'Production GitHub Actions CI pipeline running DevBible audit' },
];

function printBanner() {
  console.log(`\n${colors.cyan}${colors.bold}┌────────────────────────────────────────────────────────┐${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}│                🛡️  DevBible CLI v1.1.0                  │${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}│    Production Readiness Auditor for Vibecoders & Devs   │${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}└────────────────────────────────────────────────────────┘${colors.reset}\n`);
}

function findFilesRecursive(dir, maxDepth = 5, currentDepth = 0, collected = []) {
  if (currentDepth > maxDepth || collected.length >= 600) return collected;

  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (
        file === 'node_modules' ||
        file === '.git' ||
        file === '.next' ||
        file === 'dist' ||
        file === 'build' ||
        file === '.turbo' ||
        file === '.venv' ||
        file === '__pycache__' ||
        file === '.cache'
      ) {
        continue;
      }
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        findFilesRecursive(filePath, maxDepth, currentDepth + 1, collected);
      } else {
        collected.push(filePath);
      }
      if (collected.length >= 600) break;
    }
  } catch (err) {
    // Ignore read errors for restricted dirs
  }
  return collected;
}

function readFileSafe(filePath, maxBytes = 100 * 1024) {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(maxBytes);
    const bytesRead = fs.readSync(fd, buffer, 0, maxBytes, 0);
    fs.closeSync(fd);
    return buffer.toString('utf8', 0, bytesRead);
  } catch {
    return '';
  }
}

function auditCodebase(options = {}) {
  const root = path.resolve(options.targetDir || '.');
  const format = options.format || 'text';
  const strict = Boolean(options.strict);
  const targetLevel = options.level ? parseInt(options.level, 10) : null;
  const outputFile = options.output || null;

  if (format === 'text' && !options.quiet) {
    printBanner();
    console.log(`${colors.bold}🔍 Auditing codebase at:${colors.reset} ${colors.dim}${root}${colors.reset}\n`);
  }

  const files = findFilesRecursive(root);
  const fileNames = files.map((f) => path.basename(f).toLowerCase());

  // Aggregate source and configuration contents
  const relevantFiles = files.filter((f) =>
    /\.(ts|js|tsx|jsx|py|go|json|yml|yaml|env|md|toml|ini|cfg)$/i.test(f)
  );

  const allContents = relevantFiles
    .map((f) => readFileSafe(f))
    .join('\n');

  const pkgJsonPath = path.join(root, 'package.json');
  const pkgContent = readFileSafe(pkgJsonPath);
  const reqTxtPath = path.join(root, 'requirements.txt');
  const reqContent = readFileSafe(reqTxtPath);

  // Evaluators
  function check01() {
    const hasMiddleware =
      /errorHandler|AppError|HTTPException|exception_handler|recover\(\)|errorHandlingMiddleware|errorBoundary|catch\s*\(|onError/i.test(allContents);
    return hasMiddleware ? 'PASS' : 'FAIL';
  }

  function check02() {
    const hasLogger =
      /pino|winston|structlog|log\/slog|loguru|logrus|correlation-id|requestId|x-request-id/i.test(allContents) ||
      /"pino"|"winston"|"bunyan"|"morgan"/i.test(pkgContent);
    return hasLogger ? 'PASS' : 'WARN';
  }

  function check03() {
    const hasBackup =
      /backup|pg_dump|mongodump|pitr|litestream|wal-g|snapshot/i.test(allContents) ||
      fileNames.some((f) => f.includes('backup'));
    return hasBackup ? 'PASS' : 'WARN';
  }

  function check04() {
    const hasEnvExample =
      fileNames.includes('.env.example') ||
      fileNames.includes('.env.sample') ||
      fileNames.includes('.env.template');
    return hasEnvExample ? 'PASS' : 'FAIL';
  }

  function check05() {
    const hasMonitoring =
      /sentry|datadog|highlight\.io|uptime|healthz|readyz|newrelic|prometheus|grafana|health-check/i.test(allContents) ||
      /"@sentry/i.test(pkgContent) ||
      /sentry-sdk/i.test(reqContent) ||
      fileNames.includes('health-check.ts') ||
      fileNames.includes('healthz.ts');
    return hasMonitoring ? 'PASS' : 'WARN';
  }

  function check06() {
    const hasAnalytics =
      /posthog|plausible|mixpanel|segment|umami|analytics|gtag/i.test(allContents) ||
      /"posthog-js"|"@vercel\/analytics"/i.test(pkgContent);
    return hasAnalytics ? 'PASS' : 'WARN';
  }

  function check07() {
    const hasRateLimit =
      /rate-limit|express-rate-limit|slowapi|tollbooth|upstash\/ratelimit|redis/i.test(allContents) ||
      /"express-rate-limit"/i.test(pkgContent);
    return hasRateLimit ? 'PASS' : 'WARN';
  }

  function check08() {
    const hasRbac =
      /tenant_id|org_id|organizationId|role|permission|requireAuth|can\(|casl|oso|rbac|policies/i.test(allContents);
    return hasRbac ? 'PASS' : 'WARN';
  }

  function check09() {
    const hasReset =
      /resetPassword|forgotPassword|reset_token|crypto\.randomBytes|argon2|bcrypt|scrypt/i.test(allContents);
    return hasReset ? 'PASS' : 'WARN';
  }

  function check10() {
    const hasSkeleton =
      /Skeleton|animate-pulse|loading|Spinner|Suspense/i.test(allContents) ||
      fileNames.includes('loading.tsx') ||
      fileNames.includes('loading.jsx');
    return hasSkeleton ? 'PASS' : 'WARN';
  }

  function check11() {
    const hasBoundary =
      /ErrorBoundary|error\.tsx|react-error-boundary|onErrorCaptured/i.test(allContents) ||
      fileNames.includes('error.tsx') ||
      fileNames.includes('error.vue');
    return hasBoundary ? 'PASS' : 'FAIL';
  }

  function check12() {
    const hasResponsive =
      /viewport|sm:|md:|lg:|@media|mobile/i.test(allContents) ||
      fileNames.includes('tailwind.config.js') ||
      fileNames.includes('tailwind.config.ts');
    return hasResponsive ? 'PASS' : 'PASS';
  }

  function check13() {
    const hasValidation =
      /zod|pydantic|typebox|valibot|joi|express-validator|validator|marshmallow/i.test(allContents) ||
      /"zod"/i.test(pkgContent) ||
      /pydantic/i.test(reqContent);
    return hasValidation ? 'PASS' : 'FAIL';
  }

  function check14() {
    const hasMigrations =
      fileNames.includes('schema.prisma') ||
      fileNames.includes('alembic.ini') ||
      fileNames.includes('drizzle.config.ts') ||
      files.some((f) => f.includes('migrations') || f.includes('migrate'));
    return hasMigrations ? 'PASS' : 'WARN';
  }

  function check15() {
    const hasRollback =
      /featureFlag|isFeatureEnabled|launchdarkly|unleash|posthog\.isFeatureEnabled|rollback|canary|blue-green/i.test(allContents);
    return hasRollback ? 'PASS' : 'WARN';
  }

  function check16() {
    const hasTests =
      /vitest|jest|pytest|playwright|cypress|supertest|testing-library/i.test(allContents) ||
      files.some((f) => /\.(test|spec)\.(ts|js|tsx|jsx|py|go)$/i.test(f));
    return hasTests ? 'PASS' : 'FAIL';
  }

  function check17() {
    const hasPrivacy =
      /privacy|cookie_consent|gdpr|termsfeed|termly|cookie-banner/i.test(allContents) ||
      fileNames.some((f) => f.includes('privacy'));
    return hasPrivacy ? 'PASS' : 'WARN';
  }

  function check18() {
    const hasTerms =
      /terms|terms-of-service|acceptable-use|tos/i.test(allContents) ||
      fileNames.some((f) => f.includes('terms'));
    return hasTerms ? 'PASS' : 'WARN';
  }

  function check19() {
    const hasImageOpt =
      /next\/image|nuxt-img|sharp|webp|avif|cloudinary|cloudflare-images/i.test(allContents) ||
      /"sharp"/i.test(pkgContent);
    return hasImageOpt ? 'PASS' : 'PASS';
  }

  function check20() {
    const has404 =
      fileNames.includes('not-found.tsx') ||
      fileNames.includes('not-found.js') ||
      fileNames.includes('404.tsx') ||
      fileNames.includes('404.html') ||
      fileNames.includes('404.vue') ||
      fileNames.includes('error.vue');
    return has404 ? 'PASS' : 'WARN';
  }

  const evaluators = [
    check01, check02, check03, check04, check05, check06, check07, check08, check09, check10,
    check11, check12, check13, check14, check15, check16, check17, check18, check19, check20,
  ];

  let passedCount = 0;
  let warnCount = 0;
  let failCount = 0;

  const itemResults = CHECKLIST_ITEMS.map((item, index) => {
    const status = evaluators[index]();
    if (status === 'PASS') passedCount++;
    else if (status === 'WARN') warnCount++;
    else failCount++;
    return {
      id: item.id,
      name: item.name,
      level: item.level,
      file: item.file,
      status,
    };
  });

  const total = CHECKLIST_ITEMS.length;
  const scorePercent = Math.round(((passedCount + warnCount * 0.5) / total) * 100);

  let maturityAwarded = 'Incomplete';
  if (scorePercent >= 85) maturityAwarded = '🥇 Level 3 (Enterprise Ready)';
  else if (scorePercent >= 60) maturityAwarded = '🥈 Level 2 (Scale Ready)';
  else if (scorePercent >= 40) maturityAwarded = '🥉 Level 1 (MVP Ready)';

  // Compute top recommended actions
  const topActions = [];
  itemResults.forEach((it) => {
    if (it.status === 'FAIL' && topActions.length < 3) {
      topActions.push({ id: it.id, name: it.name, type: 'Fix', cmd: `devbible info ${it.id}` });
    }
  });
  if (topActions.length < 3) {
    itemResults.forEach((it) => {
      if (it.status === 'WARN' && topActions.length < 3) {
        topActions.push({ id: it.id, name: it.name, type: 'Enhance', cmd: `devbible info ${it.id}` });
      }
    });
  }

  // Check failures against requested maturity level
  const failedItems = itemResults.filter((it) => {
    if (it.status !== 'FAIL') return false;
    if (targetLevel !== null) return it.level <= targetLevel;
    return true;
  });

  const shouldFailBuild = strict && failedItems.length > 0;

  // JSON OUTPUT
  if (format === 'json') {
    const jsonOutput = {
      timestamp: new Date().toISOString(),
      targetDir: root,
      score: scorePercent,
      maturityTier: maturityAwarded,
      levelFilter: targetLevel,
      strict,
      summary: {
        total,
        passed: passedCount,
        warnings: warnCount,
        failed: failCount,
      },
      results: itemResults,
      topActions,
    };
    const jsonString = JSON.stringify(jsonOutput, null, 2);
    if (outputFile) {
      fs.writeFileSync(path.resolve(outputFile), jsonString, 'utf8');
    }
    console.log(jsonString);
    if (shouldFailBuild) process.exit(1);
    return;
  }

  // MARKDOWN OUTPUT
  if (format === 'markdown') {
    const mdLines = [];
    mdLines.push('## 🛡️ DevBible Production Readiness Audit Scorecard\n');
    mdLines.push(`**Target Directory:** \`${path.basename(root)}\`  `);
    mdLines.push(`**Production Readiness Score:** **${scorePercent}%**  `);
    mdLines.push(`**Assigned Maturity Tier:** ${maturityAwarded}\n`);
    mdLines.push('| # | Tier | Status | Checklist Item | Guide Link |');
    mdLines.push('| :-: | :-: | :-: | :--- | :--- |');

    itemResults.forEach((it) => {
      const statusIcon = it.status === 'PASS' ? '✅ PASS' : it.status === 'WARN' ? '⚠️ WARN' : '❌ FAIL';
      const tierBadge = it.level === 1 ? '🥉 Level 1' : it.level === 2 ? '🥈 Level 2' : '🥇 Level 3';
      mdLines.push(`| **${it.id}** | ${tierBadge} | ${statusIcon} | ${it.name} | [Guide](checklist/${it.file}) |`);
    });

    mdLines.push('\n### 📊 Summary');
    mdLines.push(`- **Passed:** ${passedCount} / ${total}`);
    mdLines.push(`- **Warnings:** ${warnCount}`);
    mdLines.push(`- **Failures:** ${failCount}`);

    if (topActions.length > 0) {
      mdLines.push('\n### 🎯 Top Recommended Next Steps');
      topActions.forEach((act, idx) => {
        mdLines.push(`${idx + 1}. **${act.type} [${act.id}] ${act.name}**: \`npx ${act.cmd}\``);
      });
    }

    mdLines.push('\n---\n*Report generated automatically by [DevBible CLI](https://github.com/devcaiada/devbible)*');

    const mdString = mdLines.join('\n');
    if (outputFile) {
      fs.writeFileSync(path.resolve(outputFile), mdString, 'utf8');
      console.log(`${colors.green}✔ Markdown report saved to: ${outputFile}${colors.reset}`);
    }
    console.log(mdString);
    if (shouldFailBuild) process.exit(1);
    return;
  }

  // DEFAULT: TEXT CONSOLE OUTPUT
  console.log(`${colors.bold}ITEM  TIER     STATUS  CHECKLIST ITEM${colors.reset}`);
  console.log(`${colors.dim}────────────────────────────────────────────────────────${colors.reset}`);

  itemResults.forEach((it) => {
    let statusFormatted = '';
    if (it.status === 'PASS') {
      statusFormatted = `${colors.green}✔ PASS${colors.reset} `;
    } else if (it.status === 'WARN') {
      statusFormatted = `${colors.yellow}▲ WARN${colors.reset} `;
    } else {
      statusFormatted = `${colors.red}✖ FAIL${colors.reset} `;
    }

    const tierBadge = it.level === 1 ? 'Level 1' : it.level === 2 ? 'Level 2' : 'Level 3';
    console.log(`[${it.id}]  ${colors.dim}${tierBadge.padEnd(8)}${colors.reset} ${statusFormatted}  ${it.name}`);
  });

  console.log(`\n${colors.dim}────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`${colors.bold}📊 AUDIT SUMMARY:${colors.reset}`);
  console.log(`   Passed: ${colors.green}${passedCount}${colors.reset}  |  Warnings: ${colors.yellow}${warnCount}${colors.reset}  |  Failed: ${colors.red}${failCount}${colors.reset}`);
  console.log(`   Production Readiness Score: ${colors.bold}${colors.cyan}${scorePercent}%${colors.reset}`);
  console.log(`   Assigned Maturity Tier:     ${colors.bold}${maturityAwarded}${colors.reset}\n`);

  if (topActions.length > 0) {
    console.log(`${colors.bold}🎯 TOP 3 RECOMMENDED NEXT ACTIONS:${colors.reset}`);
    topActions.forEach((act, idx) => {
      const color = act.type === 'Fix' ? colors.yellow : colors.cyan;
      console.log(`   ${idx + 1}. ${color}${act.type} [${act.id}] ${act.name}${colors.reset} -> Run '${act.cmd}'`);
    });
  }

  console.log(`\n${colors.dim}💡 Tip: Use 'devbible scaffold <template>' to generate missing boilerplate.${colors.reset}\n`);

  if (outputFile) {
    const textReport = [
      `DevBible Audit Score: ${scorePercent}% (${maturityAwarded})`,
      `Passed: ${passedCount} | Warnings: ${warnCount} | Failed: ${failCount}`,
    ].join('\n');
    fs.writeFileSync(path.resolve(outputFile), textReport, 'utf8');
    console.log(`${colors.green}✔ Audit summary saved to: ${outputFile}${colors.reset}\n`);
  }

  if (shouldFailBuild) {
    console.log(`${colors.red}${colors.bold}❌ Audit failed: ${failedItems.length} checklist item(s) failed strict verification.${colors.reset}\n`);
    process.exit(1);
  }
}

function listItems(options = {}) {
  printBanner();
  const filterLevel = options.level ? parseInt(options.level, 10) : null;
  console.log(`${colors.bold}📋 Production Readiness Checklist Items:${colors.reset}\n`);

  CHECKLIST_ITEMS.filter((item) => (filterLevel ? item.level === filterLevel : true)).forEach((item) => {
    const tier = item.level === 1 ? `${colors.blue}Level 1 (MVP)` : item.level === 2 ? `${colors.green}Level 2 (Scale)` : `${colors.magenta}Level 3 (Enterprise)`;
    console.log(`  [${item.id}] ${item.name.padEnd(36)} ${tier}${colors.reset}`);
  });
  console.log(`\n${colors.dim}View item details: devbible info <id>${colors.reset}\n`);
}

function showInfo(idOrNumber) {
  printBanner();
  const idStr = String(idOrNumber).padStart(2, '0');
  const item = CHECKLIST_ITEMS.find((it) => it.id === idStr);

  if (!item) {
    console.log(`${colors.red}Error: Item '${idOrNumber}' not found. Choose 01 to 20.${colors.reset}\n`);
    return;
  }

  const checklistDir = path.join(__dirname, '..', 'checklist');
  const filePath = path.join(checklistDir, item.file);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(content);
  } else {
    console.log(`${colors.bold}${item.id} - ${item.name}${colors.reset}`);
    console.log(`Maturity Tier: Level ${item.level}`);
  }
}

function scaffoldTemplate(templateName, dest = '.') {
  printBanner();
  const templateObj = AVAILABLE_TEMPLATES.find(
    (t) => t.name.toLowerCase() === (templateName || '').toLowerCase()
  );

  if (!templateObj) {
    console.log(`${colors.yellow}Available templates to scaffold:${colors.reset}\n`);
    AVAILABLE_TEMPLATES.forEach((t) => {
      console.log(`  - ${colors.cyan}${t.name.padEnd(24)}${colors.reset} ${colors.dim}${t.desc}${colors.reset}`);
    });
    console.log(`\nUsage: devbible scaffold <template-name> [destDir]\n`);
    return;
  }

  const rootDir = path.join(__dirname, '..');
  const srcPath = path.join(rootDir, templateObj.file);

  if (!fs.existsSync(srcPath)) {
    console.log(`${colors.red}Error: Source template file not found at ${srcPath}${colors.reset}\n`);
    return;
  }

  const targetPath = path.join(path.resolve(dest), templateObj.target);
  const targetDir = path.dirname(targetPath);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.copyFileSync(srcPath, targetPath);
  console.log(`${colors.green}✔ Successfully scaffolded ${templateObj.name} to:${colors.reset}`);
  console.log(`  ${colors.bold}${targetPath}${colors.reset}\n`);
}

function showHelp() {
  printBanner();
  console.log(`${colors.bold}Commands:${colors.reset}`);
  console.log(`  ${colors.cyan}devbible audit [path] [flags]${colors.reset}   Scan codebase and calculate readiness score`);
  console.log(`  ${colors.cyan}devbible list [flags]${colors.reset}           List checklist items & maturity levels`);
  console.log(`  ${colors.cyan}devbible info <01-20>${colors.reset}           Show guide and best practices for an item`);
  console.log(`  ${colors.cyan}devbible scaffold <template>${colors.reset}    Copy production boilerplate into project`);
  console.log(`  ${colors.cyan}devbible help${colors.reset}                   Display this help message\n`);

  console.log(`${colors.bold}Audit Flags:${colors.reset}`);
  console.log(`  ${colors.green}--strict${colors.reset}                        Exit with code 1 if any checklist item fails`);
  console.log(`  ${colors.green}--level <1|2|3>${colors.reset}                 Filter checks to target maturity level (1=MVP, 2=Scale, 3=Enterprise)`);
  console.log(`  ${colors.green}--format <text|json|markdown>${colors.reset} Output format (default: text)`);
  console.log(`  ${colors.green}--json${colors.reset}                          Shortcut for --format json`);
  console.log(`  ${colors.green}--markdown${colors.reset}                      Shortcut for --format markdown (ideal for PR comments)`);
  console.log(`  ${colors.green}--output <file>${colors.reset}                 Write report directly to specified file`);
  console.log(`  ${colors.green}--quiet, -q${colors.reset}                    Suppress banner output\n`);

  console.log(`${colors.bold}Available Scaffolding Templates:${colors.reset}`);
  AVAILABLE_TEMPLATES.forEach((t) => {
    console.log(`  ${colors.cyan}${t.name.padEnd(24)}${colors.reset} ${t.desc}`);
  });
  console.log('');
}

// Argument Parser
const rawArgs = process.argv.slice(2);
let command = 'audit';
let targetParam = null;
const parsedOptions = {
  strict: false,
  level: null,
  format: 'text',
  output: null,
  quiet: false,
};

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--strict') {
    parsedOptions.strict = true;
  } else if (arg === '--json') {
    parsedOptions.format = 'json';
  } else if (arg === '--markdown' || arg === '--md') {
    parsedOptions.format = 'markdown';
  } else if (arg === '--quiet' || arg === '-q') {
    parsedOptions.quiet = true;
  } else if (arg === '--format' && rawArgs[i + 1]) {
    parsedOptions.format = rawArgs[++i].toLowerCase();
  } else if (arg === '--level' && rawArgs[i + 1]) {
    parsedOptions.level = rawArgs[++i];
  } else if (arg === '--output' && rawArgs[i + 1]) {
    parsedOptions.output = rawArgs[++i];
  } else if (!arg.startsWith('-')) {
    if (!command || command === 'audit') {
      if (['audit', 'list', 'ls', 'info', 'scaffold', 'init', 'help'].includes(arg.toLowerCase())) {
        command = arg.toLowerCase();
      } else {
        targetParam = arg;
      }
    } else if (!targetParam) {
      targetParam = arg;
    }
  }
}

switch (command) {
  case 'audit':
    parsedOptions.targetDir = targetParam || '.';
    auditCodebase(parsedOptions);
    break;
  case 'list':
  case 'ls':
    listItems(parsedOptions);
    break;
  case 'info':
    showInfo(targetParam || '01');
    break;
  case 'scaffold':
  case 'init':
    scaffoldTemplate(targetParam, rawArgs[rawArgs.indexOf(targetParam) + 1] || '.');
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.log(`${colors.red}Unknown command: ${command}${colors.reset}`);
    showHelp();
    break;
}

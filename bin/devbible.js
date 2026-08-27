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

function printBanner() {
  console.log(`\n${colors.cyan}${colors.bold}┌────────────────────────────────────────────────────────┐${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}│                🛡️  DevBible CLI v1.0.0                  │${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}│    Production Readiness Auditor for Vibecoders & Devs   │${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}└────────────────────────────────────────────────────────┘${colors.reset}\n`);
}

function findFilesRecursive(dir, maxDepth = 4, currentDepth = 0) {
  let results = [];
  if (currentDepth > maxDepth) return results;

  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      if (file === 'node_modules' || file === '.git' || file === '.next' || file === 'dist' || file === 'build') {
        continue;
      }
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(findFilesRecursive(filePath, maxDepth, currentDepth + 1));
      } else {
        results.push(filePath);
      }
    }
  } catch (err) {
    // Ignore read errors for inaccessible dirs
  }
  return results;
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

function auditCodebase(targetDir = '.') {
  const root = path.resolve(targetDir);
  printBanner();
  console.log(`${colors.bold}🔍 Auditing codebase at:${colors.reset} ${colors.dim}${root}${colors.reset}\n`);

  const files = findFilesRecursive(root);
  const fileNames = files.map((f) => path.basename(f).toLowerCase());
  const allContents = files
    .filter((f) => /\.(ts|js|tsx|jsx|py|go|json|yml|yaml|env|md)$/i.test(f))
    .slice(0, 50)
    .map((f) => readFileSafe(f))
    .join('\n');

  const pkgJsonPath = path.join(root, 'package.json');
  const pkgContent = readFileSafe(pkgJsonPath);
  const reqTxtPath = path.join(root, 'requirements.txt');
  const reqContent = readFileSafe(reqTxtPath);

  const checks = [];

  // Helper check evaluators
  function check01() {
    // Error Handling
    const hasMiddleware =
      /errorHandler|AppError|HTTPException|exception_handler|recover\(\)|errorHandlingMiddleware/i.test(allContents);
    return hasMiddleware ? 'PASS' : 'FAIL';
  }

  function check02() {
    // Logging
    const hasLogger =
      /pino|winston|structlog|log\/slog|loguru|logrus|correlation-id|requestId/i.test(allContents) ||
      /"pino"|"winston"/i.test(pkgContent);
    return hasLogger ? 'PASS' : 'WARN';
  }

  function check03() {
    // DB Backup
    const hasBackup =
      /backup|pg_dump|mongodump|pitr|litestream|wal-g/i.test(allContents) ||
      fileNames.some((f) => f.includes('backup'));
    return hasBackup ? 'PASS' : 'WARN';
  }

  function check04() {
    // Staging
    const hasEnvExample = fileNames.includes('.env.example') || fileNames.includes('.env.sample');
    return hasEnvExample ? 'PASS' : 'FAIL';
  }

  function check05() {
    // Monitoring & APM
    const hasMonitoring =
      /sentry|datadog|highlight\.io|uptime|healthz|readyz|newrelic|prometheus/i.test(allContents) ||
      /"@sentry/i.test(pkgContent) ||
      /sentry-sdk/i.test(reqContent);
    return hasMonitoring ? 'PASS' : 'WARN';
  }

  function check06() {
    // Analytics
    const hasAnalytics =
      /posthog|plausible|mixpanel|segment|umami|analytics/i.test(allContents) ||
      /"posthog-js"|"@vercel\/analytics"/i.test(pkgContent);
    return hasAnalytics ? 'PASS' : 'WARN';
  }

  function check07() {
    // Rate Limiting
    const hasRateLimit =
      /rate-limit|express-rate-limit|slowapi|tollbooth|upstash\/ratelimit|redis/i.test(allContents) ||
      /"express-rate-limit"/i.test(pkgContent);
    return hasRateLimit ? 'PASS' : 'WARN';
  }

  function check08() {
    // Access Control
    const hasRbac =
      /tenant_id|org_id|organizationId|role|permission|requireAuth|can\(|casl|oso/i.test(allContents);
    return hasRbac ? 'PASS' : 'WARN';
  }

  function check09() {
    // Password Reset
    const hasReset =
      /resetPassword|forgotPassword|reset_token|crypto\.randomBytes|argon2|bcrypt/i.test(allContents);
    return hasReset ? 'PASS' : 'WARN';
  }

  function check10() {
    // Loading States
    const hasSkeleton =
      /Skeleton|animate-pulse|loading|Spinner|Suspense/i.test(allContents);
    return hasSkeleton ? 'PASS' : 'WARN';
  }

  function check11() {
    // Error Boundaries
    const hasBoundary =
      /ErrorBoundary|error\.tsx|react-error-boundary|onErrorCaptured/i.test(allContents) ||
      fileNames.includes('error.tsx') ||
      fileNames.includes('error.vue');
    return hasBoundary ? 'PASS' : 'FAIL';
  }

  function check12() {
    // Responsiveness
    const hasResponsive =
      /viewport|sm:|md:|lg:|@media|mobile/i.test(allContents) ||
      fileNames.includes('tailwind.config.js') ||
      fileNames.includes('tailwind.config.ts');
    return hasResponsive ? 'PASS' : 'PASS';
  }

  function check13() {
    // Backend Validation
    const hasValidation =
      /zod|pydantic|typebox|valibot|joi|express-validator|validator/i.test(allContents) ||
      /"zod"/i.test(pkgContent) ||
      /pydantic/i.test(reqContent);
    return hasValidation ? 'PASS' : 'FAIL';
  }

  function check14() {
    // Migrations
    const hasMigrations =
      fileNames.includes('schema.prisma') ||
      fileNames.includes('alembic.ini') ||
      fileNames.includes('drizzle.config.ts') ||
      files.some((f) => f.includes('migrations') || f.includes('migrate'));
    return hasMigrations ? 'PASS' : 'WARN';
  }

  function check15() {
    // Rollback / Feature Flags
    const hasRollback =
      /featureFlag|isFeatureEnabled|launchdarkly|unleash|posthog\.isFeatureEnabled|rollback/i.test(allContents);
    return hasRollback ? 'PASS' : 'WARN';
  }

  function check16() {
    // Automated Testing
    const hasTests =
      /vitest|jest|pytest|playwright|cypress|supertest|testing-library/i.test(allContents) ||
      files.some((f) => /\.(test|spec)\.(ts|js|tsx|jsx|py|go)$/i.test(f));
    return hasTests ? 'PASS' : 'FAIL';
  }

  function check17() {
    // Privacy Policy
    const hasPrivacy =
      /privacy|cookie_consent|gdpr|termsfeed|termly/i.test(allContents) ||
      fileNames.some((f) => f.includes('privacy'));
    return hasPrivacy ? 'PASS' : 'WARN';
  }

  function check18() {
    // Terms of Service
    const hasTerms =
      /terms|terms-of-service|acceptable-use/i.test(allContents) ||
      fileNames.some((f) => f.includes('terms'));
    return hasTerms ? 'PASS' : 'WARN';
  }

  function check19() {
    // Image Compression
    const hasImageOpt =
      /next\/image|nuxt-img|sharp|webp|avif|cloudinary|cloudflare-images/i.test(allContents) ||
      /"sharp"/i.test(pkgContent);
    return hasImageOpt ? 'PASS' : 'PASS';
  }

  function check20() {
    // 404 Page
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

  console.log(`${colors.bold}ITEM  TIER     STATUS  CHECKLIST ITEM${colors.reset}`);
  console.log(`${colors.dim}────────────────────────────────────────────────────────${colors.reset}`);

  CHECKLIST_ITEMS.forEach((item, index) => {
    const status = evaluators[index]();
    let statusFormatted = '';

    if (status === 'PASS') {
      statusFormatted = `${colors.green}✔ PASS${colors.reset} `;
      passedCount++;
    } else if (status === 'WARN') {
      statusFormatted = `${colors.yellow}▲ WARN${colors.reset} `;
      warnCount++;
    } else {
      statusFormatted = `${colors.red}✖ FAIL${colors.reset} `;
      failCount++;
    }

    const tierBadge = item.level === 1 ? 'Level 1' : item.level === 2 ? 'Level 2' : 'Level 3';
    console.log(`[${item.id}]  ${colors.dim}${tierBadge.padEnd(8)}${colors.reset} ${statusFormatted}  ${item.name}`);
  });

  const total = CHECKLIST_ITEMS.length;
  const scorePercent = Math.round(((passedCount + warnCount * 0.5) / total) * 100);

  let maturityAwarded = 'Incomplete';
  if (scorePercent >= 85) maturityAwarded = '🥇 Level 3 (Enterprise Ready)';
  else if (scorePercent >= 60) maturityAwarded = '🥈 Level 2 (Scale Ready)';
  else if (scorePercent >= 40) maturityAwarded = '🥉 Level 1 (MVP Ready)';

  console.log(`\n${colors.dim}────────────────────────────────────────────────────────${colors.reset}`);
  console.log(`${colors.bold}📊 AUDIT SUMMARY:${colors.reset}`);
  console.log(`   Passed: ${colors.green}${passedCount}${colors.reset}  |  Warnings: ${colors.yellow}${warnCount}${colors.reset}  |  Failed: ${colors.red}${failCount}${colors.reset}`);
  console.log(`   Production Readiness Score: ${colors.bold}${colors.cyan}${scorePercent}%${colors.reset}`);
  console.log(`   Assigned Maturity Tier:     ${colors.bold}${maturityAwarded}${colors.reset}\n`);

  console.log(`${colors.bold}🎯 TOP 3 RECOMMENDED NEXT ACTIONS:${colors.reset}`);
  let actionIdx = 1;
  CHECKLIST_ITEMS.forEach((item, index) => {
    const status = evaluators[index]();
    if (status === 'FAIL' && actionIdx <= 3) {
      console.log(`   ${actionIdx}. ${colors.yellow}Fix [${item.id}] ${item.name}${colors.reset} -> Run 'devbible info ${item.id}'`);
      actionIdx++;
    }
  });

  if (actionIdx <= 3) {
    CHECKLIST_ITEMS.forEach((item, index) => {
      const status = evaluators[index]();
      if (status === 'WARN' && actionIdx <= 3) {
        console.log(`   ${actionIdx}. ${colors.cyan}Enhance [${item.id}] ${item.name}${colors.reset} -> Run 'devbible info ${item.id}'`);
        actionIdx++;
      }
    });
  }

  console.log(`\n${colors.dim}💡 Tip: Use 'devbible scaffold <template>' to generate missing boilerplate.${colors.reset}\n`);
}

function listItems() {
  printBanner();
  console.log(`${colors.bold}📋 All 20 Production Readiness Checklist Items:${colors.reset}\n`);
  CHECKLIST_ITEMS.forEach((item) => {
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
  const templatesDir = path.join(__dirname, '..', 'templates');
  const availableTemplates = [
    'express-error-handler',
    'fastapi-error-handler',
    'pino-logger',
    'python-structlog',
    'docker-compose',
    'checklist',
  ];

  if (!templateName || !availableTemplates.includes(templateName.toLowerCase())) {
    console.log(`${colors.yellow}Available templates to scaffold:${colors.reset}`);
    availableTemplates.forEach((t) => console.log(`  - ${t}`));
    console.log(`\nUsage: devbible scaffold <template-name>\n`);
    return;
  }

  const destPath = path.resolve(dest);

  if (templateName === 'express-error-handler') {
    const src = path.join(templatesDir, 'error-handler', 'express-error-handler.ts');
    const target = path.join(destPath, 'express-error-handler.ts');
    fs.copyFileSync(src, target);
    console.log(`${colors.green}✔ Scaffolded express-error-handler.ts to ${target}${colors.reset}\n`);
  } else if (templateName === 'fastapi-error-handler') {
    const src = path.join(templatesDir, 'error-handler', 'fastapi-error-handler.py');
    const target = path.join(destPath, 'fastapi-error-handler.py');
    fs.copyFileSync(src, target);
    console.log(`${colors.green}✔ Scaffolded fastapi-error-handler.py to ${target}${colors.reset}\n`);
  } else if (templateName === 'pino-logger') {
    const src = path.join(templatesDir, 'logging-config', 'pino-logger.ts');
    const target = path.join(destPath, 'pino-logger.ts');
    fs.copyFileSync(src, target);
    console.log(`${colors.green}✔ Scaffolded pino-logger.ts to ${target}${colors.reset}\n`);
  } else if (templateName === 'python-structlog') {
    const src = path.join(templatesDir, 'logging-config', 'python-structlog.py');
    const target = path.join(destPath, 'python-structlog.py');
    fs.copyFileSync(src, target);
    console.log(`${colors.green}✔ Scaffolded python-structlog.py to ${target}${colors.reset}\n`);
  } else if (templateName === 'docker-compose') {
    const src = path.join(templatesDir, 'docker-compose', 'docker-compose.prod.yml');
    const target = path.join(destPath, 'docker-compose.prod.yml');
    fs.copyFileSync(src, target);
    console.log(`${colors.green}✔ Scaffolded docker-compose.prod.yml to ${target}${colors.reset}\n`);
  } else if (templateName === 'checklist') {
    const src = path.join(__dirname, '..', 'checklist', 'PROJECT-REVIEW-CHECKLIST.md');
    const target = path.join(destPath, 'CHECKLIST.md');
    fs.copyFileSync(src, target);
    console.log(`${colors.green}✔ Scaffolded CHECKLIST.md to ${target}${colors.reset}\n`);
  }
}

function showHelp() {
  printBanner();
  console.log(`${colors.bold}Commands:${colors.reset}`);
  console.log(`  ${colors.cyan}devbible audit [path]${colors.reset}          Scan codebase and calculate readiness score`);
  console.log(`  ${colors.cyan}devbible list${colors.reset}                  List all 20 checklist items & maturity levels`);
  console.log(`  ${colors.cyan}devbible info <01-20>${colors.reset}          Show guide and best practices for an item`);
  console.log(`  ${colors.cyan}devbible scaffold <template>${colors.reset}   Copy production template into your project`);
  console.log(`  ${colors.cyan}devbible help${colors.reset}                  Display this help message\n`);
  console.log(`${colors.bold}Templates available for scaffolding:${colors.reset}`);
  console.log(`  express-error-handler, fastapi-error-handler, pino-logger, python-structlog, docker-compose, checklist\n`);
}

// CLI Argument Router
const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : 'audit';

switch (command) {
  case 'audit':
    auditCodebase(args[1] || '.');
    break;
  case 'list':
  case 'ls':
    listItems();
    break;
  case 'info':
    showInfo(args[1] || '01');
    break;
  case 'scaffold':
  case 'init':
    scaffoldTemplate(args[1], args[2] || '.');
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

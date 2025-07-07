#!/usr/bin/env node

/**
 * DataLayer Builder v3.0 - Standalone HTML Generator
 *
 * This script creates a single HTML file containing the entire application
 * that can be shared with clients and run locally without dependencies.
 */

const fs = require("fs");
const path = require("path");

console.log("🚀 Generating DataLayer Builder v3.0 Standalone HTML...");

try {
  // Read the built assets
  const cssPath = path.join(__dirname, "dist/assets/index-CZgB8w04.css");
  const jsPath = path.join(__dirname, "dist/assets/index-CCJUgdci.js");

  if (!fs.existsSync(cssPath) || !fs.existsSync(jsPath)) {
    console.error(
      '❌ Build assets not found. Please run "npm run build" first.',
    );
    process.exit(1);
  }

  const css = fs.readFileSync(cssPath, "utf8");
  const js = fs.readFileSync(jsPath, "utf8");

  console.log(`📊 CSS size: ${(css.length / 1024).toFixed(1)}KB`);
  console.log(`📊 JS size: ${(js.length / 1024).toFixed(1)}KB`);

  // Create the standalone HTML
  const standaloneHTML = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DataLayer Builder v3.0 - GA4 Schema Generator</title>
    <meta name="description" content="Healthcare & Pharmaceutical GA4 DataLayer Schema Builder - Generate comprehensive Google Analytics 4 tracking schemas with 74+ parameters and 35+ events">
    <meta name="author" content="Builder.io">
    <meta name="version" content="3.0">
    <meta name="standalone" content="true">
    
    <!-- Embedded Styles -->
    <style>
${css}
    </style>
</head>
<body>
    <div id="root"></div>
    
    <!-- Embedded Application -->
    <script>
${js}
    </script>
    
    <!-- Standalone Info -->
    <script>
        console.log('📊 DataLayer Builder v3.0 - Standalone Version');
        console.log('🏥 Healthcare & Pharmaceutical GA4 Schema Generator');
        console.log('✅ Running locally - no internet connection required');
        console.log('📄 Total size: ${((css.length + js.length) / 1024).toFixed(1)}KB');
    </script>
</body>
</html>`;

  // Write the standalone file
  const outputPath = "DataLayer-Builder-v3.0-Standalone.html";
  fs.writeFileSync(outputPath, standaloneHTML);

  console.log(`✅ Generated: ${outputPath}`);
  console.log(
    `📏 Total size: ${((css.length + js.length) / 1024).toFixed(1)}KB`,
  );
  console.log("");
  console.log("🎯 Usage Instructions:");
  console.log("1. Share the HTML file with your client");
  console.log("2. Client can open it in any modern browser");
  console.log("3. No internet connection or installation required");
  console.log("4. Full DataLayer Builder functionality included");
  console.log("");
  console.log("📋 Features included:");
  console.log("• 74+ Healthcare/Pharmaceutical GA4 Parameters");
  console.log("• 35+ Comprehensive GA4 Events");
  console.log("• Drag & Drop Schema Building");
  console.log("• Real-time Code Generation");
  console.log("• Markdown Documentation Export");
} catch (error) {
  console.error("❌ Error generating standalone file:", error.message);
  process.exit(1);
}

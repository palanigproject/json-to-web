#!/usr/bin/env node

const { generateFiles, generateFromConfig } = require('./src/generator');

// Get input file from command line args or use default
const inputFile = process.argv[2];

// Check if using modular config or single file
if (inputFile === '--config' || !inputFile) {
  // Use modular config files
  generateFromConfig();
} else {
  // Use single input file (legacy)
  generateFiles(inputFile);
}

#!/bin/bash
find src -name "*.tsx" -type f -exec sed -i -e 's/\bbg-white\b/bg-white dark:bg-slate-900/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/\bbg-slate-50\b/bg-slate-50 dark:bg-slate-800/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/\bbg-slate-100\b/bg-slate-100 dark:bg-slate-800/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/\bborder-slate-200\b/border-slate-200 dark:border-slate-700/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/\bborder-slate-100\b/border-slate-100 dark:border-slate-800/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/\btext-slate-900\b/text-slate-900 dark:text-slate-50/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/\btext-slate-800\b/text-slate-800 dark:text-slate-100/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/\btext-slate-700\b/text-slate-700 dark:text-slate-200/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/\btext-slate-600\b/text-slate-600 dark:text-slate-300/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/\btext-slate-500\b/text-slate-500 dark:text-slate-400/g' {} +

# Clean up duplicates that might have been created if they already had dark classes
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:bg-slate-900 dark:bg-slate-900/dark:bg-slate-900/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:bg-slate-800 dark:bg-slate-800/dark:bg-slate-800/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:bg-slate-800\/50 dark:bg-slate-800/dark:bg-slate-800\/50/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:border-slate-700 dark:border-slate-700/dark:border-slate-700/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:border-slate-800 dark:border-slate-800/dark:border-slate-800/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:text-slate-50 dark:text-slate-50/dark:text-slate-50/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:text-slate-100 dark:text-slate-100/dark:text-slate-100/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:text-slate-200 dark:text-slate-200/dark:text-slate-200/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:text-slate-300 dark:text-slate-300/dark:text-slate-300/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:text-slate-400 dark:text-slate-400/dark:text-slate-400/g' {} +

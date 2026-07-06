#!/bin/bash
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:bg-slate-[0-9]* dark:bg-slate-\([0-9]*\)/dark:bg-slate-\1/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:border-slate-[0-9]* dark:border-slate-\([0-9]*\)/dark:border-slate-\1/g' {} +
find src -name "*.tsx" -type f -exec sed -i -e 's/dark:text-slate-[0-9]* dark:text-slate-\([0-9]*\)/dark:text-slate-\1/g' {} +

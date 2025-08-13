#!/usr/bin/env tsx

import { askProjectOptions } from './prompts';
// import { createMockStructure } from './actions/createMock';
import { setupI18n } from './actions/setupI18n';

async function main() {
  const answers = await askProjectOptions();

//   if (answers.useMock) {
//     await createMockStructure();
//   }

  if (answers.useI18n) {
    await setupI18n();
  }

  // Diğer opsiyonlar: Tailwind, design kit, proxy...
}

main();

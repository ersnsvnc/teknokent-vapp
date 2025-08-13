import inquirer from 'inquirer';

export async function askProjectOptions() {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'useMock',
      message: 'Do you want to include mock API support?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'useI18n',
      message: 'Do you want to enable i18n support?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'useTailwind',
      message: 'Do you want to use Tailwind CSS?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'useDesignKit',
      message: 'Do you want to include your design kit?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'useBackendProxy',
      message: 'Will this project use a proxy to an external backend?',
      default: false,
    },
  ]);
}

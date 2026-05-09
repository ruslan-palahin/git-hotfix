import { spawnSync } from 'node:child_process'
import readline from 'node:readline/promises'
import chalk from 'chalk'

export async function execWithConfirm(cmds, opts = {}) {
  cmds = cmds.filter(Boolean)

  if (cmds.length === 0) {
    console.log('\nNothing to do.\n')
    return 0
  }

  console.log()
  console.log(chalk.bold('Following commands will be executed:'))
  console.log()
  for (const cmd of cmds) console.log(chalk.green(cmd))
  console.log()

  if (!opts.yes) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    const answer = (await rl.question('Ok? (y/n) [y]: ')).trim().toLowerCase()
    rl.close()
    if (answer !== '' && answer !== 'y') return 0
  }

  const r = spawnSync(cmds.join(' && '), { stdio: 'inherit', shell: true })
  return r.status ?? 1
}

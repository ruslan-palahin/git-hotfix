import chalk from 'chalk'
import { currentBranch, hasChanges } from '../git.js'
import { execWithConfirm } from '../run.js'

export async function run() {
  if (hasChanges()) {
    console.log(chalk.yellow('Please commit all changes before "hf get".'))
    process.exit(1)
  }

  const branch = currentBranch()
  const code = await execWithConfirm([`git pull origin ${branch}`], { yes: true })
  process.exit(code)
}

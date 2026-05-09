import chalk from 'chalk'
import { currentBranch, hasChanges, remoteBranchExists, taskName } from '../git.js'
import { execWithConfirm } from '../run.js'

export async function run(message, options) {
  if (message.includes("'") || message.includes('"')) {
    console.log(chalk.red('Avoid \' and " in commit messages.'))
    process.exit(1)
  }

  const branch = currentBranch()
  const task = taskName()
  const fullMessage = task ? `#${task}: ${message}` : message

  const cmds = []

  if (hasChanges()) {
    cmds.push('git add -A')
    cmds.push(`git commit -m '${fullMessage}'`)
  }

  if (remoteBranchExists(branch)) {
    cmds.push(`git pull origin ${branch}`)
  }

  cmds.push(`git push -u origin ${branch}`)

  const code = await execWithConfirm(cmds, { yes: options.yes })
  process.exit(code)
}

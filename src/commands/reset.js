import { hasChanges } from '../git.js'
import { execWithConfirm } from '../run.js'

export async function run(options) {
  const cmds = []

  if (hasChanges()) {
    cmds.push('git add -A')
    cmds.push('git reset --hard')
  }

  const code = await execWithConfirm(cmds, { yes: options?.yes })
  process.exit(code)
}

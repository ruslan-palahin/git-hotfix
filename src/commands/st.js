import { execWithConfirm } from '../run.js'

export async function run() {
  const code = await execWithConfirm(['git status'], { yes: true })
  process.exit(code)
}

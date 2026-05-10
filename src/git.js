import { spawnSync } from 'node:child_process'

export function gitOut(...args) {
  const r = spawnSync('git', args, { encoding: 'utf8' })
  if (r.status !== 0) return ''
  return r.stdout.trim()
}

export function currentBranch() {
  return gitOut('rev-parse', '--abbrev-ref', 'HEAD')
}

export function taskName() {
  const branch = currentBranch()
  if (!branch) return null
  const m = branch.match(/\/([^/]+)$/)
  return m ? m[1] : branch
}

export function hasChanges() {
  return gitOut('status', '--porcelain') !== ''
}

export function remoteBranchExists(name) {
  return gitOut('ls-remote', '--heads', 'origin', name) !== ''
}

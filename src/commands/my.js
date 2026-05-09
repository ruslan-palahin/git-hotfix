import { spawnSync } from 'node:child_process'

export function run() {
  const r = spawnSync(
    'git',
    ['for-each-ref', '--sort=-committerdate', 'refs/heads/', '--format=%(refname:short)'],
    { encoding: 'utf8' }
  )

  if (r.status !== 0) {
    process.stderr.write(r.stderr || 'git failed\n')
    process.exit(r.status ?? 1)
  }

  const lines = r.stdout.trim().split('\n').filter(Boolean).slice(0, 20)
  console.log(lines.join('\n'))
}

const { readdirSync, existsSync } = require('node:fs');
const { join } = require('node:path');
const { spawnSync } = require('node:child_process');
let failed = false;
for (const entry of readdirSync('1gyakorlat', { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === 'eredeti') continue;
    const file = join('1gyakorlat', entry.name, entry.name + 'Test.js');
    if (!existsSync(file)) continue;
    const result = spawnSync(process.execPath, [file], { stdio: 'inherit' });
    if (result.error || result.status !== 0) failed = true;
}
process.exitCode = failed ? 1 : 0;

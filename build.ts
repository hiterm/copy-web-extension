import { build } from 'esbuild';
import { promises as fs } from 'fs';

build({
  entryPoints: ['popup/index.tsx'],
  bundle: true,
  outdir: 'dist/popup',
});

fs.copyFile('popup/popup.html', 'dist/popup/popup.html');
fs.copyFile('manifest.json', 'dist/manifest.json');
fs.cp('icons', 'dist/icons', { recursive: true });

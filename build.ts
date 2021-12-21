import { build } from 'esbuild';

build({
  entryPoints: ['popup/popup.tsx'],
  bundle: true,
  outdir: 'dist/popup',
});

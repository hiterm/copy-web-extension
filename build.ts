import { build } from 'esbuild';

build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outdir: 'dist',
});

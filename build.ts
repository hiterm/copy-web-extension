import * as chokidar from 'chokidar';
import { build, BuildOptions } from 'esbuild';
import { promises as fs } from 'fs';
import path from 'path';

const watchFlag = process.argv.includes('--watch');
const devFlag = process.argv.includes('--dev');

const watchOption: BuildOptions["watch"] = watchFlag ? {
  onRebuild: (error, result) => {
    if (error) console.error('watch build failed:', error)
    else console.log('watch build succeeded:', result)
  }
} : false;

(async () => {
  await fs.mkdir('dist/popup', { recursive: true });
  await fs.mkdir('dist/icons', { recursive: true });

  build({
    entryPoints: ['popup/index.tsx'],
    bundle: true,
    outdir: 'dist/popup',
    watch: watchOption,
    sourcemap: devFlag ? 'inline' : false
  });

  if (watchFlag) {
    chokidar.watch('popup/popup.html').on('all', (event, path) => {
      console.log(event, path);
      fs.copyFile(path, 'dist/popup/popup.html');
    });
    chokidar.watch('manifest.json').on('all', (event, path) => {
      console.log(event, path);
      fs.copyFile(path, 'dist/manifest.json');
    });
    chokidar.watch('icons/*').on('all', (event, filepath) => {
      console.log(event, filepath);
      fs.copyFile(filepath, path.join('dist', path.basename(filepath)));
    });
  } else {
    fs.copyFile('popup/popup.html', 'dist/popup/popup.html');
    fs.copyFile('manifest.json', 'dist/manifest.json');
    fs.cp('icons', 'dist/icons', { recursive: true });
  }
})();

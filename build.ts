import * as chokidar from 'chokidar';
import { build, BuildOptions } from 'esbuild';
import { promises as fs } from 'fs';
import path from 'path';

type Browser = 'firefox' | 'chrome';

const watchOption = (targetBrowser: Browser): BuildOptions['watch'] =>
  watchFlag
    ? {
        onRebuild: (error, result) => {
          if (error)
            console.error(`watch build failed for ${targetBrowser}: `, error);
          else
            console.log(`watch build succeeded for ${targetBrowser}:`, result);
        },
      }
    : false;

const distDir = (targetBrowser: Browser) => {
  switch (targetBrowser) {
    case 'firefox':
      return 'dist-firefox';
    case 'chrome':
      return 'dist-chrome';
  }
};

const distPath = (relPath: string, targetBrowser: Browser) =>
  path.join(distDir(targetBrowser), relPath);

const copyStaticFile = async (file: string, targetBrowser: Browser) => {
  await fs.mkdir(distPath(path.dirname(file), targetBrowser), {
    recursive: true,
  });
  if (watchFlag) {
    chokidar.watch(file).on('all', (event, path) => {
      console.log(event, path);
      fs.copyFile(path, distPath(file, targetBrowser));
    });
  } else {
    fs.copyFile(file, distPath(file, targetBrowser));
  }
};
const copyStaticDir = async (dir: string, targetBrowser: Browser) => {
  await fs.mkdir(distPath(dir, targetBrowser), {
    recursive: true,
  });
  if (watchFlag) {
    chokidar.watch(path.join(dir, '*')).on('all', (event, filepath) => {
      console.log(event, filepath);
      fs.copyFile(
        filepath,
        distPath(path.join(dir, path.basename(filepath)), targetBrowser)
      );
    });
  } else {
    fs.cp(dir, distPath(dir, targetBrowser), { recursive: true });
  }
};

const makeManifestFile = async (targetBrowser: Browser) => {
  const baseManifestJson = JSON.parse(
    await fs.readFile('manifest.json', 'utf8')
  );
  if (targetBrowser === 'firefox') {
    const firefoxJson = JSON.parse(await fs.readFile('firefox.json', 'utf8'));
    const manifestJson = { ...baseManifestJson, ...firefoxJson };
    fs.writeFile(
      distPath('manifest.json', targetBrowser),
      JSON.stringify(manifestJson, null, 1)
    );
  } else {
    fs.copyFile('manifest.json', distPath('manifest.json', targetBrowser));
  }
};

class Builder {
  watchFlag: boolean;
  devFlag: boolean;
  chromeFlag: boolean;
  firefoxFlag: boolean;
  buildFiles: string[];
  staticFiles: string[];
  staticDirs: string[];

  constructor(option: {
    watchFlag: boolean;
    devFlag: boolean;
    chromeFlag: boolean;
    firefoxFlag: boolean;
  }) {
    this.watchFlag = option.watchFlag;
    this.devFlag = option.devFlag;
    this.chromeFlag = option.chromeFlag;
    this.firefoxFlag = option.firefoxFlag;
    this.buildFiles = [];
    this.staticFiles = [];
    this.staticDirs = [];
  }

  addBuildFile(file: string) {
    this.buildFiles.push(file);
  }

  addStaticFile(file: string) {
    this.staticFiles.push(file);
  }

  addStaticDir(dir: string) {
    this.staticDirs.push(dir);
  }

  makeManifestFileAndWatch(targetBrowser: Browser) {
    if (this.watchFlag) {
      chokidar
        .watch(['manifest.json', 'firefox.json'])
        .on('all', (event, path) => {
          console.log(event, path);
          makeManifestFile(targetBrowser);
        });
    } else {
      makeManifestFile(targetBrowser);
    }
  }

  buildForBrowser(targetBrowser: Browser) {
    this.buildFiles.forEach((file) => {
      build({
        entryPoints: [file],
        bundle: true,
        outdir: distPath(path.dirname(file), targetBrowser),
        watch: watchOption(targetBrowser),
        sourcemap: devFlag ? 'inline' : false,
      });
    });
    this.staticFiles.forEach((file) => {
      copyStaticFile(file, targetBrowser);
    });
    this.staticDirs.forEach((dir) => {
      copyStaticDir(dir, targetBrowser);
    });
    this.makeManifestFileAndWatch(targetBrowser);
  }

  build() {
    if (this.chromeFlag) {
      const browser: Browser = 'chrome';
      this.buildForBrowser(browser);
    }
    if (this.firefoxFlag) {
      const browser: Browser = 'firefox';
      this.buildForBrowser(browser);
    }
  }
}

////////////////////////

const watchFlag = process.argv.includes('--watch');
const devFlag = process.argv.includes('--dev');
const chromeFlag = process.argv.includes('--chrome');
const firefoxFlag = process.argv.includes('--firefox');

const builder = new Builder({ watchFlag, devFlag, chromeFlag, firefoxFlag });
builder.addBuildFile('popup/index.tsx');
builder.addStaticFile('popup/popup.html');
builder.addStaticDir('icons');

builder.build();

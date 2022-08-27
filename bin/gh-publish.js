#!/usr/bin/env node
const { dist, R, ROOT_DIR } = require('./paths');
const fs = require('fs-extra');

const { PrintOK, PrintError, PrintInfo } = require('./loged');

const GIT_CMD = {
  getBranch: 'git rev-parse --abbrev-ref HEAD',
  getHash: 'git rev-parse --short HEAD',
  getRemoteURL: 'git remote get-url origin',
  getRemoteBranches: 'git rev-parse --symbolic-full-name --branches dev-main',
  gitForceOverride: `git fetch --all && git reset --hard origin/dev-main && git checkout dev-main && git pull`,
};

main()
  .then(msg => PrintOK(msg))
  .catch(ex => PrintError(ex.message));

async function main() {
  const { srcDist, targetDocs, publishFile, version, buildTime } = checkEnv();
  if (!fs.existsSync(srcDist)) throw new Error('Project need build first.');

  fs.emptyDirSync(targetDocs);

  await buildProject();

  fs.copySync(srcDist, targetDocs, { overwrite: true });

  fs.ensureFileSync(publishFile);
  fs.writeFileSync(publishFile, `Version: ${version}\nBuild Time: ${buildTime}\n`, {
    encoding: 'utf8',
  });

  return `Copy success`;
}

async function buildProject() {
  const execEnvPath = process.cwd();
  let commitHash = require('child_process')
    .execSync(`cd ${execEnvPath} && ${GIT_CMD.getHash}`, {
      encoding: 'utf-8',
    })
    .toString();

  commitHash = commitHash.replace(/\r|\r\n|\n/g, '');
  PrintInfo('Commit Hash: ', commitHash);

  const buildRes = require('child_process')
    .execSync(`cd ${execEnvPath} && npm run gh-pages`, {
      encoding: 'utf-8',
    })
    .toString();

  PrintInfo('Commit Hash: ', buildRes);
}

function checkEnv() {
  const targetDocs = R(ROOT_DIR, 'docs');
  const { version } = require('../package.json');

  const { y, m, d, time } = getCurrentDateinfo();
  const buildTime = `${y}-${m}-${d} ${time}`;

  const publishFile = R(targetDocs, 'publish.txt');

  return {
    srcDist: dist,
    targetDocs,
    version,
    buildTime,
    publishFile,
  };
}

function getCurrentDateinfo() {
  const d = new Date();

  const month = d.getMonth() < 9 ? `0${d.getMonth() + 1}` : '' + (d.getMonth() + 1);
  const day = d.getDate() < 10 ? `0${d.getDate()}` : '' + d.getDate();

  const dts = parseInt(d.getTime() / 1000);

  return {
    y: d.getFullYear(),
    m: month,
    d: day,
    dts,
  };
}

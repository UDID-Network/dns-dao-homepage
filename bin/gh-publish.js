#!/usr/bin/env node
const { dist, R, ROOT_DIR } = require('./paths');
const fs = require('fs-extra');

const { PrintOK, PrintError } = require('./loged');

main()
  .then(msg => PrintOK(msg))
  .catch(ex => PrintError(ex.message));

async function main() {
  const { srcDist, targetDocs, publishFile, version, buildTime } = checkEnv();
  if (!fs.existsSync(srcDist)) throw new Error('Project need build first.');

  fs.emptyDirSync(targetDocs);
  fs.copySync(srcDist, targetDocs, { overwrite: true });

  fs.ensureFileSync(publishFile);
  fs.writeFileSync(publishFile, `Version: ${version}\nBuild Time: ${buildTime}\n`, {
    encoding: 'utf8',
  });

  return `Copy success`;
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

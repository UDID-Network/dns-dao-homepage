#!/usr/bin/env node
/*********************************************************************
 * AircraftClass :: DNS DAO Vite
 *		@description:
 *		@description:
 * WARNINGS:
 *
 * HISTORY:
 *		@author: tim.victoric@gmail.com
 *		@created:  2022-07-13
 *		@comments:
 **********************************************************************/

const fs = require('fs-extra');
const pkgJson = require('../package.json');
const { R, dist, distZip } = require('./paths');
const { PrintRun, PrintInfo, PrintOK } = require('./loged');

const archiver = require('archiver');

const BASE_VARS = {
  name: 'dns-dao',
};

main()
  .then(resp => {
    PrintOK(resp);
  })
  .catch(err => {
    console.log(err);
  });

async function main() {
  const envArgs = precheckEnv();
  const { zipFileName } = envArgs;

  const ret = await zipDist(dist, distZip, zipFileName);
  return ret;
}

async function zipDist(source, target, zipFileName) {
  const archive = archiver('zip', { zlib: { level: 9 } });

  const zipFile = R(target, `${zipFileName}.zip`);
  const stream = fs.createWriteStream(zipFile);

  return new Promise((resolve, reject) => {
    PrintRun(`Start compress ${dist} ...`);
    archive
      .directory(source, false)
      .on('error', err => reject(err))
      .pipe(stream);

    stream.on('close', () => {
      PrintInfo(`compress dir ${dist} complete.`);
      return resolve(zipFile);
    });
    archive.finalize();
  });
}

function precheckEnv() {
  const execBaseDir = process.cwd();
  let version = pkgJson.version || '1.0.0';
  const dateInfo = getCurrentDateinfo();

  const sermever = version.replaceAll('.', '');
  const commitHash = getCommitHash(execBaseDir);
  const zipFileName = `${dateInfo.m}${dateInfo.d}_${BASE_VARS.name}-${sermever}-${commitHash}`;

  const envArgs = Object.assign({}, BASE_VARS, {
    version,
    sermever,
    commitHash,
    zipFileName,
  });

  fs.ensureDirSync(distZip);

  const ret = fs.readdirSync(dist);
  if (!ret || !ret.length) {
    PrintRun('Begin build project');
    const buildOut = require('child_process')
      .execSync(`cd ${execBaseDir} && npm run build`, { encoding: 'utf-8' })
      .toString();

    PrintInfo(`Build project Success!`, buildOut);
    // throw new Error(`Dir : ${dist} is null,please use 'yarn build' first.`)
  }

  const fileExist = fs.existsSync(R(distZip, `${zipFileName}.zip`));
  console.log(fileExist);
  if (fileExist) {
    fs.removeSync(R(distZip, `${zipFileName}.zip`));
  }

  return envArgs;
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

function getCommitHash(baseDir) {
  const CMD = 'git rev-parse --short HEAD';
  let commitHash = require('child_process')
    .execSync(`cd ${baseDir} && ${CMD}`, {
      encoding: 'utf-8',
    })
    .toString();

  commitHash = commitHash.replace(/\r|\r\n|\n/g, '');
  return commitHash;
}

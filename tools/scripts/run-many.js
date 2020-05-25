const execSync = require('child_process').execSync;

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);
const isMaster = process.argv[5] === 'master';
const baseSha = isMaster ? 'master~1' : 'master';

const affected = execSync(
  `npx nx print-affected --base=${baseSha} --target=${target}`
).toString('utf-8');
const array = JSON.parse(affected).tasks.map(t => t.target.project);
array.sort();
const sliceSize = Math.floor(array.length / jobCount);
const projects =
  jobIndex < jobCount
    ? array.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
    : array.slice(sliceSize * (jobIndex - 1));

if (projects.length > 0) {
  execSync(
    `npx nx run-many --target=${target} --projects=${projects.join(
      ','
    )} --parallel ${restArgs()}`,
    {
      stdio: [0, 1, 2]
    }
  );
}

function restArgs() {
  return process.argv
    .slice(6)
    .map(a => `"${a}"`)
    .join(' ');
}

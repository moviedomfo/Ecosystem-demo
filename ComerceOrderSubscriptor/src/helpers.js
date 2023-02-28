const color = require('colors');
// export function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// export function log(message, topic, partition) {
//   return new Promise((resolve) => {
//     const f = new Date().toISOString();
//     console.log(color.blue(f + ` Received message from "${topic}" topic`));
//     console.log(color.yellow(message));
//     resolve();
//   });
// }
export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const log = (message, topic, partition) => {
  return new Promise((resolve) => {
    const f = new Date().toISOString();
    console.log(color.blue(f + ` Received message from "${topic}" topic`));
    console.log(color.yellow(message));
    resolve();
  });
};

// module.exports.log;
// module.exports.sleep;

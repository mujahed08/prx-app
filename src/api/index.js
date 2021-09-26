import PATIENT from './mock-data'

const LATENCY = 1500

export function getxPatient (cb) {
  setTimeout(() => {
    cb(PATIENT)
  }, LATENCY)
}

export function getPatient () {
    return new Promise(resolve => {
        setTimeout(() => {
          resolve({patient : PATIENT})
        }, LATENCY);
    })
}
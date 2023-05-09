import csvParser from 'csv-parser'
import fs, { mkdir, mkdirSync, rmSync, rmdirSync } from 'fs'
import generateCertificate from './pdf-kit.js'
import { assert } from 'console'
import dataJSON from '../inputs/alunos2.json' assert {type: 'json'}
import { exec } from 'child_process'

// const data = fs
//   .createReadStream('./inputs/alunos2.csv')
//   .pipe(csvParser({ delimiter: ','}))

// data.forEach(({ personName, courseName }) => {}
//   console.log('Gerando certificados para:', personName)
//   generateCertificate(personName, courseName, `${personName}_${new Date().toISOString().split('T')[0]}`)
// })

// for (const { personName, courseName } in data) {
//   console.log('Gerando certificados para:', personName)
//   generateCertificate(personName, courseName, `${personName}_${new Date().toISOString().split('T')[0]}`)
// }
// data.forEach(({ personName, courseName }) => {
//   console.log('Gerando certificados para:', personName)
//   generateCertificate(personName, courseName, :`${personName}_${new Date().toISOString().split('T')[0]}`)
// })
let city = 'Campo Grande'
let hours = 4;
let edition = 67

dataJSON.forEach(({ EventName, firstPersonName, firstPersonCourse, secondPersonName, secondPersonCourse,
thirdPersonName, thirdPersonCourse  }) => {
  const createDir = () => {
    fs.existsSync(`./certificates/${EventName}`) ? null : fs.mkdirSync(`./certificates/${EventName}`)
  }

  createDir();
  console.log('Gerando certificados para:', EventName)
  let peoplesNames = [firstPersonName, secondPersonName, thirdPersonName]
  let courses = [firstPersonCourse, secondPersonCourse, thirdPersonCourse]


  generateCertificate(peoplesNames, courses, EventName, city, hours, edition)
})


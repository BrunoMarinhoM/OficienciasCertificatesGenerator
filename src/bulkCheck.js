import csvParser from 'csv-parser'
import fs, { mkdir, mkdirSync, rmSync, rmdirSync } from 'fs'
import generateCertificate from './pdf-kit.js'
import { assert } from 'console'
import dataJSON from '../inputs/alunos2.json' assert {type: 'json'}
import { exec } from 'child_process'

let city = 'Miranda'
let hours = 48;
let edition = 66
dataJSON.forEach(({eventName}) => 
fs.existsSync(`./certificates/${eventName}/${edition}_DELETE'.pdf`) ? rmSync(`./certificates/${eventName}/${edition}_DELETE'.pdf`) : null )

import dataJSON from '../inputs/alunos2.json' assert {type: 'json'}
import csvParser from 'csv-parser'
import fs from 'fs'

fs.existsSync('toParseAndSend.csv') ? check() : createAndWrite()

function createAndWrite() {
    fs.createWriteStream('toParseAndSend.csv')
}
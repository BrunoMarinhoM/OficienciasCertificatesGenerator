import { createWriteStream, readFileSync } from 'fs'
import { resolve } from 'path'
import PDFKit from 'pdfkit'
import addTextBox from 'textbox-for-pdfkit'

/**
 * Given a person and a project, generates a certificate for them.
 * @param {Array} peoplesNames
 * @param {Array} courses
 * @param {string} city
 * @param {number} hours
 * @param {number} edition
 * 
 * @returns {void}
 */
export default function generateCertificate (peoplesNames, courses, presentation, city, hours, edition) {
  const scale = 2.5
  edition = `${edition}ª edição`
  const REGULAR_FONT = './fonts/OpenSans-Regular.ttf'
  const BOLD_FONT = './fonts/OpenSans-Bold.ttf'
  
  const config = {
    name: 'fetecms2021',
    templateWidth: 2000,
    templateHeight: 1414,
    templatePath: resolve('../templates', 'oficiencias-2022.png'),
    mainTextFontSize: 16.4 * scale,
    subTextFontSize: 14.2 * scale,
    mainText: [
      { text: 'Certificamos que' },
      { text: ' {PERSON}', font: BOLD_FONT },
      { text: ' participou da' },
      { text: ' {EDITION}' },
      { text: ' das OFICIÊNCIAS' },
      { text: ' com a oficina entitulada:'},
      { text: ' "{COURSE}"' },
      { text: ' no municipio de {CITY} durante os dias 16/06/2022 e 17/06/2022'},
      { text: ' totalizando {HOURS} horas'},
      { text: '.'},
      { text: '\n\n'},

      { text: 'As OFICIÊNCIAS são uma realização do Grupo Arandú' },
      { text: ' com apoio da Universidade Federal de Mato Grosso do Sul (UFMS) e sua' },
      { text: ' {EDITION}', },
      { text: ' ocorreu no ano de ' },
      { text: '{DATE}.'}
    ]
      

  }


for (let i = 0; i <= peoplesNames.length; i++) {

  /**
   * @param {Array<{ text: string }>} rows 
   */
   const addInfo = (rows) => {
    return rows
      ?.map(line => {
        return {
          ...line,
          text: line.text
            .replace(/\{PERSON\}/g, peoplesNames[i])
            .replace(/\{CITY}/g, city)
            .replace(/\{HOURS}/g, hours)
            .replace(/\{EDITION\}/g, edition)
            .replace(/\{COURSE\}/g, presentation)
            .replace(/\{DATE\}/g, 2022 )
        }
      })
  }
  
  const doc = new PDFKit({
    layout: 'landscape',
    size: [config.templateHeight, config.templateWidth],
    margin: 0
  })
  
  // doc.pipe(createWriteStream(`./certificates/${personName}_${new Date().toISOString()}.pdf`))
  doc.pipe(createWriteStream(`./certificates/${presentation}/${edition}_${peoplesNames[i] ?? 'DELETE'}.pdf`))
  
  const templateInBase64 = `data:image/png;base64,${readFileSync(config.templatePath, 'base64')}`
  
  doc.image(templateInBase64, {
    fit: [config.templateWidth, config.templateHeight],
    align: 'center',
  })
  
  addTextBox(addInfo(config.mainText), doc, 120, 500, 1700, {
    align: 'center',
    fontSize: config.mainTextFontSize,
    font: REGULAR_FONT,
  })

  
  doc.end()

}
}

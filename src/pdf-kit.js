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
    name: 'oficiencias-2023',
    templateWidth: 2000,
    templateHeight: 1400,
    templatePath: resolve('../templates', 'oficiencias-2023.png'),
    mainTextFontSize: 16.4 * scale,
    subTextFontSize: 14.2 * scale,
    mainText: [
      { text: 'Certificamos que' },
      { text: ' {PERSON}', font: BOLD_FONT },
      { text: ' matriculado(a) no curso {COURSE}'},
      { text: ' participou da {EDITION} das Oficiências' },
      { text: ' (Oficinas de Cultura, Tecnologia e Ciências para o ensino básico)' },
      { text: ' na cidade de {CITY}'},
      { text: ' com a oficina:' },
      { text: ' {PRESENTATION}', font: BOLD_FONT},
      { text: ' totalizando {HOURS}h.' },
      { text: '\n\n'},
      { text: 'O projeto Oficiências é uma realização do Grupo Arandú de Tecnologias e Ensino de Ciências (GATEC-UFMS)'}

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
            .replace(/\{PERSON}/g, peoplesNames[i])
            .replace(/\{COURSE}/g, courses[i])
            .replace(/\{CITY}/g, city)
            .replace(/\{HOURS}/g, hours)
            .replace(/\{EDITION}/g, edition)
            .replace(/\{PRESENTATION}/g, presentation)
            .replace(/\{DATE}/g, 2023 )
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
  
  addTextBox(addInfo(config.mainText), doc, 120, 400, 1700, {
    align: 'center',
    fontSize: config.mainTextFontSize,
    font: REGULAR_FONT,
  })

  
  doc.end()

}
}

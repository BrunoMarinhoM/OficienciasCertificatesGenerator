type TemplateData = {
  name: string;
  image: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  mainTextFontSize: number;
  subTextFontSize: number;
  font: string;
  boldFont: string;
  mainText: Array<{ text: string; font?: string }>
  subText: Array<{ text: string; font?: string }>
}

export default class Template {
  name!: string;
  image!: string;
  positionX!: number;
  positionY!: number;
  width!: number;
  height!: number;
  mainTextFontSize!: number;
  subTextFontSize!: number;
  font!: string;
  boldFont!: string;
  mainText: Array<{ text: string; font?: string }>
  subText: Array<{ text: string; font?: string }>


  constructor(params: Partial<TemplateData>) {
    this.mainText = params.mainText!
    this.subText = params.subText!
  }

  public addInformation (fields: Record<string, number | string>) {
    return this.mainText
      .map(line => {
        Object.entries(fields).forEach(([key, value]) => {
          const regex = new RegExp(`{${key}}`)
          
          line.text.replace(regex, String(value))
        })

        return {
          ...line,
          text: line.text
        }
      })
  }
}

const fetec2021 = new Template({
  mainText: [
    { text: 'Certificamos que ' },
    { text: '{PERSON}', font: '' },
    { text: ' participou da ' },
    { text: '{EDITION}' },
    { text: ' edição da FETECMS (Feira de Tecnologias, Engenharias e Ciências de Mato Grosso do Sul) como Finalista do projeto: ' },
    { text: '"{COURSE}"', font: '' },
    { text: '.' },
  ],
  subText: [
    { text: 'A FETECMS é uma realização da Universidade Federal de Mato Grosso do Sul (UFMS) e sua ' },
    { text: '{EDITION}', },
    { text: ' edição ocorreu de ' },
    { text: '{DATE}.'}
  ]
})

console.log(fetec2021.addInformation({
  PERSON: 'Diego TSuyoishi',
  EDITION: 10,
  COURSE: 'teste 2'
}))
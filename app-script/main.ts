import { SubsectionData } from "../src/components/sections/Estimation";

interface Data {
  name: string
  list: SubsectionData[]
}


let folderId: string

function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("Cálculo fotovoltaica")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0, maximum-scale=1")
    .setFaviconUrl("https://mguerrero.me/imgpublic/ico-google-m.png");
}

function createEstimate(data: Data) {
  folderId = getWorkingFolder()
  const date = new Date()
  const shortDate = `${date.getDate().toString().padStart(1)}/${(date.getMonth()+1).toString().padStart(1)}/${date.getFullYear().toString()}`
  const fileName = data.name + " " + shortDate
  let document = DocumentApp.create(fileName)
  let folder = DriveApp.getFolderById(folderId)
  folder.addFile(DriveApp.getFileById(document.getId()))

  document.getBody().insertParagraph(0, fileName)
    .setHeading(DocumentApp.ParagraphHeading.HEADING1)

  let table = document.getBody().appendTable()
  let header = table.appendTableRow()
  header.appendTableCell("Referencia")
  header.appendTableCell("Descripción")
  header.appendTableCell("Cantidad")
  header.appendTableCell("Precio unitario")
  header.appendTableCell("Subtotal")

  let productsList = data.list

  for(let i=0; i<productsList.length; i++) {
    let row = table.appendTableRow()
    productsList[i].product.forEach((product) => {
      row.appendTableCell(product.ref.toString())
      row.appendTableCell(product.description)
      row.appendTableCell(product.qt.toString())
      row.appendTableCell(product.price.toString() + " €")
      row.appendTableCell((product.price * product.qt).toString() + " €")
    })
  }

  document.getBody().appendParagraph("Made with AppScript")
  
}

function getWorkingFolder() {
  let myFolder: any
  let folders = DriveApp.getFoldersByName("APP-SOLAR")
  if (folders.hasNext()) {
    let myFolder = folders.next()
  } else {
    let myFolder = DriveApp.createFolder("APP-SOLAR")
  }
  return myFolder.getId()

}
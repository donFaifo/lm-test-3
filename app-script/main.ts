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
  const shortDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2, "0")}/${date.getFullYear().toString()}`
  const fileName = data.name + " " + shortDate
  let document = DocumentApp.create(fileName)
  let folder = DriveApp.getFolderById(folderId)
  folder.addFile(DriveApp.getFileById(document.getId()))

  let headingStyle = {}

  headingStyle[DocumentApp.Attribute.FONT_FAMILY] = "Leroy Merlin Sans"
  headingStyle[DocumentApp.Attribute.BOLD] = true

  let rowHeadingStyle = {}

  rowHeadingStyle[DocumentApp.Attribute.FONT_FAMILY] = "Leroy Merlin Sans"
  rowHeadingStyle[DocumentApp.Attribute.BOLD] = true
  rowHeadingStyle[DocumentApp.Attribute.FONT_SIZE] = 10

  let rowStyle = {}

  rowStyle[DocumentApp.Attribute.FONT_FAMILY] = "Leroy Merlin Sans"
  rowStyle[DocumentApp.Attribute.BOLD] = false
  rowStyle[DocumentApp.Attribute.FONT_SIZE] = 10

  let normalStyle = {}

  normalStyle[DocumentApp.Attribute.FONT_FAMILY] = "Leroy Merlin Sans"
  normalStyle[DocumentApp.Attribute.BOLD] = false
  normalStyle[DocumentApp.Attribute.FONT_SIZE] = 11


  document.getBody().insertParagraph(0, fileName)
    .setHeading(DocumentApp.ParagraphHeading.HEADING1)
    .setAttributes(headingStyle)

  let table = document.getBody().appendTable()
  let header = table.appendTableRow()
  header.appendTableCell("Ref.")
  header.appendTableCell("Descripción")
  header.appendTableCell("Cant.")
  header.appendTableCell("Precio u.")
  header.appendTableCell("Subtotal")
  header.setAttributes(headingStyle)

  let productsList = data.list
  let total = 0

  for(let i=0; i<productsList.length; i++) {
    productsList[i].product.forEach((product) => {
      let row = table.appendTableRow()
      let subtotal = product.price * product.qt
      total += subtotal
      row.appendTableCell(product.ref.toString()).setWidth(66)
      row.appendTableCell(product.description).setWidth(200)
      row.appendTableCell(product.qt.toString()).setWidth(54)
      row.appendTableCell(product.price.toString() + " €").setWidth(66)
      row.appendTableCell(subtotal.toString() + " €")
      row.setAttributes(rowStyle)
    })
  }

  document.getBody().appendParagraph("TOTAL: " + total.toString())
    .setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setAttributes(headingStyle)

  document.getBody().appendParagraph("Made with AppScript")
    .setAttributes(normalStyle)
  
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
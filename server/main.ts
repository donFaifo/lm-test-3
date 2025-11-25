import { Article } from "../src/components/sections/EstimationComponents/EstimationListComponents/Subsection";

interface Data {
  name: string;
  mail: string;
  send: boolean;
  list: Article[];
}

export interface PanelData {
  ref: string;
  description: string;
  power: number;
  voltage: number;
  height: number;
  width: number;
  type: string;
  price: number;
}

export interface BatteryData {
  ref: string;
  description: string;
  capacity: number;
  voltage: number;
  type: string;
  price: number;
}

export interface ControllerData {
  ref: string;
  description: string;
  amperage: number;
  voltage: number;
  price: number;
}

export interface InverterData {
  ref: string;
  description: string;
  power: number;
  amperage: number;
  voltage: number;
  waveType: 'Modificada' | 'Pura' | 'Indeterminada';
  price: number;
}

export interface StructureData {
  ref: string;
  description: string;
  nPanels: number;
  roofType: 'Inclinada' | 'Plana' | 'Vertical' | '';
  material: string;
  panelPowerRange: string;
  panelMaxHeight: number;
  panelMaxWidth: number;
  price: number;
}

export interface CableData {
  ref: string;
  description: string;
  section: number;
  length: number;
  price: number;
}

/**
 * Código del lado del servidor.
 * Este código debe subirse tal cual a la aplicación de Google App Script. Se encarga de las siguientes funciones:
 * - Conectar con el archivo de hoja de cálculo de base de datos
 * - Crear carpeta APP-SOLAR, si no existe, en el directorio de drive del usuario para guardar presupuestos
 * - Generar documento con presupuesto
 * - Iniciar aplicación a través del método doGet
 */
let folderId: string;

// Id del archivo de hoja de cálculo de Google con los datos de los artículos para el presupuesto.
const databaseId: string = '1_C-u2zp3xFLaclqZr820ZOaQU6Lyv78FhqC8PI8jiis';

function doGet() {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("Cálculo fotovoltaica")
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0, maximum-scale=1")
    .setFaviconUrl("https://mguerrero.me/imgpublic/appsolar-ico.png");
}

/**
 * Crea un presupuesto en formato 'documento de Google'. Recibe un objeto con los siguientes campos:
 * - name: Nombre del usuario
 * - list: Lista de productos
 * - send: booleano
 * - mail: dirección de correo electrónico para el envío
 * @param {object} data 
 */
function createEstimate(data: Data) {
  folderId = getWorkingFolder();
  const date = new Date();
  const shortDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth()+1).toString().padStart(2, "0")}/${date.getFullYear().toString()}`;
  const fileName = data.name + " " + shortDate;
  let document = DocumentApp.create(fileName);
  const documentId = document.getId();
  let folder = DriveApp.getFolderById(folderId);
  folder.addFile(DriveApp.getFileById(document.getId()));

  let headingStyle = {};

  headingStyle[DocumentApp.Attribute.FONT_FAMILY] = "Leroy Merlin Sans";
  headingStyle[DocumentApp.Attribute.BOLD] = true;

  let rowHeadingStyle = {};

  rowHeadingStyle[DocumentApp.Attribute.FONT_FAMILY] = "Leroy Merlin Sans";
  rowHeadingStyle[DocumentApp.Attribute.BOLD] = true;
  rowHeadingStyle[DocumentApp.Attribute.FONT_SIZE] = 10;

  let rowStyle = {};

  rowStyle[DocumentApp.Attribute.FONT_FAMILY] = "Leroy Merlin Sans";
  rowStyle[DocumentApp.Attribute.BOLD] = false;
  rowStyle[DocumentApp.Attribute.FONT_SIZE] = 10;

  let normalStyle = {};

  normalStyle[DocumentApp.Attribute.FONT_FAMILY] = "Leroy Merlin Sans";
  normalStyle[DocumentApp.Attribute.BOLD] = false;
  normalStyle[DocumentApp.Attribute.FONT_SIZE] = 11;


  document.getBody().insertParagraph(0, `Presupuesto fotovoltaica Leroy Merlin\n${fileName}`)
    .setHeading(DocumentApp.ParagraphHeading.HEADING1)
    .setAttributes(headingStyle);

  let table = document.getBody().appendTable();
  let header = table.appendTableRow();
  header.appendTableCell("Ref.");
  header.appendTableCell("Descripción");
  header.appendTableCell("Cant.");
  header.appendTableCell("Precio u.");
  header.appendTableCell("Subtotal");
  header.setAttributes(headingStyle);

  let productsList = data.list;
  Logger.log(productsList);
  let total = 0;

  
  productsList.forEach((product) => {
    let row = table.appendTableRow()
    let subtotal = product.price * product.qt
    total += subtotal
    row.appendTableCell(product.ref.toString()).setWidth(66)
    row.appendTableCell(product.description).setWidth(200)
    row.appendTableCell(product.qt.toString()).setWidth(54)
    row.appendTableCell(product.price.toString() + " €").setWidth(66)
    row.appendTableCell(subtotal.toString() + " €")
    row.setAttributes(rowStyle)
  });

  document.getBody().appendParagraph("TOTAL: " + total.toString() + " €")
    .setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setAttributes(headingStyle);

  document.getBody().appendParagraph("\n\nEste presupuesto es orientativo y no puede ser considerado como un presupuesto formal. Los precios pueden variar en el momento de realizar el presupuesto en firme con la visita de un técnico cualificado.\nPara más detalles, consulte al vendedor.")
    .setAttributes(normalStyle);
  
  document.saveAndClose();

  if(data.send) {  
    const doc = document.getAs("application/pdf");
    
    GmailApp.sendEmail(data.mail, "Presupuesto Fotovoltaica Leroy Merlin", "Adjunto su presupuesto", {
      attachments: [doc]
    });
  }
}

/**
 * Devuelve la cadena con el Id del directorio APP-SOLAR. Si no existe el directorio, lo crea.
 * @returns string
 */
function getWorkingFolder() {
  let myFolder: any
  let folders = DriveApp.getFoldersByName("APP-SOLAR")
  if (folders.hasNext()) {
    myFolder = folders.next()
  } else {
    myFolder = DriveApp.createFolder("APP-SOLAR")
  }
  return myFolder.getId()

}

/**
 * Devuelve los datos de los paneles solares obtenidos de la hoja de cálculo.
 * @returns object
 */
function getPanelsData(): PanelData[] {
  const panelsSheet = SpreadsheetApp.openById(databaseId).getSheetByName('Paneles');
  const data = panelsSheet.getDataRange().getValues();
  let panelsData: PanelData[] = [];

  for(let i=1; i<data.length; i++) {
    panelsData.push({
      ref: data[i][0],
      description: data[i][1],
      power: data[i][2],
      voltage: data[i][3],
      height: data[i][4],
      width: data[i][5],
      type: data[i][6],
      price: data[i][7],  
    })
  }
  return panelsData;
}

/**
 * Devuelve los datos de las baterías obtenidos de la hoja de cálculo.
 * @returns object
 */
function getBatteriesData(): BatteryData[] {
  const batteriesSheet = SpreadsheetApp.openById(databaseId).getSheetByName('Baterías');
  const data = batteriesSheet.getDataRange().getValues();
  let batteriesData: BatteryData[] = [];

  for(let i=1; i<data.length; i++) {
    batteriesData.push({
      ref: data[i][0],
      description: data[i][1],
      capacity: data[i][2],
      voltage: data[i][3],
      type: data[i][4],
      price: data[i][5],  
    })
  }
  return batteriesData;
}

/**
 * Devuelve los datos de los controladores obtenidos de la hoja de cálculo.
 * @returns object
 */
function getControllersData(): ControllerData[] {
  const controllersSheet = SpreadsheetApp.openById(databaseId).getSheetByName('Controladores');
  const data = controllersSheet.getDataRange().getValues();
  let controllersData: ControllerData[] = [];

  for(let i=1; i<data.length; i++) {
    controllersData.push({
      ref: data[i][0],
      description: data[i][1],
      amperage: data[i][2],
      voltage: data[i][3],
      price: data[i][4],  
    })
  }
  return controllersData;
}

/**
 * Devuelve los datos de los inversores obtenidos de la hoja de cálculo.
 * @returns object
 */
function getInverterData(): InverterData[] {
  const invertersSheet = SpreadsheetApp.openById(databaseId).getSheetByName('Inversores');
  const data = invertersSheet.getDataRange().getValues();
  let invertersData: InverterData[] = [];

  for(let i=1; i<data.length; i++) {
    invertersData.push({
      ref: data[i][0],
      description: data[i][1],
      power: data[i][2],
      amperage: data[i][3],
      voltage: data[i][4],
      waveType: data[i][5],
      price: data[i][6], 
    })
  }
  return invertersData;
}

/**
 * Devuelve los datos de las estructuras para paneles obtenidos de la hoja de cálculo.
 * @returns object
 */
function getStructuresData(): StructureData[] {
  const structuresSheet = SpreadsheetApp.openById(databaseId).getSheetByName('Estructuras');
  const data = structuresSheet.getDataRange().getValues();
  let structuresData: StructureData[] = [];

  for(let i=1; i<data.length; i++) {
    structuresData.push({
      ref: data[i][0],
      description: data[i][1],
      nPanels: data[i][2],
      roofType: data[i][3],
      material: data[i][4],
      panelPowerRange: data[i][5],
      panelMaxHeight: data[i][6],
      panelMaxWidth: data[i][7],
      price: data[i][8], 
    })
  }
  return structuresData;
}

/**
 * Devuelve los datos de los distintos tipos de cableados obtenidos de la hoja de cálculo.
 * @returns object
 */
function getCablesData(): CableData[] {
  const structuresSheet = SpreadsheetApp.openById(databaseId).getSheetByName('Cables');
  const data = structuresSheet.getDataRange().getValues();
  let cablesData: CableData[] = [];

  for(let i=1; i<data.length; i++) {
    cablesData.push({
      ref: data[i][0],
      description: data[i][1],
      section: data[i][2],
      length: data[i][3],
      price: data[i][4], 
    })
  }
  return cablesData;
}
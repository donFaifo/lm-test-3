import { BatteryData, CableData, ControllerData, InverterData, PanelData, StructureData } from "../../../../app-script/main";

export const _panelsList: PanelData[] = [
  {
    ref: '12345678',
    description: 'Panel solar Xunzel Monocristalino 60x60',
    power: 60,
    voltage: 12,
    height: 150,
    width: 80,
    type: 'monocristalino',
    price: 70,
  },
];

export const _batteriesList: BatteryData[] = [
  {
    ref: '23456789',
    description: 'Batería AGM',
    capacity: 60,
    voltage: 12,
    type: 'agm',
    price: 70,
  },
];

export const _controllersList: ControllerData[] = [
  {
    ref: '34567890',
    description: 'Controlador de carga con USB',
    amperage: 5,
    voltage: 12,
    price: 24.95,
  },
];

export const _invertersList: InverterData[] = [
  {
    ref: '45678901',
    description: 'Inversor Xunzel 24x32',
    amperage: 5,
    power: 500,
    waveType: 'Modificada',
    voltage: 12,
    price: 24.95,
  },
];

export const _structuresList: StructureData[] = [
  {
    ref: '56789012',
    description: 'Estructura para paneles solares cubierta plana',
    nPanels: 1,
    roofType: 'Inclinada',
    material: 'Teja',
    panelPowerRange: '120-350',
    panelMaxHeight: 200,
    panelMaxWidth: 100,
    price: 120
  },
];

export const _wiringList: CableData[] = [
  {
    ref: '67891234',
    description: 'Cable solar rojo',
    section: 10,
    length: 100,
    price: 100,
  },
];
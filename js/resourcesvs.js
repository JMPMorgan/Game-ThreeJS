export const objects = [
  {
    url: "../assets/models/Lvl1/Escenario_Lvl1.glb",
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    name: "level_1",
    isObj: false,
  },
  {
    url: "/assets/models/Camion/",
    objFile: "camion.obj",
    mtlFile: "camion.mtl",
    scale: {
      x: 0.25,
      y: 0.25,
      z: 0.25,
    },
    position: {
      x: 1.5,
      y: 0,
      z: 10,
    },
    name: "camion",
    isObj: true,
  },
  {
    url: "/assets/models/Camion/",
    objFile: "camion.obj",
    mtlFile: "camion.mtl",
    scale: {
      x: 0.25,
      y: 0.25,
      z: 0.25,
    },
    position: {
      x: 5.5,
      y: 0,
      z: 10,
    },
    name: "camion2",
    isObj: true,
  },
  {
    url: "/assets/models/Barricada/",
    objFile: "barricada.obj",
    mtlFile: "barricada.mtl",
    scale: {
      x: 0.25,
      y: 0.25,
      z: 0.25,
    },
    position: {
      x: -0.5,
      y: 0,
      z: 8,
    },
    rotation: 1.5708,
    isCollapse: true,
    name: "barricada_",
    isObj: true,
    quantity: 119,
    copyInX: true,
    distanceToCopy: {
      x: 10.75,
      y: 0,
      z: 0,
    },
  },
];

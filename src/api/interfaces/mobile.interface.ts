//interface siempre ; para definir la estructura
export interface Mobile {
  id?: number;
  model: string;
  price: number;
  screenSize: number;
  ram: number;
  cpu: {
    cores: number;
    processorFrequency: string;
    gpuName: string
  };
}
// id? --> parámetro opcional
//el server lo genera. así evitamos que el usuario lo tenga que poner si o si.


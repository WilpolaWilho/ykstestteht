import { describe, test, expect } from 'vitest';
import Ravintola from '../ravintola2.js';

describe('päivitetyn ravintolan testaus osa 1', () => {
  test('syoRavintolassa-funktio toimii oikein kun asiakkaiden määrä on sallittu', () => {
    const maara = 5;
    const tilaukset = Ravintola.syoRavintolassa(maara);
    expect(tilaukset.length).toBe(maara);
  });
});

describe('päivitetyn ravintolan testaus osa 2', () => {
  test('syoRavintolassa-funktio toimmii oikein kun asiakkaiden määrä ylittää sallitun rajan', () => {
    const ekaTilaus = Ravintola.syoRavintolassa(10);
    expect(ekaTilaus).toHaveLength(10);

    // Vapaita paikkoja on jäljellä 5, joten 6 asiakkaan varaus ei mene läpi
    expect(() => Ravintola.syoRavintolassa(6)).toThrow();
  });
});

describe('päivitetyn ravintolan testaus osa 3', () => {
  test('laskeLasku-funktio toimii oikein päivitetyssä koodissa', () => {
    const ottiAlkuruoan = true;
    const ottiJalkiruoan = false;
    const ottiJuoman = true;
    const lasku = Ravintola.laskeLasku(
      ottiAlkuruoan,
      ottiJalkiruoan,
      ottiJuoman,
    );
    expect(lasku).toBe(13);
  });
});

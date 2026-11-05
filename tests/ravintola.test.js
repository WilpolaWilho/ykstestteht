import { describe, test, expect } from 'vitest';
import Ravintola from '../ravintola.js';

describe('ravintolan testaus osa 1.1', () => {
  test('funktioiden palautusten tulisi olla oikeanlaiset', () => {
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

describe('ravintolan testaus osa 1.2', () => {
  test('funktion palautuarvon tulisi löytyä taulukosta', () => {
    const alkuruoat = Ravintola.alkuruoat;
    const satunnainenArvo = Ravintola.palautaTaulukonSatunnainenArvo(alkuruoat);
    expect(alkuruoat.includes(satunnainenArvo)).toBe(true);
  });
});

describe('ravintolan testaus osa 1.3', () => {
  test('funktion tulee palauttaa oikeantyyppinen arvo', () => {
    const syoRavintolassa = Ravintola.syoRavintolassa(5);
    expect(typeof syoRavintolassa).toBe('object');
  });
});

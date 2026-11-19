/*
TIKO RAVINTOLA
OHJELMAKOODI (PÄIVITETTY)
*/

const Ravintola = function () {
  this.alkuruoat = [
    { ruoka: 'Tomaattikeitto', hinta: 4 },
    { ruoka: 'Leipä', hinta: 2 },
    { ruoka: 'Vihersalaatti', hinta: 5 },
    { ruoka: 'Salsa', hinta: 3 },
  ];
  this.paaruoat = [
    { ruoka: 'Kalakeitto', hinta: 8 },
    { ruoka: 'Makaroonilaatikko', hinta: 7 },
    { ruoka: 'Kasvispihvi', hinta: 9 },
    { ruoka: 'Kanasalaatti', hinta: 8 },
  ];
  this.jalkiruoat = [
    { ruoka: 'Hedelmäsalaatti', hinta: 5 },
    { ruoka: 'Jäätelö', hinta: 4 },
    { ruoka: 'Pulla', hinta: 3 },
    { ruoka: 'Donitsi', hinta: 3 },
  ];
  this.juomat = [
    { ruoka: 'Tee', hinta: 2 },
    { ruoka: 'Kahvi', hinta: 2.5 },
    { ruoka: 'Maito', hinta: 1.5 },
    { ruoka: 'Mehu', hinta: 2 },
  ];
  this.paikkojenMaara = 15;
  this.paikat = null; // Tähän muuttujaan paikkojen taulukko
};

/**
 * Palauttaa satunnaisen boolean arvon
 * @return {boolean} Randomized boolean
 */
function generoiBoolean() {
  return Math.random() < 0.5;
}

/**
 * Jos 'asiakkaidenMaara' on pienempi tai yhtäsuuri kuin 'paikkojenMaara', luo taulukon 'tilaukset'
 * johon tallennetaan yksittäisen asiakkaan tilaus. Varaa paikat ja kutsuu tilaaAteria-funktiota.
 *
 * @param {number} asiakkaidenMaara
 * @return {object[]|undefined} object array tai undefined
 */
Ravintola.prototype.syoRavintolassa = function (asiakkaidenMaara) {
  const onTilaa = this.tarkistaPaikkojenMaara(asiakkaidenMaara);
  if (!onTilaa) {
    throw new Error('Ei riittävästi vapaita paikkoja ravintolassa.');
  }

  const varattu = this.varaaPaikat(asiakkaidenMaara);
  if (!varattu) {
    throw new Error('Paikkojen varaaminen epäonnistui.');
  }

  const tilaukset = [];

  for (let i = 0; i < asiakkaidenMaara; i++) {
    console.log('-------------------------------------------------------');
    console.log(
      'Tarjoillaan asiakasta numero ' + (i + 1) + '. Mitä teille saisi olla?',
    );
    tilaukset.push(
      this.tilaaAteria(generoiBoolean(), generoiBoolean(), generoiBoolean()),
    );
    console.log('Asiakkaalle tarjoiltu. Hyvää ruokahalua!');
  }
  console.log('-------------------------------------------------------');
  console.log('Kaikille asiakkaille tarjoiltu!');

  return tilaukset;
};

/**
 * Tarkistaa, että 'asiakkaidenMaara' on suurempi kuin 0, mutta pienempi tai yhtäsuuri kuin 'paikkojenMaara'.
 * Kirjoittaa konsoliin tulosteen tilanteesta, ja palauttaa onnistumisen boolean arvona.
 * Jos 'asiakkaidenMaara' ei ole numero, heittää TypeErrorin.
 *
 * @param {number} asiakkaidenMaara
 * @return {boolean} Onnistuminen
 */
Ravintola.prototype.tarkistaPaikkojenMaara = function (asiakkaidenMaara) {
  if (typeof asiakkaidenMaara !== 'number') {
    throw new TypeError();
  }
  if (asiakkaidenMaara <= 0) {
    console.log(
      'Ikävä kyllä emme voi tarjoilla ' + asiakkaidenMaara + ' asiakkaalle.',
    );
    return false;
  } else if (asiakkaidenMaara <= this.paikkojenMaara) {
    console.log(
      'Tilaa on ' +
        asiakkaidenMaara +
        ' asiakkaalle. Tervetuloa ravintolaamme!',
    );
    return true;
  } else {
    console.log(
      'Ikävä kyllä ravintolaamme ei mahdu ' + asiakkaidenMaara + ' asiakasta.',
    );
    return false;
  }
};

/**
 * Luo Ravintolan paikat-muuttujaan uuden taulukon, jonka koko määräytyy paikkojenMaara-muuttujan mukaisesti,
 * ja täyttää taulukon boolean arvolla false.
 */
Ravintola.prototype.generoiPaikat = function () {
  this.paikat = new Array(this.paikkojenMaara).fill(false);
};

/**
 * Tarkistaa ja varaa paikkoja ravintolasta.
 *
 * @param {number} [varauksenMaara=1] - Varattavien paikkojen määrä
 * @return {boolean} Onnistuiko varaus
 */
Ravintola.prototype.varaaPaikat = function (varauksenMaara) {
  if (!Array.isArray(this.paikat)) {
    this.generoiPaikat();
  }

  if (varauksenMaara === undefined) {
    varauksenMaara = 1;
  }

  const vapaatPaikat = this.paikat.filter((paikka) => paikka === false).length;

  if (vapaatPaikat < varauksenMaara) {
    return false;
  }

  let varattuja = 0;
  for (let i = 0; i < this.paikat.length && varattuja < varauksenMaara; i++) {
    if (this.paikat[i] === false) {
      this.paikat[i] = true;
      varattuja++;
    }
  }

  return true;
};

/**
 * Ottaa parametreina 3 boolean arvoa, joiden avulla määritellään mitä ruokia asiakas tilaa.
 * Jos parametrit eivät ole tyyppiä boolean, heitetään TypeError.
 * Tilaukset tallennetaan 'ruoat' taulukkoon objektien mukaisesti.
 *
 * @param {boolean} ottaaAlkuruoan
 * @param {boolean} ottaaJalkiruoan
 * @param {boolean} ottaaJuoman
 * @return {object} object - number, object[]
 */
Ravintola.prototype.tilaaAteria = function (
  ottaaAlkuruoan,
  ottaaJalkiruoan,
  ottaaJuoman,
) {
  if (
    typeof ottaaAlkuruoan !== 'boolean' ||
    typeof ottaaJalkiruoan !== 'boolean' ||
    typeof ottaaJuoman !== 'boolean'
  ) {
    throw new TypeError();
  }

  const ruoat = [];
  let ruokaObj;

  if (ottaaAlkuruoan) {
    ruokaObj = this.palautaTaulukonSatunnainenArvo(this.alkuruoat);
    console.log(
      'Ottaisin alkuruoaksi: ' + ruokaObj.ruoka + ' (' + ruokaObj.hinta + ' €)',
    );
    ruoat.push(ruokaObj);
  }

  ruokaObj = this.palautaTaulukonSatunnainenArvo(this.paaruoat);
  console.log(
    'Ottaisin pääruoaksi: ' + ruokaObj.ruoka + ' (' + ruokaObj.hinta + ' €)',
  );
  ruoat.push(ruokaObj);

  if (ottaaJalkiruoan) {
    ruokaObj = this.palautaTaulukonSatunnainenArvo(this.jalkiruoat);
    console.log(
      'Ottaisin jälkiruoaksi: ' +
        ruokaObj.ruoka +
        ' (' +
        ruokaObj.hinta +
        ' €)',
    );
    ruoat.push(ruokaObj);
  }

  if (ottaaJuoman) {
    ruokaObj = this.palautaTaulukonSatunnainenArvo(this.juomat);
    console.log(
      'Ottaisin juomaksi: ' + ruokaObj.ruoka + ' (' + ruokaObj.hinta + ' €)',
    );
    ruoat.push(ruokaObj);
  }

  const summa = this.laskeLasku(ruoat);

  return { summa, ruoat };
};

/**
 * Palauttaa satunnaisen arvon annetusta taulukosta
 *
 * @param {object[]} taulukko
 * @return {object}
 */
Ravintola.prototype.palautaTaulukonSatunnainenArvo = function (taulukko) {
  return taulukko[Math.floor(Math.random() * taulukko.length)];
};

/**
 * Laskee tilattujen ruokien kokonaissumman ruoka-olioiden hintojen perusteella.
 * Jos parametri ei ole taulukko, heittää TypeErrorin.
 *
 * @param {object[]} ruoat - Asiakkaan tilaamat ruoka-oliot
 * @return {number} Laskun loppusumma
 */
Ravintola.prototype.laskeLasku = function (ruoat) {
  if (!Array.isArray(ruoat)) {
    throw new TypeError();
  }

  let loppuSumma = 0;

  for (let i = 0; i < ruoat.length; i++) {
    loppuSumma += ruoat[i].hinta;
  }

  return loppuSumma;
};

const ravintola = new Ravintola();

export default ravintola;

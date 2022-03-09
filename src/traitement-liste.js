export function specialChar(liste) {
  const listeFiltre = liste.filter((word) => !word.mot.includes("'"));
  for (const word of listeFiltre) {
    word.mot = word.mot.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  return listeFiltre;
}

export function listeType(liste) {
  let type = [];
  liste.forEach((element) => {
    type.includes(element.type) ? "" : type.push(element.type);
  });
  return type;
}

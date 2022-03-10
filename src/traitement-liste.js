export function specialChar(liste) {
  const listeFiltre = liste.filter((word) => !word.mot.includes("'"));
  return listeFiltre;
}

export function listeType(liste) {
  let type = [];
  liste.forEach((element) => {
    type.includes(element.type) ? "" : type.push(element.type);
  });
  return type.sort();
}

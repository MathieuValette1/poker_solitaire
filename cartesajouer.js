// tableau contenant les 52 cartes d'un jeu
const jeu = [
  "01_carreau",
  "02_carreau",
  "03_carreau",
  "04_carreau",
  "05_carreau",
  "06_carreau",
  "07_carreau",
  "08_carreau",
  "09_carreau",
  "10_carreau",
  "11_carreau",
  "12_carreau",
  "13_carreau",
  "01_coeur",
  "02_coeur",
  "03_coeur",
  "04_coeur",
  "05_coeur",
  "06_coeur",
  "07_coeur",
  "08_coeur",
  "09_coeur",
  "10_coeur",
  "11_coeur",
  "12_coeur",
  "13_coeur",
  "01_pique",
  "02_pique",
  "03_pique",
  "04_pique",
  "05_pique",
  "06_pique",
  "07_pique",
  "08_pique",
  "09_pique",
  "10_pique",
  "11_pique",
  "12_pique",
  "13_pique",
  "01_trefle",
  "02_trefle",
  "03_trefle",
  "04_trefle",
  "05_trefle",
  "06_trefle",
  "07_trefle",
  "08_trefle",
  "09_trefle",
  "10_trefle",
  "11_trefle",
  "12_trefle",
  "13_trefle"
];

var coordonnees = [];
var cartes_a_modifier = [["nom", 0]];
var cartes_a_remodifier = [["nom", 0]];
var carte_ajoutee = []
var carte_affichee = [];
var carte_retournee = []
const chemin_vers_cartes = "theme/cartes/"
function ajouterCarte(nom){
  let new_carte = document.createElement("img");
  new_carte.id = nom;
  new_carte.src = chemin_vers_cartes + nom +".gif"
  new_carte.alt = nom
  //document.getElementById("cartes").appendChild(carte);
  carte_ajoutee.push(nom);
  carte_affichee.push(nom);
  console.log(new_carte, " a été créée" );
  return new_carte;
}

/**                                             DISTRIBUTION DES CARTES */
function retournerCarteVerso(nom){
  if (etape == "second_tirage"){
    if(carte_ajoutee.includes(nom)){
      
      let carte_a_tourner = document.getElementById(nom);
      let verso = document.createElement("img");
      verso.id = nom+"_verso";
      verso.src = chemin_vers_cartes +"verso.gif";
      verso.alt = nom +"_verso";
      //console.log(carte_a_tourner, " va être retournée");
      
      for (let i =0; i<5; i++){
        if(document.getElementById("cartes").children[i].id == nom){
          let indice = i
          document.getElementById("cartes").replaceChild(verso, document.getElementById("cartes").children[indice]);
        }
      }
      if (!carte_retournee.includes(nom)){
        carte_retournee.push(nom);
        console.log("carte retournée: ", carte_retournee);
      }
      if (!cartes_a_modifier.includes(nom)){
        cartes_a_modifier.push(nom+"_verso");
      }
      //console.log("Carte",nom," retournée au verso");
      retirer_de_la_liste(carte_affichee, nom);
    }
  }
}

function retournerCarteRecto(nom){
  let face = nom.split('_')[0]+'_'+nom.split('_')[1];
  console.log(face);
  if (etape == "second_tirage"){
    if(carte_retournee.includes(face)){
      let verso = document.getElementById(face+"_verso");
      let de_carte = document.createElement("img");
      de_carte.id = face;
      de_carte.src = chemin_vers_cartes + face +".gif"
      de_carte.alt = face;
      document.getElementById("cartes").replaceChild(de_carte, verso);
      //console.log("Carte retournée au recto");
      retirer_de_la_liste(carte_retournee, face);
      retirer_de_la_liste(cartes_a_modifier, face);
      retirer_de_la_liste(cartes_a_remodifier, nom);
      carte_affichee.push(face);
    }
  }
}

function retirer_de_la_liste(liste, nom){
  liste.forEach(function(item, index, array){
    if (nom == item){
      liste.splice(index, 1);
    }
  });
}

function carteHasard(jeu){
  let indice = Math.round(Math.random()*(jeu.length-1));
  return jeu[indice];
}

function afficherCarte(jeu){
  
  let nom = carteHasard(jeu);
  let afficher = false;
  while (!afficher){
    if (!verifierCarteDejaChoisie(nom)){
      let carte = document.createElement("img");
      carte.id = nom;
      carte.src = chemin_vers_cartes + nom +".gif";
      carte.alt = nom;
      document.getElementById("cartes").appendChild(carte);
      carte_ajoutee.push(nom);
      carte_affichee.push(nom);
      console.log("Carte tirée!")
      afficher = true;
    }
  }
}

function afficherNCartes(n, jeu){
  for(let i = 0; i<n; i++){
    //console.log(i);
    afficherCarte(jeu);
  }
}

function verifierCarteDejaChoisie(nom){
  let choisie = false;
  carte_ajoutee.forEach(function(item, index, array){
    if (nom == item){
      choisie = true;
    }
  });
  return choisie;
}

/**                                         VERIFICATION DES COMBINAISONS */


function mainIsQuinteFlush(){
  let text_victoire = "";
  if (etape == "second_tirage"){
    let mainIsQuinteFlush = false;
    if (mainIsCouleur()[0] && mainIsQuinte()[0]){
      console.log("Vous avez une Quinte Flush!!! C'est la main la plus forte!!!")
      text_victoire = "Vous avez une Quinte Flush!!! C'est la main la plus forte!!!"
      mainIsQuinteFlush = true;
    }
    console.log("La main est une quinte flush: ", mainIsQuinteFlush);
    return [mainIsQuinteFlush, text_victoire];
  }
}

function mainIsCarre(){
  let text_victoire = "";
  /**On pourrait améliorer à l'aide des fonctions paires et double paire mais flemme */
  if (etape=="second_tirage"){
    let isCarre = false;
    let premier = carte_affichee[0][0]+carte_affichee[0][1];
    let deuxieme = carte_affichee[1][0]+carte_affichee[1][1];
    let troisieme = carte_affichee[2][0]+carte_affichee[2][1];
    let quatrieme = carte_affichee[3][0]+carte_affichee[3][1];
    let cinquieme = carte_affichee[4][0]+carte_affichee[4][1];
    if ((premier == deuxieme == troisieme == quatrieme)
      || (premier == deuxieme == troisieme == cinquieme)
      || (premier == deuxieme == quatrieme == cinquieme)
      || (premier == troisieme == quatrieme == cinquieme)
      || (deuxieme == troisieme == quatrieme == cinquieme)){
        isCarre = true;
        text_victoire = "Vous avez un Carré! C'est la 2eme main la plus forte!";
      }
    console.log("La main est un carré: ", isCarre);
    return [isCarre, text_victoire];
  }
}
function mainIsFull(){
  let text_victoire = "";
  let isFull = false;
  if (etape=="second_tirage"){

    if (mainIsBrelan()[0]){
      let premier = mainIsPaire()[2][0];
      if (mainIsDoublePaire()[0]){
        let deuxieme = mainIsPaire()[2][1];
        isFull = true;
        text_victoire = "Vous avez un Full! C'est la 3eme main la plus forte!";
      }
    }
    console.log("La main est un Full: ", isFull);
    return [isFull, text_victoire];
  }
}

function mainIsCouleur(){
  let text_victoire = "";
  let isCouleur = true;
  let couleur = carte_affichee[0][3]+carte_affichee[0][4]
  carte_affichee.forEach(function(item, index, array){
    if (couleur != carte_affichee[index][3]+carte_affichee[index][4]){
      isCouleur = false;
    }
  });
  if (isCouleur){
    text_victoire = "Vous avez une Couleur! C'est la 4ème main la plus forte!";
  }
  console.log("La main est une couleur: ", isCouleur);
  return [isCouleur, text_victoire];
}

function mainIsQuinte(){
  let text_victoire = "";
  let nombres = [];
  let isQuinte = true;
  carte_affichee.forEach(function(item, index, array){
    let nombre_a_ajouter = parseFloat(carte_affichee[index][0]+carte_affichee[index][1]);
    nombres.push(nombre_a_ajouter);
  });
  //console.log(nombres);
  const byValue = (a,b) => a - b;
  nombres.sort(byValue);
  //console.log(nombres);
  for (let i =0; i<nombres.length-1; i++){
    if (nombres[i]+1!=nombres[i+1]){
      isQuinte= false;
    }
  }
  if (isQuinte){
    text_victoire = "Vous avez une Quinte! C'est la 5ème main la plus forte!";
  }
  console.log("La main est une quinte: ", isQuinte);
  return [isQuinte, text_victoire];
}

function mainIsBrelan(){
  let text_victoire = "";
  let isBrelan = false;
  if (mainIsPaire()[0][0]){
    let premier = mainIsPaire()[2][0];
    let compteur = 0;
    for(let i =0; i<carte_affichee.length; i++){
      //Si il n'y a qu'une seule paire
      if (carte_affichee[i][0]+carte_affichee[i][1] == premier){
        compteur+=1;
      }
    
      if (compteur == 3){
        isBrelan = true;
        premier = figures(premier)
        text_victoire = "Vous avez un Brelan "+ premier + "! C'est la 6eme main la plus forte!";
      }
    }
    if (mainIsPaire()[2].length>1){
      //Dans le cas où il y a deux paires
      let deuxieme = mainIsPaire()[2][1];
      let compteur = 0;
      for(let i =0; i<carte_affichee.length; i++){
        if (carte_affichee[i][0]+carte_affichee[i][1] == deuxieme){
          compteur+=1;
        }
      }
      if (compteur == 3){
        isBrelan = true;
        deuxieme = figures(deuxieme);
        text_victoire = "Vous avez un Brelan "+ deuxieme + "! C'est la 6eme main la plus forte!";
      }
    }
  }
  console.log('La main est un Brelan: ', isBrelan);
  return [isBrelan, text_victoire];
}

function mainIsDoublePaire(){
  let text_victoire = "";
  let isDoublePaire = false;
  let isPaire = mainIsPaire()[0][0];
  let nombre = mainIsPaire()[0][1];
  if (nombre>=2){
    isDoublePaire = true;
    text_victoire = "Vous avez une Double Paire  " + figures(mainIsPaire()[2][0]) + " et " + figures(mainIsPaire()[2][1]) + "! C'est la 7eme main la plus forte!";
  }
  console.log("La main est une double paire: ", isDoublePaire);
  return [isDoublePaire, text_victoire];
}

function mainIsPaire(){
  let text_victoire = "";
  let isPaire = false;
  let compteur = 0;
  let paire_de = [];
  for (let i =0; i<5; i++){
    let premier = carte_affichee[i][0]+carte_affichee[i][1];
    for(let j =0; j<5; j++){
      if (j!=i){
      let deuxieme = carte_affichee[j][0]+carte_affichee[j][1];
        if (premier == deuxieme){
          isPaire = true;
          if (!paire_de.includes(premier)){
            paire_de.push(premier);
          } 
          premier = figures(premier);
          text_victoire = "Vous avez une Paire " + premier + "! C'est la 8eme main la plus forte!";
          compteur +=1;
               
        }
      }
    }
  }
  //console.log(paire_de);
  compteur = Math.round(compteur/2);
  //console.log("nombre de paire: ", compteur);
  //console.log("La main est une paire: ", isPaire);
  return [[isPaire, compteur], text_victoire, paire_de];
}

function figures(premier){
  if (premier =="12"){
    premier = "de Dames";
  }
  else if (premier == "11"){
    premier = "de Valets";
  }
  else if (premier == "13"){
    premier = "de Rois";
  }
  else if (premier == "01"){
    premier = "d'As";
  }
  return "de " +premier;
}

function combinaison(){
  let text_victoire = "Vous n'avez rien :(";
  if (mainIsPaire()[0][0]){
    text_victoire = mainIsPaire()[1];
  }
  if (mainIsDoublePaire()[0]){
    text_victoire = mainIsDoublePaire()[1];
  } 
  if (mainIsBrelan()[0]){
    text_victoire = mainIsBrelan()[1];
  }
  if (mainIsQuinte()[0]){
    text_victoire = mainIsQuinte()[1];
  }
  if (mainIsCouleur()[0]){
    text_victoire = mainIsCouleur()[1];
  }
  if (mainIsFull()[0]){
    text_victoire = mainIsFull()[1];
  }
  if (mainIsCarre()[0]){text_victoire = mainIsCarre()[1];
  }
  if (mainIsQuinteFlush()[0]){
    text_victoire = mainIsQuinteFlush()[1];
  }
  return text_victoire;
}
/**                                             GESTION DES EVENEMENTS                      */
let etape = "premier_tirage";

/**BOUTON JOUER */
let boutton_jouer = document.getElementById("jouer");
boutton_jouer.addEventListener("click", lancerPartie);
const N= 5;

function lancerPartie(event){
  console.log("Nombre de cartes à tirer: ", N);
  console.log(etape);
  if (etape == "premier_tirage"){
    try {
      clean_plateau()
    } catch (TypeError) {
      console.log("Première partie!")
    }
    //console.log("click");
    afficherNCartes(N, jeu);
    boutton_jouer.textContent = "Changez des cartes"
    boutton_jouer.id = "changer";
    recup_coord();
    etape = "second_tirage";
  }
  else if(etape =="second_tirage"){
    //console.log("on est ici");
    //console.log("longeur de carte_retournee: ", carte_retournee.length)
    remplacement();
    let msg_victoire = document.createElement("h2");
    msg_victoire.id = "msg_victoire";
    msg_victoire.textContent = combinaison();
    document.getElementsByTagName("body")[0].appendChild(msg_victoire);
    boutton_jouer.textContent = "Rejouer";
    etape = "premier_tirage";
    debuggateur();
  } 
}

function clean_plateau(){
  console.log("Netoyage en cours...");
  carte_ajoutee = [];
  carte_retournee = [];
  cartes_a_modifier = [["nom", 0]];
  cartes_a_remodifier = [["nom", 0]];
  carte_a_tourner = [];
  coordonnees = [];
  carte_affichee = [];
  document.getElementById("msg_victoire").remove();
  for (let p=0; p<5; p++){
    document.getElementById("cartes").children[0].remove();
  }
  debuggateur();
}

function recup_coord(){
  for(let i =0; i<N; i++){
    let abscisse = document.getElementById("cartes").childNodes[i].offsetLeft;
    let abscisse_max = document.getElementById("cartes").childNodes[i].offsetLeft +60;
    //console.log(abscisse, abscisse_max)
    let ordonnee = document.getElementById("cartes").childNodes[i].offsetTop;
    let ordonnee_max = document.getElementById("cartes").childNodes[i].offsetTop + 90;
    //console.log(ordonnee, ordonnee_max);
    coordonnees.push([[abscisse, ordonnee],[abscisse_max, ordonnee_max]]);
    //console.log("coordonnées: ", coordonnees);
  }
}

function remplacement(){
  for (let i=0; i<carte_retournee.length; i++){
    let remplacer = false;
    //console.log("remplacer: ", remplacer)
    while(!remplacer){
      //console.log("on entre dans le while");
      let new_nom  = carteHasard(jeu);
      if (!carte_ajoutee.includes(new_nom)){
        let new_carte = ajouterCarte(new_nom);
        for (let j =0; j<5; j++){
          if(document.getElementById("cartes").children[j].id == carte_retournee[i]+"_verso"){
            let indice_a_remplacer = j;
            document.getElementById("cartes").replaceChild(new_carte, document.getElementById("cartes").children[indice_a_remplacer]);
          } 
        } 
        remplacer = true;
      }
    }
  }
}
/** SELECTION DE CARTES */

document.addEventListener("click", detection_click);
function detection_click(event){
  if (etape == "second_tirage"){
    let clickX = event.clientX;
    let clickY = event.clientY;
    for (let i=0; i<N; i++){
      let abscisse = coordonnees[i][0][0];
      let abscisse_max = coordonnees[i][1][0];
      let ordonnee = coordonnees[i][0][1];
      let ordonnee_max = coordonnees[i][1][1];
      if (clickX >= abscisse && clickX <abscisse_max && clickY>ordonnee && clickY<ordonnee_max){
        let id_carte_cliquee = document.getElementById("cartes").childNodes[i].id;
        console.log("carte cliquée: ", id_carte_cliquee);
        if (!cartes_a_modifier.includes(id_carte_cliquee)){
          cartes_a_modifier.push(id_carte_cliquee);
          cartes_a_modifier.push(id_carte_cliquee+"_verso");
          console.log("cartes à modifier", cartes_a_modifier);
          console.log("carte a remodifier", cartes_a_remodifier);
        }
        else{
          //console.log("hello");
          if (!cartes_a_remodifier.includes(id_carte_cliquee)){
            cartes_a_remodifier.push(id_carte_cliquee);
            console.log("cartes à modifier", cartes_a_modifier);
            console.log("carte a remodifier", cartes_a_remodifier);
          }
        }
      }
      if (cartes_a_remodifier){
        for (let i = 1; i<cartes_a_remodifier.length; i++){
          retournerCarteRecto(cartes_a_remodifier[i]);
        }
      }
      
      if (cartes_a_modifier){
        for (let i = 1; i<cartes_a_modifier.length; i++){
          retournerCarteVerso(cartes_a_modifier[i]); 
        }
        //console.log("cartes à modifier: ", cartes_a_modifier);
      }
    }
  }
}


/**                            DEBUG */

function debuggateur(){
  console.log("Liste carte ajoutee",  carte_ajoutee);
  console.log("Liste carte_affiche: ", carte_affichee);
  console.log("Liste carte retournee: ", carte_retournee);
  //console.log("coordonnées: ", coordonnees);
}
//  
/**                                                    TEST */
/** 
etape = "second_tirage";
ajouterCarte("09_carreau");
ajouterCarte("01_pique");
ajouterCarte("01_trefle");
ajouterCarte("01_coeur");
ajouterCarte("09_carreau");
console.log(carte_affichee);
mainIsCarre();
mainIsCouleur();
mainIsQuinte();
mainIsQuinteFlush();
mainIsFull();
mainIsBrelan();
mainIsDoublePaire();
mainIsPaire();
*/

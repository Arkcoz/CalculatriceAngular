import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.scss']
})
export class CalculatriceComponent {

  resultat = "0";
  erreur = "";
  valeurParDefaut = true;

  constructor() { }

  add(value : string){
    if(value === "log(" || value === "sin(" || value === "exp(" || value ==="cos"){
      if(this.valeurParDefaut){
        this.resultat = value;
        this.valeurParDefaut = false;
      }else{
        if(this.getLastValue() === "+" || this.getLastValue() === "-" || this.getLastValue() === "*" || this.getLastValue() === "/" || this.getLastValue() === "("){
          this.resultat += value;
        }else{
          this.resultat += "*" + value;
        }
      }
    }else{
      if(this.valeurParDefaut){
        this.resultat = value;
        this.valeurParDefaut = false;
      }else{
        this.resultat += value;
      }
    }
  }

  reset(){
    this.resultat = "0";
    this.valeurParDefaut = true;
    this.erreur = "";
  }

  calculer(){
    this.erreur = "";
    let simple = true;
    let listeSimple = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","(",")"];
    for (let i = 0; i < this.resultat.length; i++) {
      //si un des caractères n'est pas dans la liste
      if(!listeSimple.includes(this.resultat[i])){
        simple = false;
      }
    }

    console.log("simple : " + simple);

    if(simple){
      try {
        this.resultat = eval(this.resultat);
      } catch{
        this.erreur = "Erreur de syntaxe";
      }
    }else{
      try{
        this.resultat = this.calculScientifique();
      }catch{
        this.erreur = "Erreur de syntaxe";
      }
    }
  }

  calculScientifique(){
    let res = this.resultat;
    
    //calculer this.resultat avec les log exp sin cos
    
    //remplacer les log exp sin cos par des fonctions
    res = res.replace(/log\(/g, "Math.log10(");
    res = res.replace(/exp\(/g, "Math.exp(");
    res = res.replace(/sin\(/g, "Math.sin(");
    res = res.replace(/cos\(/g, "Math.cos(");


    console.log("remplacer " ,res);
    //calculer this.resultat 
    try{
      res = eval(res);
      this.erreur = "";
    }catch{
      this.erreur = "Erreur de syntaxe";
    }

    console.log(res);
    return res;
  }

  getLastValue(){
    let lastValue = this.resultat[this.resultat.length - 1];
    return lastValue;
  }
}

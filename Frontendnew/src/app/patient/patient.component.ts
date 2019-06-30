import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  providers:[UserService]
})
export class PatientComponent implements OnInit {
  
  displayedColumns = ['checked', 'position', 'name', 'description'];
  // dataSource = ELEMENT_DATA;

  chosenBoughtPackage:any;
  changereferencepackage:any;
  fundprocedures:Procedure[];
  fundcontingencies:Procedure[];
  unvalidatedcontingenices:Procedure[];
  // highlight(element: Element) {
  //   element.highlighted = !element.highlighted;
  // }

  constructor(private userservice:UserService,private router:Router) { 
   
    this.getData();
  }
  

  ngOnInit() {
    this.getData();
    setTimeout(() => {
      this.fundprocedures=[];
      for(var i=0;i<this.chosenBoughtPackage.fundamentalProcedureNames.length;i++){
        this.fundprocedures.push({
          providerCheck:this.chosenBoughtPackage.providerStageStatus[i],
          patientCheck:this.chosenBoughtPackage.patientStageStatus[i],
          position:i,
          name:this.chosenBoughtPackage.fundamentalProcedureNames[i],
          description:this.chosenBoughtPackage.fundamentalProcedureDescriptions[i]
        });
      }

      this.fundcontingencies=[];
      for(var i=0;i<this.chosenBoughtPackage.contingencyNames.length;i++){
        this.fundcontingencies.push({
          providerCheck:this.chosenBoughtPackage.providerContingencyStatus[i],
          patientCheck:this.chosenBoughtPackage.patientContingencyStatus[i],
          position:i,
          name:this.chosenBoughtPackage.contingencyNames[i],
          description:this.chosenBoughtPackage.contingencyDescriptions[i]
        });
      }

      this.unvalidatedcontingenices=[];
      for(var i=0;i<this.chosenBoughtPackage.unvalidatedContingencyNames.length;i++){
        this.unvalidatedcontingenices.push({
          providerCheck:this.chosenBoughtPackage.providerUnvalidatedContingencyStatus[i],
          patientCheck:this.chosenBoughtPackage.patientUnvalidatedContingencyStatus[i],
          position:i,
          name:this.chosenBoughtPackage.unvalidatedContingencyNames[i],
          description:this.chosenBoughtPackage.unvalidatedContingencyDescriptions[i]
        });
      }
    }, 100);
    
    
  }

  getData(){
    this.userservice.getSpecificBoughtPackage().subscribe(data=>{
      this.chosenBoughtPackage=data;
    });
  }
  
  sendProcedureRow(event,element)
  {
    if(event==true){
      element.patientCheck=true;
      console.log(element);
      this.chosenBoughtPackage.patientStageStatus[element.position]=true;
     
      this.userservice.patientVerifyStage(JSON.stringify({ "$class": "medichain.network.VerifyStage","boughtPackageId": "boughtPackage1","stageName":element.name})).subscribe(data=>{
        this.userservice.getSpecificBoughtPackage().subscribe(data=>{
          this.chosenBoughtPackage=data;
        });
      });
    }
  }
  sendContingencyRow(event,element)
  {
    if(event==true){
      element.patientCheck=true;
      console.log(element);
      this.chosenBoughtPackage.patientContingencyStatus[element.position]=true;
      this.userservice.patientVerifyContingency(JSON.stringify({ "$class": "medichain.network.VerifyContingency","boughtPackageId": "boughtPackage1","contingencyName":element.name})).subscribe(data=>{
        this.userservice.getSpecificBoughtPackage().subscribe(data=>{
          this.chosenBoughtPackage=data;
        });
      });
    }
    console.log(this.chosenBoughtPackage);
  }

  sendUnvalidatedContingencyRow(event,element)
  {
    if(event==true){
      element.patientCheck=true;
      console.log(element);
      this.chosenBoughtPackage.patientUnvalidatedContingencyStatus[element.position]=true;
      this.userservice.patientVerifyContingency(JSON.stringify({ "$class": "medichain.network.VerifyContingency","boughtPackageId": "boughtPackage1","contingencyName":element.name})).subscribe(data=>{
        this.userservice.getSpecificBoughtPackage().subscribe(data=>{
          this.chosenBoughtPackage=data;
        });
      });
    }
    console.log(this.chosenBoughtPackage);
  }
  

}

export interface Procedure {
  providerCheck: boolean;
  patientCheck: boolean;
  name: string;
  position: number;
  description: string;
}

// const ELEMENT_DATA: Element[] = [
//   { checked: false, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { checked: false, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { checked: false, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { checked: false, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { checked: false, position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { checked: false, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { checked: false, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { checked: false, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { checked: false, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { checked: false, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { checked: false, position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { checked: false, position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { checked: false, position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { checked: false, position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { checked: false, position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { checked: false, position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { checked: false, position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { checked: false, position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { checked: false, position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { checked: false, position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];

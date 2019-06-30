import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css'],
  providers:[UserService]
})
export class ExpertComponent implements OnInit {

  displayedColumns = ['checked', 'position', 'name', 'description'];
  // dataSource = ELEMENT_DATA;

  chosenBoughtPackage:any;
  unvalidatedContingencies:Procedure[];

  constructor(private userservice:UserService) { 
    this.getData();
  }

  ngOnInit() {
    this.getData();
    setTimeout(() => {
      this.unvalidatedContingencies=[];
      for(var i=0;i<this.chosenBoughtPackage.unvalidatedContingencyNames.length;i++){
        this.unvalidatedContingencies.push({
          checked:this.chosenBoughtPackage.patientUnvalidatedContingencyStatus[i],
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

  sendValidatedContingencyRow(event,element)
  {
    if(event==true){
      element.checked=true;
      console.log(element);
      this.chosenBoughtPackage.patientUnvalidatedContingencyStatus[element.position]=true;
      this.userservice.expertValidateContingency(JSON.stringify({ "$class": "medichain.network.ValidateContingency","boughtPackageId": "boughtPackage1","contingencyName":element.name})).subscribe(data=>{
        this.userservice.getSpecificBoughtPackage().subscribe(data=>{
          this.chosenBoughtPackage=data;
        });
      });
    }
    console.log(this.chosenBoughtPackage);
  }


}

export interface Procedure {
  checked: boolean;
  name: string;
  position: number;
  description: string;
}

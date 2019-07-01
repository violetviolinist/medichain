import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
  providers:[UserService]
})
export class ProviderComponent implements OnInit {
  displayedColumns = ['checked', 'position', 'name', 'description'];
  // dataSource = ELEMENT_DATA;

  chosenBoughtPackage=[];
  fundprocedures:Procedure[];
  fundcontingencies:Procedure[];

  constructor(private userservice:UserService) {
    this.getData();
   }
   ngOnInit() {
    this.getData();
    // setTimeout(() => {
    //   this.fundprocedures=[];
    //   for(var i=0;i<this.chosenBoughtPackage[0].fundamentalProcedureNames.length;i++){
    //     this.fundprocedures.push({
    //       checked:this.chosenBoughtPackage[0].providerStageStatus[i],
    //       position:i,
    //       name:this.chosenBoughtPackage[0].fundamentalProcedureNames[i],
    //       description:this.chosenBoughtPackage[0].fundamentalProcedureDescriptions[i]
    //     });
    //   }

    //   this.fundcontingencies=[];
    //   for(var i=0;i<this.chosenBoughtPackage[0].contingencyNames.length;i++){
    //     this.fundcontingencies.push({
    //       checked:this.chosenBoughtPackage[0].providerContingencyStatus[i],
    //       position:i,
    //       name:this.chosenBoughtPackage[0].contingencyNames[i],
    //       description:this.chosenBoughtPackage[0].contingencyDescriptions[i]
    //     });
    //   }

    // }, 4000);       
  }

  sendProcedureRow(event,element)
  {
    if(event==true){
      element.checked=true;
      console.log(element.name);
      this.chosenBoughtPackage[0].providerStageStatus[element.position]=true;
      this.userservice.providerCompleteStage(JSON.stringify({ "$class": "medichain.network.CompleteStage","boughtPackageId": "boughtPackage1","stageName":element.name})).subscribe(data=>{
  
      });
    }
  }
  sendContingencyRow(event,element)
  {
    if(event==true){
      element.checked=true;
      console.log(element);
      this.chosenBoughtPackage[0].providerContingencyStatus[element.position]=true;
      this.userservice.providerContingencyStage(JSON.stringify({ "$class": "medichain.network.CompleteContingency","boughtPackageId": "boughtPackage1","contingencyName":element.name})).subscribe(data=>{
  
      });
    }
    console.log(this.chosenBoughtPackage);
  }

  getData(){
    this.userservice.getSpecificBoughtPackage().subscribe(data=>{
      console.log(data);
      this.chosenBoughtPackage.push(data);
      this.fundprocedures=[];
      for(var i=0;i<this.chosenBoughtPackage[0].fundamentalProcedureNames.length;i++){
        this.fundprocedures.push({
          checked:this.chosenBoughtPackage[0].providerStageStatus[i],
          position:i,
          name:this.chosenBoughtPackage[0].fundamentalProcedureNames[i],
          description:this.chosenBoughtPackage[0].fundamentalProcedureDescriptions[i]
        });
      }

      this.fundcontingencies=[];
      for(var i=0;i<this.chosenBoughtPackage[0].contingencyNames.length;i++){
        this.fundcontingencies.push({
          checked:this.chosenBoughtPackage[0].providerContingencyStatus[i],
          position:i,
          name:this.chosenBoughtPackage[0].contingencyNames[i],
          description:this.chosenBoughtPackage[0].contingencyDescriptions[i]
        });
      }
    });
  }

  raiseContingency(){
    var name = (<HTMLInputElement>document.getElementById("rcontname")).value;
    var desc = (<HTMLInputElement>document.getElementById("rcontdesc")).value;
    var cost = (<HTMLInputElement>document.getElementById("rcontcost")).value;
    var time = (<HTMLInputElement>document.getElementById("rconttime")).value;
    this.userservice.raiseContingency(JSON.stringify({ "$class": "medichain.network.RaiseContingency","boughtPackageId": "boughtPackage1","contingencyName":name,"contingencyDescription":desc,"contingencyCost":cost,"contingencyTime":time})).subscribe(data=>{
  
    });
  }

}

export interface Procedure {
  checked: boolean;
  name: string;
  position: number;
  description: string;
}

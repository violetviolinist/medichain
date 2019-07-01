import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
  providers:[SessionStorageService]
})
export class PackageComponent implements OnInit {

  chosenPackage=[];
  bPackage : any;
  @Input()date:Date;

  operationDate:string;
  imagestring="";
  files:any;
  CT:any;
  MRI:any;
  constructor(private userservice:UserService, private sstorage:SessionStorageService) {
   
    this.userservice.openPackage.subscribe(data=>{
      if(data==true){
         this.displayPackage();
      }
    });
   }

  ngOnInit() {
    this.bPackage = {
      "$class": "medichain.network.BoughtPackage",
      "boughtPackageId":"boughtPackage2",                            
      "packageId":"",
      "providerId":"",
      "providerType":"",
      "providerName":"",
      "customerId":"customer1",
      "customerName":"Urvi Bhanushali",
      "holdAmount":0,                            
      "contingencyFund":0,
      "patientStageStatus": [],
      "providerStageStatus": [],
      "patientContingencyStatus": [],
      "providerContingencyStatus": [],
      "patientUnvalidatedContingencyStatus": [],
      "providerUnvalidatedContingencyStatus": [],
      "unverifiedStageName":"-1",
      "unverifiedContingencyName":"-1",
      "medicalRecords":[],
      "startDate":"",
      "currentStage":"-1"
      };
      this.displayPackage();
  }

  displayPackage(){
    var packageId=this.sstorage.retrieve('chosenPackage');
    // console.log(packageId);
    this.userservice.getSpecificPackage(packageId).subscribe(data=>{
      
      this.imagestring='data:image/jpeg;base64,'+data['image'];
      this.chosenPackage.push(data);
      this.bPackage.providerId= this.chosenPackage[0].providerId;
      this.bPackage.providerType=this.chosenPackage[0].providerType;
      this.bPackage.providerName=this.chosenPackage[0].providerName;
      this.bPackage.packageId=this.chosenPackage[0].packageId;
      this.bPackage.holdAmount=this.chosenPackage[0].totalCost;
      this.bPackage.contingencyFund=10000;
    });
  
    
  }

  getFiles(event,record) {
    this.files = event.target.files;
    var reader = new FileReader();
    if(record=="CT"){
      reader.onload = this._handleReaderLoadedCT.bind(this);
    }
    if(record=="MRI"){
      reader.onload = this._handleReaderLoadedMRI.bind(this);
    }
    reader.readAsBinaryString(this.files[0]);
    //alert(this.files);
   
    //alert(this.files[0]);
}

  _handleReaderLoadedCT(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.CT = btoa(binaryString);  // Converting binary string data.
  }
  _handleReaderLoadedMRI(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.MRI = btoa(binaryString);  // Converting binary string data.
  }

  DateSelection(current){
    var dd = String(current.getDate()).padStart(2, '0');
    var mm = String(current.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = current.getFullYear();

    this.operationDate = dd + '/' + mm + '/' + yyyy;
  }

  buyPackage(){
    for(var i=0;i<this.chosenPackage[0].fundamentalProcedureNames.length;i++)
    {
      this.bPackage.patientStageStatus[i]=false;
      this.bPackage.providerStageStatus[i]=false;
    }
    for(var i=0;i<this.chosenPackage[0].contingencyNames.length;i++)
    {
      this.bPackage.patientContingencyStatus[i]=false;
      this.bPackage.providerContingencyStatus[i]=false;
    }
    this.bPackage.startDate=this.operationDate;
    this.bPackage.medicalRecords=[this.MRI,this.CT];
    // this.bPackage.currentStage=this.chosenPackage['fundamentalProcedureNames[0]'];
    console.log(this.bPackage);
    this.userservice.postBoughtPackage(JSON.stringify(this.bPackage)).subscribe(data=>{

    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-packagegen',
  templateUrl: './packagegen.component.html',
  styleUrls: ['./packagegen.component.css']
})
export class PackagegenComponent implements OnInit {

  package: any;    ///the package that will be posted = initialized in ngoninit
  
  ProcNameList=[];
  ProcCostList=[];
  ProcTimeList=[];
  TotalProcCost=0;
  TotalProcTime=0;

  ContNameList=[];
  ContDescList=[];
  ContCostList=[];
  ContTimeList=[];
  TotalContCost=0;
  TotalContTime=0;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;


  files:any;
  filestring:any;

  constructor(private _formBuilder: FormBuilder,public userservice:UserService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl1: ['', Validators.required],
      firstCtrl2: ['', Validators.required],
      firstCtrl3: ['', Validators.required],
      firstCtrl4: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
    });

    this.package = {
      "$class":"medichain.network.Package",
      "packageId":"package1",
      "name":"",
      "description":"",
      "category":"",
      "image":"",
      "requiredDocs":["MRI Scan","CT Scan"],
      "fundamentalProcedureNames": [],
      "fundamentalProcedureCosts": [],
      "fundamentalProcedureTimes": [],
      "contingencyNames":[],
      "contingencyDescriptions":[],
      "contingencyCosts":[],
      "contingencyTimes":[],
      "unvalidatedContingencyNames":[],
      "unvalidatedContingencyDescriptions":[],
      "unvalidatedContingencyCosts":[],
      "unvalidatedContingencyTimes":[],
      "totalFundamentalCost": 0,
      "totalFundamentalTime": 0,
      "totalCost": 0,
      "totalTime": 0,
      "providerId": "hospital1",
      "providerName":"Hospital",
      "providerType":"Some Hospital Name"
    }
  }

  getFiles(event) {
     this.files = event.target.files;
     var reader = new FileReader();
     reader.onload = this._handleReaderLoaded.bind(this);
     reader.readAsBinaryString(this.files[0]);
     //alert(this.files);
    
     //alert(this.files[0]);
 }
 
 _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
     this.filestring = btoa(binaryString);  // Converting binary string data.
 }

   // dynamic addition of Procedure list
   addProcedures()
   {
     //Create an input type dynamically.
   var ProcName = document.createElement("input");
   var ProcCost = document.createElement("input");
   var ProcTime = document.createElement("input");
   //Assign different attributes to the element.
   ProcName.setAttribute("type", "text");
   ProcName.setAttribute("class", "ProcName");
   ProcName.style.border="0px";
   ProcName.style.borderBottom="2px solid blue";
   ProcName.style.width="80%";
   ProcName.style.height="20px";
   ProcCost.setAttribute("type", "number");
   ProcCost.setAttribute("class", "ProcCost");
   ProcCost.style.border="0px";
   ProcCost.style.borderBottom="2px solid blue";
   ProcCost.style.width="80%";
   ProcCost.style.height="20px";
   ProcTime.setAttribute("type", "number");
   ProcTime.setAttribute("class", "ProcTime");
   ProcTime.style.border="0px";
   ProcTime.style.borderBottom="2px solid blue";
   ProcTime.style.width="80%";
   ProcTime.style.height="20px";
 
 
   var validationReq = document.getElementById("ProcNameList");
   //Append the element in page (in span).
   validationReq.appendChild(ProcName);
   validationReq.appendChild(document.createElement("br"));
   validationReq.appendChild(document.createElement("br"));

   validationReq = document.getElementById("ProcCostList");
   validationReq.appendChild(ProcCost);
   validationReq.appendChild(document.createElement("br"));
   validationReq.appendChild(document.createElement("br"));

   validationReq = document.getElementById("ProcTimeList");
   validationReq.appendChild(ProcTime);
   validationReq.appendChild(document.createElement("br"));
   validationReq.appendChild(document.createElement("br"));
   }



   addContigencies()
   {
     //Create an input type dynamically.
        var ContName = document.createElement("input");
        var ContDesc = document.createElement("input");
        var ContCost = document.createElement("input");
        var ContTime = document.createElement("input");
        //Assign different attributes to the element.
        ContName.setAttribute("type", "text");
        ContName.setAttribute("class", "ContName");
        ContName.style.border="0px";
        ContName.style.borderBottom="2px solid blue";
        ContName.style.width="80%";
        ContName.style.height="20px";
        ContDesc.setAttribute("type", "text");
        ContDesc.setAttribute("class", "ContDesc");
        ContDesc.style.border="0px";
        ContDesc.style.borderBottom="2px solid blue";
        ContDesc.style.width="80%";
        ContDesc.style.height="20px";
        ContCost.setAttribute("type", "number");
        ContCost.setAttribute("class", "ContCost");
        ContCost.style.border="0px";
        ContCost.style.borderBottom="2px solid blue";
        ContCost.style.width="80%";
        ContCost.style.height="20px";
        ContTime.setAttribute("type", "number");
        ContTime.setAttribute("class", "ContTime");
        ContTime.style.border="0px";
        ContTime.style.borderBottom="2px solid blue";
        ContTime.style.width="80%";
        ContTime.style.height="20px";
      
      
        var validationReq = document.getElementById("ContNameList");
        //Append the element in page (in span).
        validationReq.appendChild(ContName);
        validationReq.appendChild(document.createElement("br"));
        validationReq.appendChild(document.createElement("br"));
     
        validationReq = document.getElementById("ContDescList");
        validationReq.appendChild(ContDesc);
        validationReq.appendChild(document.createElement("br"));
        validationReq.appendChild(document.createElement("br"));
     
        validationReq = document.getElementById("ContCostList");
        validationReq.appendChild(ContCost);
        validationReq.appendChild(document.createElement("br"));
        validationReq.appendChild(document.createElement("br"));
     
        validationReq = document.getElementById("ContTimeList");
        validationReq.appendChild(ContTime);
        validationReq.appendChild(document.createElement("br"));
        validationReq.appendChild(document.createElement("br"));
   }


   getProcedures() {

    // for retrieving validation requirements
    var ProcName=document.getElementsByClassName("ProcName");
    this.ProcNameList=[];
    for(var i = 0; i < ProcName.length; i++)
    {
      this.ProcNameList.push((<HTMLInputElement>ProcName[i]).value);
    } 
    var ProcCost=document.getElementsByClassName("ProcCost");
    this.ProcCostList=[];
    this.TotalProcCost=0;
    for(var i = 0; i < ProcCost.length; i++)
    {
      this.ProcCostList.push((<HTMLInputElement>ProcCost[i]).value);
      this.TotalProcCost+=parseInt((<HTMLInputElement>ProcCost[i]).value);
    } 
    var ProcTime=document.getElementsByClassName("ProcTime");
    this.ProcTimeList=[];
    this.TotalProcTime=0;
    for(var i = 0; i < ProcTime.length; i++)
    {
      this.ProcTimeList.push((<HTMLInputElement>ProcTime[i]).value);
      this.TotalProcTime+=parseInt((<HTMLInputElement>ProcTime[i]).value);
    } 
  }

  getContigencies() {

    // for retrieving validation requirements
    var ContName=document.getElementsByClassName("ContName");
    this.ContNameList=[];
    for(var i = 0; i < ContName.length; i++)
    {
      this.ContNameList.push((<HTMLInputElement>ContName[i]).value);
    } 
    var ContDesc=document.getElementsByClassName("ContDesc");
    this.ContDescList=[];
    for(var i = 0; i < ContDesc.length; i++)
    {
      this.ContDescList.push((<HTMLInputElement>ContDesc[i]).value);
    } 
    var ContCost=document.getElementsByClassName("ContCost");
    this.ContCostList=[];
    this.TotalContCost=0;
    for(var i = 0; i < ContCost.length; i++)
    {
      this.ContCostList.push((<HTMLInputElement>ContCost[i]).value);
      this.TotalContCost+=parseInt((<HTMLInputElement>ContCost[i]).value);
    } 
    var ContTime=document.getElementsByClassName("ContTime");
    this.ContTimeList=[];
    this.TotalContTime=0;
    for(var i = 0; i < ContTime.length; i++)
    {
      this.ContTimeList.push((<HTMLInputElement>ContTime[i]).value);
      this.TotalContTime+=parseInt((<HTMLInputElement>ContTime[i]).value);
    } 
  }

  submitPackage(){
    this.getProcedures();
    this.getContigencies();
    this.package.name=this.firstFormGroup.value.firstCtrl1;
    this.package.category=this.firstFormGroup.value.firstCtrl2;
    this.package.description=this.firstFormGroup.value.firstCtrl3;
    this.package.image=this.filestring;
    this.package.fundamentalProcedureNames=this.ProcNameList;
    this.package.fundamentalProcedureCosts=this.ProcCostList;
    this.package.fundamentalProcedureTimes=this.ProcTimeList;
    this.package.contingencyNames=this.ContNameList;
    this.package.contingencyDescriptions=this.ContDescList;
    this.package.contingencyCosts=this.ContCostList;
    this.package.contingencyTimes=this.ContTimeList;
    this.package.totalFundamentalCost=this.TotalProcCost;
    this.package.totalFundamentalTime=this.TotalProcTime;
    this.package.totalCost=this.TotalProcCost+this.TotalContCost;
    this.package.totalTime=this.TotalProcTime+this.TotalContTime;

    console.log(JSON.stringify(this.package));
    this.userservice.postPackage(JSON.stringify(this.package)).subscribe(data=>{

    });
  }

}

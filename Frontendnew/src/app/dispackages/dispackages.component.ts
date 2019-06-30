import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-dispackages',
  templateUrl: './dispackages.component.html',
  styleUrls: ['./dispackages.component.css'],
  providers:[UserService,SessionStorageService]
})
export class DispackagesComponent implements OnInit {

  constructor(private userservice:UserService,private router:Router, private sstorage:SessionStorageService) { }
  packages=[];
  ngOnInit() {
      //getting filter for permit names created by rto
      this.userservice.allPackages().subscribe(data=>{
        console.log(data);
        data['image']='data:image/jpeg;base64,'+data['image'];
          this.packages.push(data);
      });
      // for(var p in this.packages){
      //   p['image']='data:image/jpg;base64'+p['image'];
      // }
  }

  packageDisplay(packageId){
    this.sstorage.clear('chosenPackage');
    this.sstorage.store('chosenPackage',packageId);   
    this.userservice.openPackage.emit(true);
    this.router.navigate(['package']);
  }
}

import { Component, OnInit,Inject } from '@angular/core';
import {UserProfileService} from '../services/user-profile.service';
import { ModalService } from '../services/modal-service.service';
import {UserProfileData} from '../model/user-profile.model';
import { FormControl,FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  id: number;
  userProfile: any;
  userProfileForm: any;
  bodyText: string;
  userProfileData: UserProfileData = new  UserProfileData();
  errorText: any;
  updateResponse: any;
  constructor( 
    private userService: UserProfileService,
    private modalService: ModalService,
    private formBuilder: FormBuilder, 
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.userProfileForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['',Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      designation:['',Validators.required],
      id: ['']
    });

    this.bodyText = 'This text can be updated in modal 1';
  }
  userNameValidation() {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (nameRegex.test(this.userProfileData.userName)){
        this.errorText = "";
    } else {
        this.errorText = 'User Name is incorrect';
    }
  }

  firstNameValidation() {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (nameRegex.test(this.userProfileData.firstName)){
        this.errorText = "";
    } else {
        this.errorText = 'First Name is incorrect';
    }
  }

  addressValidation(){
    const addressRegex = RegExp('^([A-Za-z0-9/,-]{3,}[ ]?)+$');
    if (addressRegex.test(this.userProfileData.address))
        this.errorText = '';
    else
        this.errorText = 'Adddress is invalid.'
  }

  getUserProfile(){
    console.log("id:",this.id);
    this.id = 1;
    this.userService.getUserProfileById(this.id).subscribe(response => {
      if(response.statusCode == 200 ){
        this.userProfile = response.data;
      }
     
    })
  }

  openModal(id: string,userProfile) {
    this.modalService.open(id);
    console.log("userProfile",userProfile.address,userProfile);
    this.setDataToFormBuilder(userProfile);
}

setDataToFormBuilder(object): void { 
  this.userProfileData.userName = object.userName;
  this.userProfileData.firstName = object.firstName;
  this.userProfileData.address = object.address;
  this.userProfileData.email= object.email;
  this.userProfileData.designation = object.designation;
}

onSubmit(){
  this.id = 1;
  this.userService.updateUserProfileRecord(this.userProfileData,this.id).subscribe(response => {
    console.log(response);
    this.updateResponse = response;
    if(this.updateResponse.statusCode == 200){
      alert(this.updateResponse.message);
      this.getUserProfile();
    }
  });
}
closeModal(id: string) {
    this.modalService.close(id);
}
}

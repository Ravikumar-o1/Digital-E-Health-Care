import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
const URL = 'http://localhost:8080/patient/upload';
// import { PatientAuthService } from '../../patient-auth.service';




@Component({
  selector: 'app-patient-upload',
  templateUrl: './patient-upload.component.html',
  styleUrls: ['./patient-upload.component.css']
})
export class PatientUploadComponent implements OnInit {
  @ViewChild('frm') formValues;
  constructor(private http: HttpClient,
              private cookieService: CookieService) { }
    // public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
    selectedFile: File =null;
    ngOnInit() {
      // this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
      // this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      //   console.log("ImageUpload:uploaded:", item, status, response);
    // };
  }
 onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  upload(form: NgForm) {
      const fd = new FormData();
      fd.append('patient_uid', this.cookieService.get('patient_uid'));
      fd.append('doctor_uid', this.cookieService.get('doctor_uid'));
      fd.append('image', this.selectedFile, this.selectedFile.name);
      fd.append('summary', form.value.summary);
      fd.append('disease', form.value.disease);

      this.http.post('http://localhost:8080/patient/upload', fd).subscribe(res => {
          alert(res);
          this.formValues.resetForm();
        })
  }

}

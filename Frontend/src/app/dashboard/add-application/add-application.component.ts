import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddApplicationModalComponent } from '../add-application-modal/add-application-modal.component';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../dashboard.service';
import { switchMap } from 'rxjs';
import { Application } from 'src/app/shared/types/Applications.type';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss'],
})
export class AddApplicationComponent implements OnInit {
  @Input() formTitle: string;
  @Input() isEditMode: boolean;
  @Input() applicationEditData: Application;

  protected choosenFileName: string;
  protected addAplicationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddApplicationModalComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.isEditMode ? this.initializeFormWithData() : this.initializeForm();
  }

  private fillFormArray() {
    return this.applicationEditData.contacts.map((element) => {
      return this.fb.group(
        {
          name: this.fb.control(element.name),
          phone: this.fb.control(element.phone),
          email: this.fb.control(element.email),
        },
        { validators: this.getgroupValidator('value') }
      );
    });
  }

  private initializeFormWithData() {
    this.addAplicationForm = this.fb.group({
      team_name: this.fb.control(this.applicationEditData.team_name),
      desc: this.fb.control(this.applicationEditData.desc),
      contacts: this.fb.array(this.fillFormArray()),
      file: this.fb.control(null),
    });
    this.choosenFileName = this.applicationEditData.file_ids?.[0]?.name;
  }

  private initializeForm() {
    this.addAplicationForm = this.fb.group({
      team_name: this.fb.control('', Validators.required),
      desc: this.fb.control('', Validators.required),
      contacts: this.fb.array([
        this.fb.group(
          {
            name: this.fb.control('', Validators.required),
            phone: this.fb.control('', [
              Validators.required,
              Validators.pattern(/^[0-9]\d*$/),
            ]),
            email: this.fb.control('', [Validators.required, Validators.email]),
          },
          { validators: this.getgroupValidator('valid') }
        ),
      ]),
      file: this.fb.control(null, Validators.required),
    });
  }

  protected onFilePicked(event: Event) {
    const file = (event.target as any).files[0];
    this.choosenFileName = file.name;
    this.addAplicationForm.patchValue({ file: file });
  }

  protected onChangeFile(event: any) {
    const form = new FormData();

    const file = (event.target as any).files[0];

    form.append('file', file);
    form.append('applicationId', this.applicationEditData.id.toString());
    this.dashboardService.changeFile(form);
    this.choosenFileName = file.name;
  }

  protected onDeleteFile() {
    this.dashboardService.deleteFile(this.applicationEditData.file_ids[0].id);
    this.choosenFileName = '';
  }

  protected sendForm() {
    const form = new FormData();

    form.append('file', this.controls['file'].value);
    form.append('team_name', this.controls['team_name'].value);
    form.append('desc', this.controls['desc'].value);
    form.append(
      'contacts',
      JSON.stringify(
        this.prepareContactsForBackend(this.controls['contacts'].value)
      )
    );

    this.http
      .post('/api/applications', form)
      .pipe(switchMap(() => this.dashboardService.downloadApplications()))
      .subscribe((applications) =>
        this.dashboardService.updateApplications(applications)
      );

    this.dialogRef.close();
  }

  protected prepareContactsForBackend(
    contactValue: Record<'email' | 'name' | 'phone', string>[]
  ) {
    return contactValue.filter((contact) => {
      return contact.email && contact.phone && contact.name;
    });
  }

  protected sendUpdatedForm() {
    const body = {
      team_name: this.addAplicationForm.get('team_name')?.value,
      desc: this.addAplicationForm.get('desc')?.value,
      contacts: this.prepareContactsForBackend(
        this.addAplicationForm.get('contacts')?.value
      ),
    };

    this.dashboardService.updateApplication(this.applicationEditData.id, body);
  }

  protected addContact() {
    const newContactGroup = this.fb.group(
      {
        name: this.fb.control('', [Validators.required]),
        phone: this.fb.control('', [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
        ]),
        email: this.fb.control('', [Validators.required, Validators.email]),
      },
      { validators: this.getgroupValidator('valid') }
    );
    this.contactsControls.push(newContactGroup);
  }

  public getgroupValidator(propertyToCheck: 'valid' | 'value') {
    return (g: FormGroup) => {
      const validInputs = [
        g.get('phone')![propertyToCheck],
        g.get('name')![propertyToCheck],
        g.get('email')![propertyToCheck],
      ].filter(Boolean);

      if (validInputs.length === 1 || validInputs.length === 2) {
        return { invalidGroup: true };
      } else return;
    };
  }

  get contactsControls() {
    return this.addAplicationForm.controls['contacts'] as FormArray;
  }

  get controls() {
    return this.addAplicationForm.controls;
  }
}

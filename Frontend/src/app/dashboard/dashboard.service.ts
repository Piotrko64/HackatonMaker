import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, switchMap } from 'rxjs';
import { Application } from '../shared/types/Applications.type';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public applications = new BehaviorSubject<Application[]>([]);

  constructor(private http: HttpClient) {}

  public downloadApplications() {
    return this.http.get<Application[]>('/api/applications');
  }

  public downloadPDF() {
    return this.http
      .get('/api/files/upload', { responseType: 'blob' })
      .subscribe((obj) => {
        console.log(obj);
      });
  }

  public addApplication(formValue: Application) {
    this.http
      .post('/api/applications', formValue)
      .pipe(concatMap(() => this.downloadApplications()))
      .subscribe((applications) => this.updateApplications(applications));
  }

  public deleteApplication(application: Application) {
    return this.http
      .delete('/api/applications', { body: { id: application.id } })
      .subscribe(() =>
        this.downloadApplications().subscribe((applications) =>
          this.updateApplications(applications)
        )
      );
  }

  public updateApplication(id: any, body: any) {
    return this.http
      .put(`/api/applications/${id}`, body)
      .subscribe(console.log);
  }

  public deleteUser() {
    return this.http.delete('/api/files/upload').subscribe((obj) => {
      console.log(obj);
    });
  }

  public changeFile(body: any) {
    this.http.post('/api/files/upload', body).subscribe();
  }

  public deleteFile(id: any) {
    this.http.delete('/api/files', { body: { id } }).subscribe();
  }

  public updateApplications(applications: Application[]) {
    console.log(applications);
    this.applications.next(applications);
  }
}

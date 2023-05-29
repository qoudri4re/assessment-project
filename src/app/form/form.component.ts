import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { RequestService } from '../services/request.service';
// import { ISelectOption } from '../interfaces';
// import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  firstName!: string;
  lastName!: string;
  phoneNumber!: string;
  selectedOccupation!: string;
  successful!: string;
  selectedCountry!: string;
  countries!: string[];
  occupations: string[] = [
    'Frontend Developer',
    'Backend Developer',
    'Designer',
    'Devops Engineer',
  ];
  // countryOptions!: ISelectOption[];

  // occupationOptions: ISelectOption[] = this.occupations.map((occupation) => ({
  //   value: occupation,
  //   label: occupation,
  //   text: occupation,
  // }));

  constructor(
    private notificationService: NotificationService,
    private requestService: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestService.getCountries().subscribe((data) => {
      this.countries = Object.values(data);
      // this.countryOptions = this.countries.map((country) => ({
      //   value: country,
      //   label: country,
      //   text: country,
      // }));
    });
  }

  submitForm() {
    if (
      !this.selectedCountry ||
      !this.firstName ||
      !this.lastName ||
      !this.selectedOccupation ||
      !this.phoneNumber
    ) {
      this.notificationService.errorNotification(
        'All input fields must be filled!'
      );
    } else {
      if (this.successful === 'true') {
        this.notificationService.successNotification(
          'Form submission successful'
        );
        setTimeout(() => {
          this.router.navigate(['/success']); // Redirect to success route
        }, 5000);
      } else {
        this.notificationService.errorNotification('Form submission failed');
      }
    }
  }
}

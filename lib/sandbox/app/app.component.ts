import {Component} from '@angular/core';
import {DjangoFormDialogService} from '../../django-form';

@Component({
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    private config = {
        form_title: 'Profil uživatele',
        layout: [
            ['name', 'Jméno a příjmení', 'string'],
            ['Adresa',
                ['street', 'Ulice'],
                {id: 'city', label: 'Město'},
                ['zipcode', 'PSČ'],
            ],
        ],
        actions: [
            ['Ulož'],
            ['Zpět']
        ]
    };

    private url = 'http://localhost:8000/api/1.0/cities/1/';


    constructor(private dialog: DjangoFormDialogService) {}

    private submit(value: any) {
        console.log('form submitted', value);
    }

    private cancel(value: any) {
        console.log('form cancelled', value);
    }

    private open() {
        this.dialog.open(this.url, (data, response) => {
            console.log('submit ok', data, response);
        }, data => {
            console.log('submit cancelled', data);
        });
    }
}

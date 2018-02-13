import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {MatDialog} from '@angular/material';
import {DialogDjangoFormComponent} from './impl/dialog-django-form.component';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DjangoDialogConfig} from './impl/django-form-iface';

@Injectable()
export class DjangoFormDialogService {
    constructor(private dialog: MatDialog) {
    }

    public open(djangoUrl: string,
                extraOptions?: DjangoDialogConfig): Observable<any> {

        if (!extraOptions) {
            extraOptions = {};
        }

        const dialogRef = this.dialog.open(DialogDjangoFormComponent, {
            // width: '250px',
            data: {
                djangoUrl,
                config: extraOptions.config,
                extraFormData: extraOptions.extraFormData || {},
                initialDataTransformation: extraOptions.initialDataTransformation,
                configTransformation: extraOptions.configTransformation,
                formId: extraOptions.formId
            }
        });

        return dialogRef
            .afterClosed()
            .map((result: any) => (result || {cancel: true, data: undefined}));
    }
}

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-enable @typescript-eslint/naming-convention */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { Usuario } from '@shared/models/usuario.model';
import { AuthService } from '@core/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';


@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
})
export class UserComponent implements OnInit, OnDestroy {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    static ngAcceptInputType_showAvatar: BooleanInput;
    @Input() showAvatar: boolean = true;
    user: Usuario;
    rutaImg = '';
    private readonly baseUrl = environment.baseUrl;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _httpClient: HttpClient,
        private _router: Router,
        private _userService: UserService,
        private _authService: AuthService,
    ) {}

    ngOnInit(): void {
        // Subscribe to user changes
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: Usuario) => {
                this.user = user;
                this.rutaImg = `assets/images/avatars/${this.user.avatar}`;
                //console.log(user);
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    updateUserStatus(status: string): void {
        // Return if user is not available
        if (!this.user) {
            return;
        }

        // Update the user
        this._userService.update(status).subscribe();
    }

    signOut(): void {

                //this.wbService.desconectarSocket();
                this._router.navigate(['/sign-out']);

    }

    bloquear(): void {
        this._authService.lockSession('inactivo').subscribe((resp) => {
            this._router.navigateByUrl('/unlock-session');
        });
    }
}

import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { UserService } from './services/user.service'
import { LocalStorageService } from './services/localStorage.service'

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    UserService,
    LocalStorageService]
);
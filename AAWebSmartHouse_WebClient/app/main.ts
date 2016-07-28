import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './components/app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { UserService } from './services/user.service'
import { LocalStorageService } from './services/localStorage.service'
import { ScreenService } from './services/screen.service'

bootstrap(AppComponent,
    [
        HTTP_PROVIDERS,
        UserService,
        LocalStorageService,
        ScreenService
    ]
);
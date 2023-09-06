import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesktopNavComponent } from './nav/app-desktop-nav/desktop-nav.component';
import { MobileNavComponent } from './nav/app-mobile-nav/mobile-nav.component';
import { AppNavComponent } from './nav/app-nav/app-nav.component';
import {LandingPageViewComponent} from "./pages/landing-page-view/landing-page-view.component";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "./components/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    DesktopNavComponent,
    MobileNavComponent,
    AppNavComponent
  ],
    imports: [
        BrowserModule,
        MatSnackBarModule,
        AppRoutingModule,
        LandingPageViewComponent,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatMenuModule,
        FormsModule,
        FooterComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

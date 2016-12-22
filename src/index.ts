import "zone.js";
import "reflect-metadata";
import "normalize-css";

import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { NgModule, enableProdMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { APP_ROUTES } from './app.settings/app.routes';
import { APP_PROVIDERS } from './app.settings/app.providers';
import { APP_DECLARATIONS } from './app.settings/app.declarations';

import { AppComponent } from './app.component/app.component';

@NgModule({
    imports: [ BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(APP_ROUTES) ],
    declarations: APP_DECLARATIONS,
    providers: APP_PROVIDERS,
    bootstrap: [ AppComponent ]
})
class AppModule {}

console.log('Enable the production mode in index.ts');
//enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);

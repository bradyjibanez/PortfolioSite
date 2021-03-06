import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectTemplateComponent } from './projects/project-template/project-template.component';
import { ProjectsCollectionComponent } from './projects/projects-collection/projects-collection.component';

import { SmtpService } from './_services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BannerComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    ProjectTemplateComponent,
    ProjectsCollectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [SmtpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

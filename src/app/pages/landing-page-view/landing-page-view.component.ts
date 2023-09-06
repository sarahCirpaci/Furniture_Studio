import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {GLOBAL_CONSTANTS} from "../../global-constants/global-constants";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-landing-page-view',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './landing-page-view.component.html',
  styleUrls: ['./landing-page-view.component.scss']
})
export class LandingPageViewComponent  {
  protected routes = GLOBAL_CONSTANTS.routes;
}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MaterialModule } from '../../../modules/material.module';
import { LandingComponent } from '../landing/landing.component';
// import { CoreComponentsModule } from '../../../core/components/core-components.module';


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutRoutingModule,
    // CoreComponentsModule
  ]
})
export class LayoutModule { }

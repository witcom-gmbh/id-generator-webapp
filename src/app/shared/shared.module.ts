import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleUserInfoComponent } from './simple-user-info/simple-user-info.component';
import { HasRoleDirective } from './has-role.directive';
import { ISServiceIdGeneratorComponent } from './isservice-id-generator/isservice-id-generator.component';
import { ClipboardModule } from 'ngx-clipboard';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {SpinnerModule} from 'primeng/spinner';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [SimpleUserInfoComponent, HasRoleDirective, ISServiceIdGeneratorComponent],
  imports: [
    CommonModule,
    ClipboardModule,
    PanelModule,
    DropdownModule,
    FormsModule,
    SliderModule,
    SpinnerModule,
    ButtonModule,
    InputTextareaModule
  ],
  exports: [
    SimpleUserInfoComponent,
    HasRoleDirective,

    ISServiceIdGeneratorComponent
  ]
})
export class SharedModule { }

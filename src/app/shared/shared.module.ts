/** Angular Core */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

/** App imports */
import { HttpClientModule } from '@angular/common/http'
import { TranslationPipe } from './modules/translation/pipes/translation.pipe'
import { NotificationComponent } from '@shared/modules/notifications/components/notification.component'

/* Librerías */
import { ButtonModule, InputModule, NotificationModule, UIShellModule, IconModule, LoadingModule, DialogModule, ModalModule,
         SelectModule, GridModule, SearchModule, TableModule, DropdownModule, NumberModule, CheckboxModule, TabsModule, RadioModule, DatePickerModule } from 'carbon-components-angular'

@NgModule({
  declarations: [
    TranslationPipe,
    NotificationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ButtonModule,
    InputModule,
    NotificationModule,
    UIShellModule,
    IconModule,
    LoadingModule,
    DialogModule,
    ModalModule,
    SelectModule,
    GridModule,
    SearchModule,
    TableModule,
    InputModule,
    DropdownModule,
    NumberModule,
    CheckboxModule,
    TabsModule,
    CheckboxModule,
    RadioModule,
    DatePickerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    TranslationPipe,
    ButtonModule,
    InputModule,
    NotificationModule,
    NotificationComponent,
    UIShellModule,
    IconModule,
    LoadingModule,
    DialogModule,
    ModalModule,
    SelectModule,
    GridModule,
    SearchModule,
    TableModule,
    InputModule,
    DropdownModule,
    NumberModule,
    CheckboxModule,
    TabsModule,
    CheckboxModule,
    RadioModule,
    DatePickerModule
  ]
})
export class SharedModule { }

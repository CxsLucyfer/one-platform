import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

import { OutlinedPieGraphComponent } from './components/outlined-pie-graph/outlined-pie-graph.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LHCardLegendComponent } from './components/lhcard-legend/lhcard-legend.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ContextSelectorComponent } from './components/context-selector/context-selector.component';

import { LHScoreLabelFormaterPipe } from './pipes/lhscore-label-formater.pipe';
import { FilterListPipe } from './pipes/filter-list.pipe';
import { UrlValidatorDirective } from './directive/url-validator.directive';
import { FormErrorMessageComponent } from './components/form-error-message/form-error-message.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    OutlinedPieGraphComponent,
    LoaderComponent,
    LHCardLegendComponent,
    AvatarComponent,
    EmptyStateComponent,
    LHScoreLabelFormaterPipe,
    FilterListPipe,
    ContextSelectorComponent,
    UrlValidatorDirective,
    FormErrorMessageComponent,
    TableComponent,
  ],
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AppLayoutComponent,
    OutlinedPieGraphComponent,
    LoaderComponent,
    LHCardLegendComponent,
    AvatarComponent,
    EmptyStateComponent,
    LHScoreLabelFormaterPipe,
    FilterListPipe,
    ContextSelectorComponent,
    UrlValidatorDirective,
    FormErrorMessageComponent,
    TableComponent,
  ],
})
export class SharedModule {}

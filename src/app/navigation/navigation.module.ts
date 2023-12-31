import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [],
  imports: [CommonModule, MenuComponent, FooterComponent],
  exports: [MenuComponent, FooterComponent],
})
export class NavigationModule {}

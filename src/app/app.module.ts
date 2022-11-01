import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { LandingDescriptionComponent } from './components/landing-description/landing-description.component';
import { FeaturesPageComponent } from './components/features-page/features-page.component';
import { RoundedButtonComponent } from './components/rounded-button/rounded-button.component';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { SecureForFreeComponent } from './components/secure-for-free/secure-for-free.component';
import { SquareButtonComponent } from './components/square-button/square-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PricingPageComponent } from './components/pricing-page/pricing-page.component';
import { PricingPagePricesComponent } from './components/pricing-page/pricing-page-prices/pricing-page-prices.component';
import { PriceItemComponent } from './components/pricing-page/price-item/price-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PriceListComponent,
    LandingDescriptionComponent,
    FeaturesPageComponent,
    RoundedButtonComponent,
    FaqSectionComponent,
    SecureForFreeComponent,
    SquareButtonComponent,
    FooterComponent,
    PricingPageComponent,
    PricingPagePricesComponent,
    PriceItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

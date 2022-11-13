import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingDescriptionComponent } from './components/landing-description/landing-description.component';
import { FeaturesPageComponent } from './components/features-page/features-page.component';
import { RoundedButtonComponent } from './components/rounded-button/rounded-button.component';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { SecureForFreeComponent } from './components/secure-for-free/secure-for-free.component';
import { SquareButtonComponent } from './components/square-button/square-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PremiumPageComponent } from './components/premium-page/premium-page.component';
import { PremiumPagePricesComponent } from './components/premium-page/premium-page-prices/premium-page-prices.component';
import { PriceItemComponent } from './components/premium-page/premium-page-prices/price-item/price-item.component';
import { PremiumPageAdvantagesComponent } from './components/premium-page/premium-page-advantages/premium-page-advantages.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingDescriptionComponent,
    FeaturesPageComponent,
    RoundedButtonComponent,
    FaqSectionComponent,
    SecureForFreeComponent,
    SquareButtonComponent,
    FooterComponent,
    PremiumPageComponent,
    PremiumPagePricesComponent,
    PriceItemComponent,
    PremiumPageAdvantagesComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { TatamiLandingAngularPage } from './app.po';

describe('tatami-landing-angular App', () => {
  let page: TatamiLandingAngularPage;

  beforeEach(() => {
    page = new TatamiLandingAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

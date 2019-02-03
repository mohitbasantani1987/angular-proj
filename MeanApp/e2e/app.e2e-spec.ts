import { MeanApp11AMPage } from './app.po';

describe('mean-app11-am App', () => {
  let page: MeanApp11AMPage;

  beforeEach(() => {
    page = new MeanApp11AMPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

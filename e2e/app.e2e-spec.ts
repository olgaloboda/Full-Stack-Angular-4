import { AppPage } from './app.po';

import { protractor, browser } from 'protractor';

describe('con-fusion App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message Ristorante Con Fusion', () => {
    page.navigateTo('/');
    expect(page.getParagraphText('app-root h1')).toEqual('Ristorante Con Fusion');
  });

  it('should navigate to about us page by clicking on the link', () => {
  	page.navigateTo('/');

  	let navlink = page.getAllElements('a').get(1);
  	navlink.click();

  	expect(page.getParagraphText('h3')).toBe('About Us');
  });

  it('should enter a new comment for the first dish', () => {
    page.navigateTo('/dishdetail/0');

    const EC = protractor.ExpectedConditions;
    
    let newAuthor = page.getElement('input[type=text]');
    browser.wait(EC.visibilityOf(newAuthor), 5000);
    newAuthor.sendKeys('Test Author');

    let newComment = page.getElement('textarea');
    browser.wait(EC.visibilityOf(newComment), 5000);
    newComment.sendKeys('Test Comment');

    let newSubmitButton = page.getElement("button[type=submit]");
    browser.wait(EC.visibilityOf(newSubmitButton), 5000);
    newSubmitButton.click();

    browser.pause(49152);
  });

});

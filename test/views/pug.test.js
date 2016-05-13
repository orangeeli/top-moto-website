(()=> {

  'use strict';

  const assert = require('chai').assert,
    fs = require('fs'),
    path = require('path'),
    pug = require('pug'),
    cheerio = require('cheerio');

  describe('pug verkauf page', ()=>{
    it("should render the menu with 'Verkauf' selected", ()=>{
      let html, $;
      html = pug.renderFile(__dirname + '/fixtures/include.menu.mixin.verkauf.pug');
      $ = cheerio.load(html);
      assert.isTrue($("div[data-menu-entry='Verkauf']").hasClass("menu-selected"));
    });

    it("should not render the menu with 'Kontakt' selected", ()=>{
      let html, $;
      html = pug.renderFile(__dirname + '/fixtures/include.menu.mixin.verkauf.pug');
      $ = cheerio.load(html);
      assert.isFalse($("div[data-menu-entry='Kontakt']").hasClass("menu-selected"));
    });

    it("should not render the menu with 'Ankauf' selected", ()=>{
      let html, $;
      html = pug.renderFile(__dirname + '/fixtures/include.menu.mixin.verkauf.pug');
      $ = cheerio.load(html);
      assert.isFalse($("div[data-menu-entry='Ankauf']").hasClass("menu-selected"));
    });
  });

  describe('pug Ankauf page', ()=>{
    it("should not render the menu with 'Verkauf' selected", ()=>{
      let html, $;
      html = pug.renderFile(__dirname + '/fixtures/include.menu.mixin.ankauf.pug');
      $ = cheerio.load(html);
      assert.isFalse($("div[data-menu-entry='Verkauf']").hasClass("menu-selected"));
    });

    it("should not render the menu with 'Kontakt' selected", ()=>{
      let html, $;
      html = pug.renderFile(__dirname + '/fixtures/include.menu.mixin.ankauf.pug');
      $ = cheerio.load(html);
      assert.isFalse($("div[data-menu-entry='Kontakt']").hasClass("menu-selected"));
    });

    it("should render the menu with 'Ankauf' selected", ()=>{
      let html, $;
      html = pug.renderFile(__dirname + '/fixtures/include.menu.mixin.ankauf.pug');
      $ = cheerio.load(html);
      assert.isTrue($("div[data-menu-entry='Ankauf']").hasClass("menu-selected"));
    });
  });

})();
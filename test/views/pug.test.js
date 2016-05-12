(()=> {

  'use strict';

  const assert = require('chai').assert,
    fs = require('fs'),
    path = require('path'),
    pug = require('pug'),
    cheerio = require('cheerio');

  describe('pug', ()=>{


    it("should render menu", ()=>{
      let html,
        $;

      html = pug.renderFile(__dirname + '/fixtures/include.menu.mixin.pug');

      $ = cheerio.load(html);

      assert.isTrue($("div[data-menu-entry='Verkauf']").hasClass("menu-selected"));

    });
  });
})();
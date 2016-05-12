(()=> {

  'use strict';

  const assert = require('chai').assert,
    fs = require('fs'),
    path = require('path'),
    pug = require('pug');


  describe('pug', ()=>{


    it("should render menu", ()=>{
      let includeMenuMixin,
        html;

      includeMenuMixin = fs.readFileSync(__dirname + '/fixtures/include.menu.mixin.pug', 'utf8');

      html = pug.render(includeMenuMixin, {
        doctype : "doctype"
      });
      
      assert.equal(includeMenuMixin, html);

    });


  });

})();
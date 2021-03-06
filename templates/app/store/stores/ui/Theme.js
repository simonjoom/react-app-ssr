// eslint-disable import/no-unresolved
/* eslint-disable max-len */
import { observable } from 'mobx';
import { toggle } from '~/temp/core/decorators';
import _ from 'lodash';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import materialOverrideStyles from '~/temp/styles/_.material.js';

/*
 for debug
 function objectEquals(x, y) {
 'use strict';

 if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
 // after this just checking type of one would be enough
 if (x.constructor !== y.constructor) { return false; }
 // if they are functions, they should exactly refer to same one (because of closures)
 if (x instanceof Function) { return x === y; }
 // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
 if (x instanceof RegExp) { return x === y; }
 if (x === y || x.valueOf() === y.valueOf()) { return true; }
 if (Array.isArray(x) && x.length !== y.length) { return false; }

 // if they are dates, they must had equal valueOf
 if (x instanceof Date) { return false; }

 // if they are strictly equal, they both need to be object at least
 if (!(x instanceof Object)) { return false; }
 if (!(y instanceof Object)) { return false; }

 // recursive object equality check
 var p = Object.keys(x);
 return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
 p.every(function (i) {
 if (!objectEquals(x[i], y[i])){
 console.log(y)
 console.log(i)
 }
 return objectEquals(x[i], y[i]); });
 }
 */

@toggle('toggleTheme', 'toggleThemestate')
export default class Theme {
  mui = {};

  @observable toggleThemestate = true;
  // cache use to not rerun getMuiTheme if the toggle didn't change
  themeSelect = '';
  valuetoggled = true;

  init() {
    console.log('themeinit')
    // before: init(state) {
    // this.mui=state.mui;
  }

  getMui() {
    if (!this.themeSelect || (this.valuetoggled !== this.toggleThemestate)) {
      const mui = (process.env.BROWSER) ? { userAgent: navigator.userAgent } : this.mui;
      this.valuetoggled = this.toggleThemestate;
      if (!this.toggleThemestate) {
        this.themeSelect = getMuiTheme(this.mui, _.merge(
          mui,
          darkBaseTheme,
          materialOverrideStyles,
        ));
      } else {
        this.themeSelect = getMuiTheme(this.mui, _.merge(
          mui,
          lightBaseTheme,
          materialOverrideStyles,
        ));
      }
      return this.themeSelect;
    } else {
      return this.themeSelect;
    }
  }
}

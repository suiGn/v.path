// v.path index.js
/*
ⓝⓔⓤⓡⓞⓝⓢ.ⓜⓔ
🆂🆄🅸🅶🅽                                                                                                                                         
*/
/**
 * @module v.path
 * @description The entry point for the v.path package, which provides various utilities for database management and data security.
 */

import { createPool } from './src/dbs/_dbs.js';
import TheVault from './src/theVault.js';
// ... import any other modules ...

/**
 * The v.path object aggregates all the modules, functions, and classes provided by the package.
 * @type {object}
 */
const vpath = {
  createPool,
  TheVault,
  // ... include other modules ...
};

export default vpath;


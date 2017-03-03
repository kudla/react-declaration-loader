'use strict';

module.exports = reactDeclarationLoader;

function reactDeclarationLoader(source) {

    this.cacheable && this.cacheable();
    
    return source;
}

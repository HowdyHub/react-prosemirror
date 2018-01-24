import menuItems from './menuItems';

class MenuBuilder {
  constructor(docType, schema) {
    this.docType = docType
    this.schema = schema
  }

  pick(menuItems, ...options) {
    if (!options.length) { return menuItems; }

    return options.reduce((picked, option) => {
      if(menuItems.hasOwnProperty(option)) picked[option] = menuItems[option];
      return picked;
    }, {});
  }

  build(options) {
    options = Object.assign({ marks: {}, blocks: {}, inserts: {}, history: {} }, options);
    let menuConfig = {};

    for (let category of Object.keys(options)) {
      menuConfig[category] = this.pick(
        menuItems(this.docType, this.schema)(category),
        ...options[category]
      )
    }

    return menuConfig
  }
}

export default (docType, schema, options = {}) => new MenuBuilder(docType, schema).build(options);

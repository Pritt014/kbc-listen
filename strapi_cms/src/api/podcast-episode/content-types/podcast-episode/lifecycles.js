"use strict";

const slugify = require("slugify");

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;

    if (data.title && !data.slug) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
        trim: true
      });
    }
  },

  beforeUpdate(event) {
    const { data } = event.params;

    if (data.title && !data.slug) {
      data.slug = slugify(data.title, {
        lower: true,
        strict: true,
        trim: true
      });
    }
  }
};

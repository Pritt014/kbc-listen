/**
 * podcast-episode controller
 */

import { factories } from '@strapi/strapi';
import { withDefaultPopulate } from '../../../utils/merge-populate';

const defaultPopulate = {
  poster: true,
  audio_file: true,
  podcast_category: {
    populate: {
      thumbnail: true,
    },
  },
};

export default factories.createCoreController(
  'api::podcast-episode.podcast-episode',
  () => ({
    async find(ctx) {
      ctx.query = withDefaultPopulate(ctx.query, defaultPopulate);

      return await super.find(ctx);
    },

    async findOne(ctx) {
      ctx.query = withDefaultPopulate(ctx.query, defaultPopulate);

      return await super.findOne(ctx);
    },
  })
);

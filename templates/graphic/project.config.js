module.exports = {
  /**
   * A unique identifier that's generated when a project is created.Used to
   * sync up asset and workspace deploys.
   */
  id: '<<id>>',
  /**
   * What project type was passed in on creation.
   */
  projectType: 'graphic',
  /**
   * The destination S3 bucket for a deploy.
   */
  bucket: 'pp-projects-static',
  /**
   * The folder (or "Key" in S3 lingo) to deploy the project into.
   */
  folder: 'graphics/<<slug>>-<<year>>-<<month>>',
  /**
   * The S3 bucket that's used to store raw asset and workspace files.
   */
  assetsBucket: 'pp-projects-static',
  /**
   * Any Google Doc and Google Sheet files to be synced with this project.
   */
  files: [
    {
      fileId: '1ehh3ISrwq5lHNQS-eEs_i30Wi7UAF9txWgYTo56NFBI',
      type: 'doc',
      name: 'text',
    },
    {
      fileId: '1EACmSpajC1V7nJtwIxfA9aR-HAbTSDugSjStSSKWEaE',
      type: 'sheet',
      name: 'data',
    },
  ],
  /**
   * The dataMutators option makes it possible to modify what's returned by
   * the data fetchers. This is a good place to restructure the raw data, or
   * to do joins with other data you may have.
   *
   * Example:
   * dataMutators: {
   *   // the function name should match one of the `name` values in `files`
   *   votes(originalData) {
   *   // what you return in this function is what ends up in the JSON file
   *   return originalData;
   * },
  },
   */
  dataMutators: {},

  /**
   * `createAPI` makes it possible to bake out a series of JSON files that get
   * deployed with your project. This is a great way to break up data that users
   * only need a small slice of based on choices they make. The toolkit expects
   * this to return an array of objects. Each object should have a "key" and
   * a "value" - the "key" determines the URL, the "value" is what is saved at
   * that URL.
   */
  createAPI(data) {
    return null;
  },

  /**
   * Where custom filters for Nunjucks can be added. Each key should be the
   * name of the filter, and each value should be a function it will call.
   *
   * (journalize comes built in and does not need to be added manually.)
   *
   * Example:
   * customFilters: {
   *   square: (val) => val * val;
   * };
   *
   * Then in your templates:
   * {{ num|square }}
   *
   */
  customFilters: {},
};

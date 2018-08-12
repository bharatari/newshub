const data = require('../../utils/data');
const utils = require('../../utils/upload');
const multer = require('koa-multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const fileType = require('file-type');
const _ = require('lodash');

const spacesEndpoint = new aws.Endpoint(process.env.SPACES_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.SPACE_NAME,
    acl: 'public-read',
    key(request, file, cb) {
      cb(null, `files/${Date.now().toString()}-${file.originalname}`);
    },
    metadata(req, file, cb) {
      cb(null, { fileName: file.originalname, userId: req.headers['newshub-user-id'] });
    },
  }),
  fileFilter(req, file, cb) {
    if (utils.isValidFile(file.originalname)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  }
});

module.exports = (router) => {
  router.post('/api/file', upload.array('file', 6), async (ctx, next) => {
    const files = ctx.req.files;
    let response = utils.processResponse(files);

    if (response.length == 1) {
      response = files[0];
    }

    try {
      data.respond(ctx, response, next);
    } catch (e) {
      data.handleError(ctx, e, next);
    }
  });
};

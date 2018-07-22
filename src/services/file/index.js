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
      cb(null, `images/${Date.now().toString()}-${file.originalname}`);
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
    try {
      data.respond(ctx, 'Uploaded files successfully', next);
    } catch (e) {
      data.handleError(ctx, e, next);
    }
  });
};

const path = require('path');

module.exports = {
  supportedFileTypes: ['jpg', 'jpeg', 'png', 'heic', 'psd', 'zip', 'pdf', 'docx', 'odt'],
  isValidFile(fileName) {
    // We can't check magic numbers because
    // we don't have access to the actual
    // file buffer

    /*
    if (utils.supportedFileTypes.includes(fileType(file).ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
    */

    // Multer might implement magic number support in the future
    // but this is our only option for checking file types
    // for now
    const ext = path.extname(fileName);
    const type = ext.substring(1);

    return this.supportedFileTypes.includes(type);
  },
  processResponse(files) {
    for (let i = 0; i < files.length; i++) {
      files[i].url = `${files[i].location}`;
    }

    return files;
  }
};

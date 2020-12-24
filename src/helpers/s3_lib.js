const aws = require('aws-sdk');

const s3Bucket = process.env.S3_BUCKET;

aws.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4'
});

const s3 = new aws.S3();

const uploadToS3Bucket = ({ albumName, file }) => new Promise((resolve, reject) => {
  try {
    const fileName = file.name;
    const fileData = file.data;
    const albumKey = `${encodeURIComponent(albumName)}/`;
    const fileKey = albumKey + fileName;
    s3.upload({
      Bucket: s3Bucket,
      Key: fileKey,
      Body: fileData,
      ACL: 'public-read',
    }, (err, data) => {
      if (err) throw new Error(err.message);
      console.log('File upload is done', data);
      resolve(data);
    });
  } catch (error) {
    console.info('Error in file upload', error);
    reject(error);
  }
});

const deleteFileFromS3 = (fileUrl) => {
  try {
		const fileKey = fileUrl.split('.com/')[1];
    return s3.deleteObject({ Bucket: s3Bucket,  Key: fileKey }, (err, data) => {
      if (err) throw new Error(err.message);
      console.log('Successfully deleted photo.', data);
      return data;
    });
  } catch (error) {
    console.log('error in deletePhoto', error);
    return error;
  }
};

module.exports = {
	uploadToS3Bucket,
	deleteFileFromS3
};

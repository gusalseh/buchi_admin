const getS3Url = (fileName) => {
  return `https://${'team01-buchi-bucket'}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};

module.exports = {
  getS3Url,
};

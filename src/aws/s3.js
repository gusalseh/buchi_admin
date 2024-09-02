const { s3 } = require('.');
const { GetObjectCommand } = require('@aws-sdk/client-s3');

const streamToBuffer = async (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
};

const getFile = async (directory) => {
  const params = {
    Bucket: 'team01-buchi-bucket',
    Key: directory,
  };

  try {
    const command = new GetObjectCommand(params);
    console.log('1.command:', command);
    const data = await s3.send(command);
    console.log('2.data:', data);

    const fileBuffer = await streamToBuffer(data.Body);
    return fileBuffer;
  } catch (error) {
    console.error('Error fetching file from S3:', error);
    throw error;
  }
};

module.exports = { getFile };
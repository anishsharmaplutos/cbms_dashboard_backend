import { Storage } from "@google-cloud/storage";
import * as path from 'path';

async function uploadFile(localFileName: string, destination: string): Promise<string> {
  try {
    const bucketName: string = process.env.BUCKET_NAME || "test132223";
    const projectId: string = process.env.BUCKET_PROJECT_ID || "plutosone-dev-project";
    const keyFilename: string = path.resolve(__dirname, '..', '..', 'bucket', 'json', 'uploadImages.json');
    let modifiedKeyFilename: string = keyFilename.replace(/\\dist\\/, '\\');
    const storage: Storage = new Storage({
      projectId,
      keyFilename: modifiedKeyFilename,
    });
    const data = await storage.bucket(bucketName).upload(localFileName, {
      destination,
      resumable: true, // Set to true for large files
    });
    return `https://storage.googleapis.com/${bucketName}/${destination}`;
  } catch (err) {
    throw err;
  }
}

export default uploadFile;

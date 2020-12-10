const {S3} = require('aws-sdk')
require('dotenv').config()

class AWSservice {
    constructor() {
        this.key=process.env.AWS_ID
        this.secret=process.env.AWS_SECRET
        this.bucket='gaiary'
        this.s3=null
    }

    init() {
        this.s3 = new S3({
            accessKeyId: this.key,
            secretAccessKey: this.secret,
            region: 'us-east-2'
        })
    }

    async upload(fileConfig) {
        const file = await this.s3.upload({
            ACL: "public-read",
            Bucket: this.bucket,
            ...fileConfig
        }).promise()
        return file.Location
    }
}

module.exports = new AWSservice()
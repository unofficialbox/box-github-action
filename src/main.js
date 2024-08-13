const core = require('@actions/core')
const github = require('@actions/github')
const BoxSDK = require('box-node-sdk')
const fs = require('fs')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const boxClientId = core.getInput('box_client_id', { required: true })
    const boxClientSecret = core.getInput('box_client_secret', { required: true })
    const boxSubjectType = core.getInput('box_subject_type', { required: true })
    const boxSubjectId = core.getInput('box_subject_id', { required: true })
    const boxFolderId = core.getInput('box_folder_id', { required: true })
    const boxFileName = core.getInput('box_file_name', { required: true })
    const localFilePath = core.getInput('localFilePath', { required: true })

    const sdkConfig = {
      boxAppSettings: {
        clientID: boxClientId,
        clientSecret: boxClientSecret
      },
      enterpriseID: boxSubjectId //The enterprise id in this case is optional and can be ommited.
    }

    const sdk = BoxSDK.getPreconfiguredInstance(sdkConfig)
    let client
    if(boxSubjectType === 'enterprise') {
      client = sdk.getAnonymousClient()
    } else {
      client = sdk.getCCGClientForUser(boxSubjectId)
    }

    const fileStream = fs.createReadStream(localFilePath)
    const uploadResponse = await client.files.uploadFile(
      boxFolderId,
      boxFileName,
      fileStream
    )
    core.info(`Uploaded file with response:  ${uploadResponse}`)
    
    core.setOutput('file_id', uploadResponse.entries[0].id)
    // Output the payload for debugging
    core.info(
      `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
    )
  } catch (error) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}

# Box Github Action

This action uploads a file to Box. 

## Usage

Here's an example of how to use this action in a workflow file:

```yaml
name: Box Example Upload

on:
  workflow_dispatch:
    inputs:
      box_client_id:
        description: Box Client Id for Client Credentials Grant Authentication
        required: true
        type: string
      box_client_secret:
        description: Box Client Secret
        required: true
        type: string
      box_subject_type:
        description: Box Subject Type (user or enterprise)
        required: true
        type: string
      box_subject_id:
        description: Box Subject Id
        required: true
        type: string
      box_folder_id:
        description: Parent folder for the file upload
        required: true
        default: '0'
        type: string
      box_file_name: 
        description: Name of the file to upload
        required: true
        type: string
      local_file_path: 
        description: Path of the source file
        required: true
        type: string

jobs:
  box-upload:
    name: Box File Upload
    runs-on: ubuntu-latest

    steps:
      - name: Upload to Box
        id: upload-to-box
        uses: unofficialbox/box-github-action@main
        with:
          box_client_id: ${{ inputs.box_client_id }}
          box_client_secret: ${{ inputs.box_client_secret }}
          box_subject_type: ${{ inputs.box_subject_type }}
          box_subject_id: ${{ inputs.box_subject_id }}
          box_folder_id: ${{ inputs.box_folder_id}}
          box_file_name:  ${{ inputs.box_file_name }}
          local_file_path: ${{ inputs.local_file_path }} 
```

For example workflow runs, check out the
[Actions tab](https://github.com/unofficialbox/box-github-action/actions)!
:rocket:

## Inputs

| Input               | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `box_client_id`     | Box Client Id for Client Credentials Grant Authentication |
| `box_client_secret` | Box Client Secret                                         |
| `box_subject_type`  | Box Subject Type (user or enterprise)                     |
| `box_subject_id`    | Box Subject Id                                            |
| `box_folder_id`     | Parent folder for the file upload                         |
| `box_file_name`     | Name of the file to upload                                |
| `local_file_path`   | Path of the source file                                   |


## Outputs

| Output        | Description                             |
| ------------- | --------------------------------------- |
| `box_file_id` | Id of the file that was uploaded to Box |

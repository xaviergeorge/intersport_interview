# Backend for Intersport E-commerce Platform

## Overview

This directory contains the backend services for the Intersport e-commerce platform. The backend is structured to use Google Cloud Functions for different functionalities.

## Directory Structure

```

backend

│ openapi.yaml
│ package.json
│
└───functions
    ├───addToCart
    ├───auth
    ├───getProducts

```

Each subdirectory within `functions` represents a separate cloud function. For specifics on each function, refer to the `README.md` file within its respective directory.
Each function inside the `functions` directory is a standalone cloud function. To deploy each function, follow the instructions provided in the `README.md` file within its respective subdirectory. These READMEs contain specific steps tailored to deploying and configuring each function individually.

## API Gateway

We use Google API Gateway to manage and deploy these functions as APIs. The configuration for the API Gateway is specified in the `openapi.yaml` file.

### OpenAPI Configuration

The `openapi.yaml` file contains the paths and configurations for each API endpoint. Each function's URL is specified here, and it's important to update these URLs whenever a cloud function is redeployed.

## Deploying API Gateway

To deploy your API Gateway and make your cloud functions accessible via HTTP endpoints, follow these steps:

## Create an API

### Validate the project ID:

```sh
gcloud config list project
```

### If necessary, set your project ID:

```sh
gcloud config set project PROJECT_ID
```

### Create the API:

```sh
gcloud api-gateway apis create API_ID --project=PROJECT_ID
```

### View API details:

```sh
gcloud api-gateway apis describe API_ID --project=PROJECT_ID
```

## Deploy API Config to a Gateway

### Validate or set your project ID:

```sh
gcloud config list project
gcloud config set project PROJECT_ID
```

### Deploy the API config:

```sh
gcloud api-gateway gateways create GATEWAY_ID \
  --api=API_ID --api-config=CONFIG_ID \
  --location=GCP_REGION --project=PROJECT_ID
```

## Important Notes

- Ensure the `host` and `x-google-endpoints` in `openapi.yaml` are correctly set to reflect your API Gateway's host.
- Update the `address` for each function in `openapi.yaml` after deploying or updating cloud functions.

For more detailed instructions on each function, please refer to the individual README files in the function directories.

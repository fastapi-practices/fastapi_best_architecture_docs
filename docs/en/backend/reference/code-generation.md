---
title: Code Generation
---

::: tip
After code generation, still review layered naming, response models, pagination, transactions, permissions, and formatting with [fba skills](https://skills.sh/fastapi-practices/skills/fba). Do not treat generated output as final code.
:::

::: tip
This feature currently applies only to the backend project and does not include frontend code.
:::

::: warning
API calls alone cannot preview code generation results intuitively. They must be used with the frontend project. See [Preview](#preview).
:::

## Concepts

The code generator is driven by API calls and includes two modules: **Business** and **Model**.

### Business

Contains code-generation configuration. See: `backend/plugin/code_generator/model/business.py`

### Model

Contains the model column information required for code generation, similar to defining model columns normally. Supported features are currently limited.

## Usage

1. Start the backend service and operate directly from the Swagger docs
2. Send API requests via a third-party API debugging tool
3. Start both frontend and backend and operate from the UI

API parameters are mostly documented — please check them carefully.

### F. Fully Manual Mode

Not recommended (the manual create-business API is marked as deprecated)

1. Manually add a business record via the create-business API
2. Manually add model columns via the model create API
3. Call the preview, disk-write, and download APIs to perform code generation

### S. Automatic Mode

Recommended

1. Call the `tables` API to get the list of database table names
2. Use the `imports` API to import existing database table data (business and model data are created automatically)
3. Call the preview, disk-write, and download APIs to perform code generation

## Preview

![cg1](/images/code-generator1.png)

![cg2](/images/code-generator2.png)

Simple [Next.js](https://nextjs.org/) project that expects POST requests from [PayButton](paybutton.org) and validates their authenticity.

This [Next.js](https://nextjs.org/) project is designed to receive and validate POST requests from [PayButton](https://paybutton.org), ensuring their authenticity. It uses cryptographic verification to confirm that the requests originate from the expected source, utilizing the user's public key associated with their PayButton account. 

## Getting Started

To use this project and validate POST requests from PayButton, follow these steps:

1. **Obtain Your Public Key:** Log in to your [PayButton](https://paybutton.org) account and navigate to the **Account** section to find your user's public key.
2. **Configure Environment Variables:** Update the `.env` file in the project directory to include your public key. For example, `PUBLIC_KEY=302a300506032b6570032100615255850442064c84af43736133257cc0bf57a0da5c92baeb4be4856c43c420`.
3. **Start the Server:** Launch the server by running `yarn dev` in your terminal.

### Setting Up PayButton Triggers

To configure your server to receive POST requests from PayButton, follow these steps:

1. Go to [PayButton](https://paybutton.org), create a PayButton, and select it to access its configuration options.
2. In the "When a transaction is received..." section, enter the details for triggering the POST request:
   - **Endpoint URL:** Provide the URL where your server is listening for POST requests. If you're running the server locally, this might be something like `http://192.168.0.1:3000/show-triggers`.
   - **POST Data JSON:** Specify the JSON payload to include with the request, ensuring it contains the key-value pair `"signature": <signature>`.

1. Your server endpoint URL (if running this locally, it would be something like `192.168.0.1:3000`) e.g. `http://192.168.0.1:3000/show-triggers`
2. The POST data JSON you want to include with the key-value pair `"signature": <signature>`. 


After configuring the trigger, any transactions made to the address associated with that PayButton will be logged by your server.
This setup enables real-time validation of transactions, streamlining the process of confirming payments and enhancing the security of your PayButton integrations.

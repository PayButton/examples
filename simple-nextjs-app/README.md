Simple [Next.js](https://nextjs.org/) project that expects POST requests from [PayButton](paybutton.org) and validates their authenticity.

## Getting Started

1. Get you user's public key by logging in to [PayButton](paybutton.org) and acessing the **Account** view.
2. Change `.env` to include your public key, e.g. `PUBLIC_KEY=302a300506032b6570032100615255850442064c84af43736133257cc0bf57a0da5c92baeb4be4856c43c420`
3. Run the server with `yarn dev`.

Configure a PayButton Trigger by going into [PayButton](paybutton.org), creating a PayButton, clicking on it, and filling the form "When a transaction is received...":
1. Your server endpoint URL (if running this locally, it would be something like `192.168.0.1:3000`) e.g. `http://192.168.0.1:3000/show-triggers`
2. The POST data JSON you want to include with the key-value pair `"signature": <signature>`. 

Now when an address belong to that PayButton receives a transaction, you should see it in the running server logs.


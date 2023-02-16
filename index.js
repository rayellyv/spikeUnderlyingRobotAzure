const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

  // set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
  const key = "";
  const endpoint = "";

  // sample document
  const formUrl = ""

  async function main() {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-document", formUrl);

    const {keyValuePairs} = await poller.pollUntilDone();

    if (!keyValuePairs || keyValuePairs.length <= 0) {
        console.log("No key-value pairs were extracted from the document.");
    } else {
        console.log("Key-Value Pairs:");
        for (const {key, value, confidence} of keyValuePairs) {
            console.log("- Key  :", `"${key.content}"`);
            console.log("  Value:", `"${(value && value.content) || "<undefined>"}" (${confidence})`);
        }
    }

}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});
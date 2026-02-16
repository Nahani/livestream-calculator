const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const fs = require("fs");
const path = require("path");

initializeApp({
  credential: applicationDefault(),
});

async function listAllEmails(nextPageToken) {
  const emails = [];
  const auth = getAuth();

  async function fetchPage(pageToken) {
    const result = await auth.listUsers(1000, pageToken);
    result.users.forEach((user) => {
      if (user.email) {
        emails.push(user.email);
      }
    });
    if (result.pageToken) {
      await fetchPage(result.pageToken);
    }
  }

  await fetchPage(nextPageToken);
  return emails;
}

async function main() {
  const emails = await listAllEmails();
  const csv = ["email", ...emails].join("\n");
  const outputPath = path.join(__dirname, "users.csv");
  fs.writeFileSync(outputPath, csv, "utf-8");

  console.log(`${emails.length} email(s) exporté(s) dans ${outputPath}`);
}

main().catch((err) => {
  console.error("Erreur:", err.message);
  process.exit(1);
});

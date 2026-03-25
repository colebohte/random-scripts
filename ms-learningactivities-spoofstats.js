// Fancy Name:  Microsoft Learning Activities Stats Spoofer
// Description: Use this script in the JS console in any browser to spoof your leaderboard stats in MS Learning Activities.

const activityId = "YOUR_ACTIVITY_ID"; // Paste the Id for your Microsoft Learning Activity
const bearerToken = "YOUR_ANON_ACCESS_TOKEN"; // Paste the anon access token here, REMOVE THE "Bearer" TEXT FROM THE BEGINING BEFORE PASTING, Refer to reference 1 at the bottom

const payload = {}; // Paste in your modified stats payload

const res = await fetch(
  `https://learningactivities.edu.cloud.microsoft/api/me/activities/${activityId}/complete`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/plain, */*",
      "Authorization": `Bearer ${bearerToken}`,
      "x-session-id": "0c19dcb2-6434-4aa9-911b-e216058b79a6",
      "routetonewleact": "true",
    },
    body: JSON.stringify(payload),
  }
);

console.log("Status:", res.status);
console.log("Response:", await res.text() || "(empty)");

// References:
// 1:   User CTRL+SHIFT+I, Navigate to the Network Tab, Find a request, find the "Authorization" header, and copy its data.

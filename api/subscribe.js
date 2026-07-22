const KLAVIYO_API_URL = "https://a.klaviyo.com/api";
const KLAVIYO_REVISION = "2026-07-15";

const PET_LABELS = {
  dog: "Dog",
  cat: "Cat",
  other: "Another Pet",
};

const CHALLENGE_LABELS = {
  "separation-anxiety": "Stress & Anxiety",
  sleep: "Better Sleep",
  "loud-noises": "Loud Noises",
  travel: "Travel & Car Rides",
  "general-anxiety": "Restlessness",
  other: "Separation / Being Alone",
};

const RECOMMENDATION_LABELS = {
  "separation-anxiety": "Daily Calm Routine",
  sleep: "Bedtime Calm Routine",
  "loud-noises": "Comfort & Reassurance Routine",
  travel: "On-the-Go Calm Routine",
  "general-anxiety": "Everyday Balance Routine",
  other: "Personalized Calm Routine",
};

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(payload));
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

async function readRequestBody(request) {
  if (request.body && typeof request.body === "object") return request.body;

  if (typeof request.body === "string") {
    return JSON.parse(request.body || "{}");
  }

  let rawBody = "";
  for await (const chunk of request) rawBody += chunk;
  return JSON.parse(rawBody || "{}");
}

async function klaviyoRequest(path, apiKey, body) {
  const response = await fetch(`${KLAVIYO_API_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      revision: KLAVIYO_REVISION,
    },
    body: JSON.stringify(body),
  });

  const responseText = await response.text();
  let responseBody = null;

  if (responseText) {
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = { raw: responseText };
    }
  }

  if (!response.ok) {
    const error = new Error(`Klaviyo request failed with status ${response.status}.`);
    error.status = response.status;
    error.details = responseBody;
    throw error;
  }

  return responseBody;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { ok: false, error: "Method not allowed." });
  }

  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    console.error("Missing KLAVIYO_PRIVATE_API_KEY or KLAVIYO_LIST_ID.");
    return sendJson(response, 500, {
      ok: false,
      error: "The quiz integration is not configured yet.",
    });
  }

  try {
    const body = await readRequestBody(request);
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const petType = body.petType;
    const mainChallenge = body.mainChallenge;

    if (!isValidEmail(email)) {
      return sendJson(response, 400, { ok: false, error: "A valid email is required." });
    }

    if (!PET_LABELS[petType] || !CHALLENGE_LABELS[mainChallenge]) {
      return sendJson(response, 400, { ok: false, error: "Quiz answers are incomplete." });
    }

    const submittedAt = new Date().toISOString();
    const source = "Pet Quiz | Popup | V1";
    const properties = {
      $source: source,
      pet_type: PET_LABELS[petType],
      main_challenge: CHALLENGE_LABELS[mainChallenge],
      recommended_routine: RECOMMENDATION_LABELS[mainChallenge],
      quiz_completed: true,
      quiz_source: source,
      quiz_version: "V1",
      offer: "$30 OFF",
      submitted_at: submittedAt,
    };

    // First create or update the profile and its quiz properties.
    await klaviyoRequest("/profile-import", apiKey, {
      data: {
        type: "profile",
        attributes: {
          email,
          properties,
        },
      },
    });

    // Then record email marketing consent and subscribe the profile to the test list.
    await klaviyoRequest("/profile-subscription-bulk-create-jobs", apiKey, {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: "SUBSCRIBED",
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: listId,
            },
          },
        },
      },
    });

    return sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error(
      "Klaviyo quiz submission failed:",
      JSON.stringify(
        {
          message: error.message,
          status: error.status,
          details: error.details,
        },
        null,
        2
      )
    );

    return sendJson(response, 502, {
      ok: false,
      error: "We could not save your quiz results. Please try again.",
    });
  }
}

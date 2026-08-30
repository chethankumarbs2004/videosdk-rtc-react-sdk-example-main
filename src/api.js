const VIDEO_API_BASE_URL = "https://api.videosdk.live";
const MONGO_API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN;
const API_AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const saveUserToMongo = async ({ name, email }) => {
  const response = await fetch(`${MONGO_API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Could not save user to MongoDB");
  }

  return response.json();
};

export const getToken = async () => {
  if (VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API"
    );
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();
    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${VIDEO_API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options)
  const data = await response.json()

  if (data.roomId) {
    return { meetingId: data.roomId, err: null }
  } else {
    return { meetingId: null, err: data.error }
  }

};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${VIDEO_API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options)

  if (response.status === 400) {
    const data = await response.text()
    return { meetingId: null, err: data }
  }

  const data = await response.json()

  if (data.roomId) {
    return { meetingId: data.roomId, err: null }
  } else {
    return { meetingId: null, err: data.error }
  }

};

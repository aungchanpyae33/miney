/* eslint-disable @next/next/no-img-element */
import { getUserDynamicProfileCache } from "@/database/serverCacheData";
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const alt = "User Profile Image";

export const contentType = "image/jpeg";

// Image generation
export default async function Image(props: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await props.params;
  const { data, status } = await getUserDynamicProfileCache(user);

  if (!data || status !== 200) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "25px",
          color: "black",
        }}
      >
        <div style={{ fontSize: 40, width: "90%", textAlign: "center" }}>
          User Not Found
        </div>
      </div>,
      { ...size },
    );
  }
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "25px",
        color: "black",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50px",
          right: "200px",
        }}
      >
        <img
          src="https://miney-bubble.vercel.app/logo.svg"
          width={130}
          height={34.7}
          alt="logo"
        />
      </span>
      {data.profile_avatar_url ? (
        <img
          width="300"
          height="300"
          src={data.profile_avatar_url}
          style={{
            borderRadius: 128,
          }}
          alt="User Avatar"
        />
      ) : (
        <svg
          width="300"
          height="300"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#52525b"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      )}
    </div>,
    { ...size },
  );
}

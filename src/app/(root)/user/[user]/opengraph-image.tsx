/* eslint-disable @next/next/no-img-element */
import { getUserDynamicProfileCache } from "@/database/serverCacheData";
import { ImageResponse } from "next/og";
export const runtime = "edge";
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
  const { data, error, status } = await getUserDynamicProfileCache(user);

  if (!data || status !== 200 || error) return null;
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
          width={200}
          height={53.4}
          alt="logo"
        />
      </span>
      {data.profile_avatar_url ? (
        <img
          width="300"
          height="300"
          src={data.profile_avatar_url}
          style={{
            borderRadius: 150,
          }}
          alt="User Avatar"
        />
      ) : (
        <svg
          width="300"
          height="300"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 20 20"
          fill="#52525b"
          xmlSpace="preserve"
        >
          <g>
            <path
              fillRule="evenodd"
              d="M10 0c5.514 0 10 4.486 10 10s-4.486 10-10 10S0 15.514 0 10 4.486 0 10 0zm6.24 15a7.99 7.99 0 0 1-12.48 0 7.99 7.99 0 0 1 12.48 0zM10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              clipRule="evenodd"
            />
          </g>
        </svg>
      )}
    </div>,
    { ...size },
  );
}

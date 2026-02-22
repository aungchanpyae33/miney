import { getUserDynamicProfileCache } from "@/database/serverCacheData";
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image(props: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await props.params;
  const { data, status } = await getUserDynamicProfileCache(user);
  if (!data || status !== 200) {
    return new ImageResponse(<div>User Not Found</div>, { ...size });
  }
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a", // match your dark theme
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "60px",
        color: "white",
      }}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={data.profile_avatar_url}
        width="400"
        height="400"
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
        alt={`${data.text_name}'s profile picture`}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 80, fontWeight: "bold" }}>{data.text_name}</div>
        <div style={{ fontSize: 50, opacity: 0.7 }}>
          {data.text_select_gender}
        </div>
      </div>
    </div>,
    { ...size },
  );
}

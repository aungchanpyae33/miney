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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="300"
            height="300"
            x="0"
            y="0"
            viewBox="0 0 33 33"
            enableBackground="new 0 0 512 512"
            xmlSpace="preserve"
            className=""
          >
            <g>
              <g fill="#333">
                <path
                  fillRule="evenodd"
                  d="M32.827 26.976a6 6 0 1 1-12 0 6 6 0 0 1 12 0zM24.12 24.27a1 1 0 0 1 1.414 0l1.293 1.293 1.293-1.293a1 1 0 1 1 1.414 1.414l-1.292 1.293 1.292 1.293a1 1 0 0 1-1.414 1.414l-1.293-1.293-1.293 1.293a1 1 0 0 1-1.414-1.414l1.293-1.293-1.293-1.293a1 1 0 0 1 0-1.414z"
                  clipRule="evenodd"
                  fill="#333333"
                  opacity="1"
                  data-original="#333333"
                ></path>
                <path
                  d="M16.82 1c-8.826 0-16 7.173-16 16 0 8.826 7.174 16 16 16 1.442 0 2.84-.191 4.17-.55a7.972 7.972 0 0 1-2.166-5.474c0-.877.141-1.722.402-2.511a22.926 22.926 0 0 0-1.608-.313c-1.005-.177-1.852-1.175-2.377-2.234 1.03-.906 1.878-2.345 2.61-3.98.356-.267.677-.8.823-1.413.208-.878-.036-1.593-.543-1.59-.019-.013-.075 0-.109.008l-.018.004c.193-1.271.383-2.702-.09-3.939C17.507 9.634 15.757 8 12.806 8c-2.954 0-4.702 1.634-5.106 3.008-.484 1.229-.283 2.674-.094 3.94l-.006-.002c-.034-.008-.085-.02-.12-.012-.505-.002-.748.713-.54 1.59.145.614.466 1.147.822 1.414.732 1.634 1.58 3.073 2.61 3.98-.526 1.058-1.374 2.057-2.378 2.234-.943.148-1.926.367-2.816.627A13.938 13.938 0 0 1 2.822 17c0-7.72 6.28-13.998 13.999-13.998 7.734 0 13.998 6.263 13.998 13.998 0 .987-.103 1.95-.298 2.88a8.02 8.02 0 0 1 1.76 1.247c.352-1.317.54-2.7.54-4.127 0-8.827-7.174-16-16-16z"
                  fill="#333333"
                  opacity="1"
                  data-original="#333333"
                ></path>
                <path
                  d="M22.91 19.998a4.77 4.77 0 0 1-.317-.56c.75-.679 1.368-1.759 1.9-2.984.26-.2.494-.6.6-1.06.084-.367.087-1.297-.487-1.184.14-.955.28-2.024-.067-2.954C24.244 10.226 22.97 9 20.821 9c-.761 0-1.413.154-1.95.398.9 1.247 1.128 3.074.654 4.803.567.345 1.059.916.937 1.917-.091.745-.47 1.595-1.236 2.347-.334.878-1.072 2.65-2.003 3.514.471.401 1.555.618 2.496.805l.258.052a8.04 8.04 0 0 1 2.932-2.838z"
                  fill="#333333"
                  opacity="1"
                  data-original="#333333"
                ></path>
              </g>
            </g>
          </svg>
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

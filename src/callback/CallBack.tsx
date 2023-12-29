import EmptyState from "@/components/EmptyState/page";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallBack = () => {
  const history = useNavigate();

  useEffect(() => {
    // throw error
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce<{ [key: string]: string }>((acc, pair) => {
        const [key, value] = pair.split("=");
        acc[key] = value;
        return acc;
      }, {});

    const token = hash.access_token;
    if (!token) {
      console.error("Access token not found in hash:", hash);
      return;
    }
    const tokenObject = {
      access_token: token,
      token_type: hash.token_type,
      expires_in: hash.expires_in,
    };

    localStorage.setItem("spotify_token", JSON.stringify(tokenObject));
    window.location.assign("/");
  }, [history]);

  return (
    <div className="w-full relative mx-auto">
      <div className="">
        <div className="bg-[#000]  min-h-[100vh]">
          <EmptyState title="Logging..." subTitle="Please wait an moment..." />
        </div>
      </div>
    </div>
  );
};

export default CallBack;

import axios from "axios";
import { Buffer } from "buffer";

export const generateProjectLogo = (projectName: string, projectColor: string) => {
  const projectLetter = projectName.substring(0, 1).toUpperCase();

  return (
    <div
      style={{
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "30px",
        backgroundColor: projectColor,
      }}
    >
      {projectLetter}
    </div>
  );
};

export const getImageFromUrl = async (url: string) => {
  const base64Image = Buffer.from(
    (
      await axios.get(url, {
        method: "GET",
        responseType: "arraybuffer",
      })
    ).data,
    "binary",
  ).toString("base64");

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={`data:image/jpg;base64, ${base64Image}`} alt="Project Logo" width="30px" height="auto" />
    </div>
  );
};

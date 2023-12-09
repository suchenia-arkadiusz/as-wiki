import { generateProjectLogo, getImageFromUrl } from "./utils.tsx";
import { ReactNode, useEffect, useState } from "react";

type ProjectLogoProps = {
  projectName: string;
  projectColor: string;
  logoUrl?: string;
};

const ProjectLogo = (props: ProjectLogoProps) => {
  const { projectName, logoUrl, projectColor } = props;
  const [logo, setLogo] = useState<ReactNode>(undefined);

  useEffect(() => {
    logoUrl && logoUrl.length > 0
      ? getImageFromUrl(logoUrl).then((result) => setLogo(result))
      : setLogo(generateProjectLogo(projectName, projectColor));
  }, []);

  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        border: "1px solid #B5B5B5",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {logo}
    </div>
  );
};

export default ProjectLogo;

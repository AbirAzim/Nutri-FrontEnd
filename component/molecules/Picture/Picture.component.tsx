import { Blurhash } from "react-blurhash";
import Image from "next/image";
import { Fragment, useState } from "react";

const DEFAULT_HASH = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";
interface PictureProps {
  hash: string;
  url: string;
}

const Picture = (props: PictureProps) => {
  const { hash, url } = props;
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleLoad = () => {
    setHasLoaded(true);
  };

  return (
    <Fragment>
      {!hasLoaded && (
        <Blurhash
          hash={hash || DEFAULT_HASH}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      <Image
        src={url || "/images/no-image.png"}
        alt={""}
        layout={"fill"}
        objectFit={"cover"}
        onLoadingComplete={handleLoad}
      />
    </Fragment>
  );
};

Picture.defaultProps = {
  hash: DEFAULT_HASH,
};

export default Picture;

import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={1200}
    height={660}
    viewBox="0 0 1216 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    title=""
    {...props}
  >
    <rect x="0" y="16" rx="10" ry="10" width="536" height="140" />
    <rect x="0" y="196" rx="10" ry="10" width="536" height="140" />
    <rect x="0" y="376" rx="10" ry="10" width="536" height="140" />
    <rect x="0" y="556" rx="10" ry="10" width="536" height="140" />
    <rect x="636" y="16" rx="10" ry="10" width="536" height="560" />
  </ContentLoader>
);

export default Loader;

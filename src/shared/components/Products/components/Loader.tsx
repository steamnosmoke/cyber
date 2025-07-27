import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={650}
    viewBox="0 0 300 650"
    backgroundColor="#dfdfdf"
    foregroundColor="#cfcfcf"
  >
    <rect x="30" y="70" rx="15" ry="15" width="240" height="300" />
    <rect x="30" y="410" rx="15" ry="15" width="240" height="80" />
    <rect x="110" y="530" rx="8" ry="8" width="80" height="30" />
    <rect x="30" y="570" rx="15" ry="15" width="240" height="55" />
  </ContentLoader>
);

export default MyLoader;

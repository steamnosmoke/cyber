import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <div className="container flex justify-between items-center mt-40">
    <ContentLoader
      speed={2}
      width={536}
      height={480}
      viewBox="0 0 536 480"
      backgroundColor="#cdcdcd"
      foregroundColor="#969696"
    >
      <path d="M6.42 19a7.668 7.668 0 1 0 -0.81 -10.3c2.62 -3.38 7.89 -2.82 9.74 1.05c0.26 0.54 1.03 0.54 1.29 0c1.85 -3.87 7.12 -4.43 9.74 -1.05l0.41 0.53a6.93 6.93 0 1 0 -0.73 9.31l-9.39 8.82l-0.67 0.45h-0.01l-0.67-0.45L6.42 19z" />

      <rect x="0" y="0" rx="15" ry="15" width="100" height="100" />
      <rect x="0" y="124" rx="15" ry="15" width="100" height="100" />
      <rect x="0" y="248" rx="15" ry="15" width="100" height="100" />
      <rect x="0" y="372" rx="15" ry="15" width="100" height="100" />
      <rect x="136" y="0" rx="20" ry="20" width="400" height="480" />
    </ContentLoader>

    <ContentLoader
      speed={2}
      width={536}
      height={750}
      viewBox="0 0 536 750"
      backgroundColor="#dedede"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="10" ry="10" width="300" height="80" />
      <rect x="0" y="108" rx="6" ry="6" width="200" height="50" />
      <rect x="0" y="178" rx="8" ry="8" width="100" height="32" />
      <circle cx="127" cy="194" r="16" />
      <circle cx="168" cy="194" r="16" />
      <circle cx="207" cy="194" r="16" />

      <rect x="0" y="230" rx="8" ry="8" width="124" height="50" />
      <rect x="140" y="230" rx="8" ry="8" width="124" height="50" />
      <rect x="280" y="230" rx="8" ry="8" width="124" height="50" />
      <rect x="420" y="230" rx="8" ry="8" width="124" height="50" />

      <rect x="0" y="300" rx="8" ry="8" width="168" height="64" />
      <rect x="184" y="300" rx="8" ry="8" width="168" height="64" />
      <rect x="368" y="300" rx="8" ry="8" width="168" height="64" />
      <rect x="0" y="380" rx="8" ry="8" width="168" height="64" />
      <rect x="184" y="380" rx="8" ry="8" width="168" height="64" />
      <rect x="368" y="380" rx="8" ry="8" width="168" height="64" />

      <rect x="0" y="460" rx="10" ry="10" width="536" height="120" />

      <rect x="0" y="600" rx="10" ry="10" width="452" height="64" />
      <rect x="472" y="600" rx="10" ry="10" width="64" height="64" />

      <rect x="0" y="674" rx="10" ry="10" width="158" height="58" />
      <rect x="190" y="674" rx="10" ry="10" width="158" height="58" />
      <rect x="380" y="674" rx="10" ry="10" width="158" height="58" />
    </ContentLoader>
  </div>
);

export default MyLoader;

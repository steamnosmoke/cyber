import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader 
    speed={2}
    width={536}
    height={480}
    viewBox="0 0 536 480"
    backgroundColor="#cc0f0f"
    foregroundColor="#969696"
  >
    <path d="M 6.42 19 a 7.668 7.668 0 1 -0.81 -10.3 c 2.62 -3.38 7.89 -2.82 9.74 1.05 c 0.26 0.54 1.03 0.54 1.29 0 c 1.85 -3.87 7.12 -4.43 9.74 -1.05 l 0.41 0.53 a 6.93 6.93 0 1 -0.73 9.31 l -9.39 8.82 l -0.67 0.45 h -0.01 l -0.67 -0.45 L 6.42 19 z" /> 
    <rect x="0" y="0" rx="15" ry="15" width="100" height="100" /> 
    <rect x="0" y="124" rx="15" ry="15" width="100" height="100" /> 
    <rect x="0" y="248" rx="15" ry="15" width="100" height="100" /> 
    <rect x="0" y="372" rx="15" ry="15" width="100" height="100" /> 
    <rect x="136" y="0" rx="20" ry="20" width="400" height="480" />
  </ContentLoader>
)

export default MyLoader
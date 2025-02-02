import { PropsWithChildren } from "react"
import CardMotionWrapper from "./CardMotionWrapper"

const ExplorerCardMotionWrapper = ({ children }: PropsWithChildren<any>) => (
  <CardMotionWrapper
    animateOnMount={
      process.browser ? document?.activeElement?.id === "searchBar" : false
    }
  >
    {children}
  </CardMotionWrapper>
)

export default ExplorerCardMotionWrapper

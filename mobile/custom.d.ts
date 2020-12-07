/* Fix ts error for importing svgs */

declare module '*.svg' {
  const content: any
  export default content
}

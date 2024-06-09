export const isVideo = (url: string) => {
  const videoExtensions = [
    '.mpg',
    '.mp2',
    '.mpeg',
    '.mpe',
    '.mpv',
    '.mp4',
    '.avi',
    '.mov',
    '.webm',
    '.mkv',
  ]
  return videoExtensions.some((ext) => url.toLowerCase().includes(ext))
}

export const moveItemToFrontOfArray = (array: any[], value: any): any[] => {
  if (array.findIndex((item) => item == value) > 0) {
    return [value, ...array.filter((item) => item !== value)]
  }
  return array
}

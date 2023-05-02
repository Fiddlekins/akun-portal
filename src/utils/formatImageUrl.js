export default function formatImageUrl (url, options) {
  const width = options && options.width
  const height = (options && options.width) ?? width
  const crop = (options && options.crop) ?? true

  let newUrl = akunImageParseFunction(url, width, height, crop, null, 'cdn3.fiction.live')
  return newUrl
  // return `http://localhost:5050/akunproxy/${encodeURIComponent(newUrl)}`;
}

function akunImageParseFunction (url, width, height, i, r, cdn) {
  if (url) {
    if (typeof url == 'object') {
      url = url[0]
    }
    var a
    if (r) {
      a = true
    }
    if (width && height) {
      if (i) {
        if (a) {
          if (url.indexOf('filepicker.io') == -1) {
            return url.replace(/(\w+)\.cloudfront.net\/(.+)/g, 'cdn4.fiction.live/$2?height=' + height + '&width=' + width + '&quality=95').replace(/cdn3.fiction.live\/(.+)/g, 'cdn4.fiction.live/$1?height=' + height + '&width=' + width + '&quality=95')
          } else {
            return url.replace(/www\.filepicker\.io\/api\/file\/(\w+)/g, 'cdn4.fiction.live/fp/$1?height=' + height + '&width=' + width + '&quality=95')
          }
        } else if (url.indexOf('filepicker.io') == -1) {
          return url.replace(/cdn3.fiction.live\/(.+)/g, 'cdn4.fiction.live/$1?height=' + height + '&width=' + width + '&quality=95')
        } else {
          return url.replace(/www\.filepicker\.io\/api\/file\/(\w+)/g, 'cdn4.fiction.live/fp/$1?height=' + height + '&width=' + width + '&quality=95')
        }
      } else if (url.indexOf('filepicker.io') == -1) {
        return url.replace(/(\w+)\.cloudfront.net\/(.+)/g, 'cdn4.fiction.live/$2?height=' + height + '&width=' + width + '&quality=95&aspect_ratio=' + width + ':' + height).replace(/cdn3.fiction.live\/(.+)/g, 'cdn4.fiction.live/$1?height=' + height + '&width=' + width + '&quality=95&aspect_ratio=' + width + ':' + height)
      } else {
        return url.replace(/www\.filepicker\.io\/api\/file\/(\w+)/g, 'cdn4.fiction.live/fp/$1?height=' + height + '&width=' + width + '&quality=95&aspect_ratio=' + width + ':' + height)
      }
    } else {
      return url.replace(/(\w+)\.cloudfront.net/g, cdn).replace(/www\.filepicker\.io\/api\/file\/(\w+)/g, 'cdn4.fiction.live/fp/$1')
    }
  }
}

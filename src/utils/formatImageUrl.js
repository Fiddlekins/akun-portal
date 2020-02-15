export default function formatImageUrl(url, options) {
	const width = options && options.width;
	const height = (options && options.width) ?? width;
	const crop = (options && options.crop) ?? true;

	const newUrl = new URL(url);
	switch (true) {
		case newUrl.host.endsWith('filepicker.io'): {
			const fileNameMatch = newUrl.pathname.match(/^\/api\/file\/([\w.-]+?)(?:\/convert)?$/);
			if (!fileNameMatch) {
				throw new Error(`Couldn't parse image url: ${url}`);
			}
			const fileName = fileNameMatch[1];
			newUrl.search = '';
			if (options) {
				newUrl.pathname = `/api/file/${fileName}/convert`;
				newUrl.searchParams.append('h', height);
				newUrl.searchParams.append('w', width);
				newUrl.searchParams.append('fit', crop ? 'crop' : 'max');
			} else {
				newUrl.pathname = `/api/file/${fileName}`;
			}
		}
			break;
		case newUrl.host.endsWith('.cloudfront.net'): {
			newUrl.host = 'cdn.fiction.live';
			const fileNameMatch = newUrl.pathname.match(/^\/images\/([\w.-]+?)$/);
			if (!fileNameMatch) {
				throw new Error(`Couldn't parse image url: ${url}`);
			}
			const fileName = fileNameMatch[1];
			newUrl.search = '';
			if (options) {
				// @see https://github.com/tripviss/image-resizer
				if (crop) {
					newUrl.pathname = `/h${height}-w${width}-cfill/images/${fileName}`;
				} else {
					newUrl.pathname = `/h${height}-w${width}/images/${fileName}`;
				}
			} else {
				newUrl.pathname = `/images/${fileName}`;
			}
		}
			break;
		default:
			console.warn(`Couldn't parse image url: ${url}`);
			return url;
	}

	return newUrl.toString();
}

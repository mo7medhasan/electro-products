import { getCleanImageUrl } from './formatUrl';

describe('getCleanImageUrl', () => {
  it('returns original URL if not a google imgres URL', () => {
    const url = 'https://example.com/image.png';
    expect(getCleanImageUrl(url)).toBe(url);
  });

  it('extracts and decodes imgurl parameter from google imgres URL', () => {
    const rawUrl = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fexample.com%2Fimage.png&imgrefurl=...';
    expect(getCleanImageUrl(rawUrl)).toBe('https://example.com/image.png');
  });

  it('handles invalid URLs gracefully and returns original', () => {
    const invalidUrl = 'not-a-valid-url google.com/imgres';
    expect(getCleanImageUrl(invalidUrl)).toBe(invalidUrl);
  });
});

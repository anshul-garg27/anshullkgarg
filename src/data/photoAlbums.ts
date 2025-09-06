import type { PhotoAlbum } from '@/types/photos';

// Export the album data so PhotosSection can import it
export const photoAlbums: PhotoAlbum[] = [
    {
        id: 'cur-1',
        title: 'Nature & Trails',
        cover: '/anshullkgarg/images/curated/mountain-clouds-ridge-2022-10-05.jpg',
        count: 14,
        palette: ['#0b1e3a', '#6b5a3a', '#a9b7c7', '#223a2f'],
        location: 'India',
        date: '2021-11-13 – 2023-05-28',
        description: 'Curated landscapes and nature paths captured on the road.',
        photos: [
          {
            id: 'cur-1-1',
            src: '/anshullkgarg/images/curated/mountain-clouds-ridge-2022-10-05.jpg',
            title: 'Clouds Draped Over Pine Ridge',
            location: 'Mountainous region',
            date: '2022-10-05',
            dominantColor: '#0b1e3a',
            tags: ['landscape', 'mountain', 'forest', 'clouds', 'ridge', 'moody'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QKORXhpZgAATU0AKgAAAAgABgEOAAIAAAAbAAAAVgEPAAIAAAAIAAAAcgEQAAIAAAAJAAAAegExAAIAAAAgAAAAhAEyAAIAAAAUAAAApIdpAAQAAAABAAAAuAAAAABSZW1hc3RlckRpcmVjdG9yXzQ3ZTU4ZDQzMAAAc2Ftc3VuZwBTTS1TOTA4RQAAQWRvYmUgTGlnaHRyb29tIDcuNS4xIChBbmRyb2lkKQAyMDIyOjEwOjA1IDE1OjQ3OjE5AAAYgpoABQAAAAEAAAHegp0ABQAAAAEAAAHmiCIAAwAAAAEAAgAAiCcAAwAAAAEAKAAAkAMAAgAAABQAAAHukAQAAgAAABQAAAICkgEACgAAAAEAAAIWkgIABQAAAAEAAAIekgMACgAAAAEAAAImkgQACgAAAAEAAAIukgUABQAAAAEAAAI2kgcAAwAAAAEAAwAAkggAAwAAAAEAAAAAkgkAAwAAAAEAAAAAkgoABQAAAAEAAAI+koYABwAAAAkAAAJGkpAAAgAAAAQwMTYAkpEAAgAAAAQwMTYAkpIAAgAAAAQwMTYAoAEAAwAAAAEAAQAAoAIABAAAAAEAAAAYoAMABAAAAAEAAAAgpAUAAwAAAAEA5gAApDQAAgAAADUAAAJQAAAAAAAAAAEAAAMgAAAAMQAAAAoyMDIyOjEwOjA1IDE1OjQ3OjE5ADIwMjI6MTA6MDUgMTU6NDc6MTkAAAB+nQAADSEAAR3dAAA+VwAABCMAAABkAAAAAAAAAAEAAACpAAAAZAAAAIgAAAAFQVNDSUkAAABlAFNhbXN1bmcgR2FsYXh5IFMyMiBVbHRyYSBSZWFyIFN1cGVyIFRlbGVwaG90byBDYW1lcmEAAP/hCyBodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczphdXg9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvYXV4LyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTEwLTA1VDE1OjQ3OjE5KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0xMC0wNVQxNTo0NzoxOSIgYXV4OkxlbnM9IlNhbXN1bmcgR2FsYXh5IFMyMiBVbHRyYSBSZWFyIFN1cGVyIFRlbGVwaG90byBDYW1lcmEiIHBob3Rvc2hvcDpEYXRlQ3JlYXRlZD0iMjAyMi0xMC0wNVQxNTo0NzoxOSI+IDxkYzpkZXNjcmlwdGlvbj4gPHJkZjpBbHQ+IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+UmVtYXN0ZXJEaXJlY3Rvcl80N2U1OGQ0MzA8L3JkZjpsaT4gPC9yZGY6QWx0PiA8L2RjOmRlc2NyaXB0aW9uPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+AP/tAJxQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAYxwBWgADGyVHHAIAAAIAAhwCPwALMTU0NzE5KzA1MzAcAj4ACDIwMjIxMDA1HAJ4ABpSZW1hc3RlckRpcmVjdG9yXzQ3ZTU4ZDQzMBwCNwAIMjAyMjEwMDUcAjwABjE1NDcxOQA4QklNBCUAAAAAABCZz2km8CmBs08se8JIbU/s/8AAEQgAIAAYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAgICAgICAwICAwUDAwMFBgUFBQUGCAYGBgYGCAoICAgICAgKCgoKCgoKCgwMDAwMDA4ODg4ODw8PDw8PDw8PD//bAEMBAgICBAQEBwQEBxALCQsQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEP/dAAQAAv/aAAwDAQACEQMRAD8A/Sr/AIWfY+ItBl0TVrWX7TGflmmAQ5HdlPI9BXb6F4jHlSQyKgnuYDHGzABflGQCfQjmvhX4Aftl6b8R9WtvCvxIa0tvEN8RDDfqiJb32cbY/wDZlPPGAG/h5IFfUfi+fUrXXtPTSlWONmBaVQAIk6ZGRjoMEfpXdVoyg/ZyVjnUk/eTufQ/hSzlnFxFdAeTIMIxGeMevFdR/wAIzp//AD1H/fI/xrnNBMlopkuZgxdVKqx45HbHFdN/aaekf6V5NRtvQ6Ef/9D8frbW9KikS4tnkERcCIKxLIIzkkKMHJ4x6V+if7Ov7e0+iXtp4Q+MM095p4IW21NyXmhQjG24zkyoP7+Sw77h0/Ij7dcmUTLJtYHORxTze3UsjStKd57g449PpX6Vio0q8eWZ4lLBuEuaLsf1I3fxu8C6TGdTsvEUUcqqkkQeXfCyScjYU3dsHjtWX/w1ZpH/AEMdh/33L/8AEV/Mlp3iHXNGmW506+lhdOF2u2Bj2zjiuj/4Wp4//wCgzP8A99V5aybDrRt/gayde+jX4n//2Q==',
            story: {
              id: 'curated-mountain',
              title: 'Storm Over the Ridge',
              photos: ['/anshullkgarg/images/curated/mountain-clouds-ridge-2022-10-05.jpg'],
              duration: 4000
            }
          },
          {
            id: 'cur-1-2',
            src: '/anshullkgarg/images/curated/vine-pergola-path-2021-12-08.jpg',
            title: 'Vine Pergola Path',
            location: 'Garden walkway',
            date: '2021-12-08',
            dominantColor: '#6b5a3a',
            tags: ['nature', 'pergola', 'path', 'leaves', 'dappled-light', 'wood'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            placeholder: 'data:image/jpeg;base64,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',
            story: {
              id: 'curated-pergola',
              title: 'Walkway in Dappled Light',
              photos: ['/anshullkgarg/images/curated/vine-pergola-path-2021-12-08.jpg'],
              duration: 4000
            }
          },
          {
            id: 'cur-1-3',
            src: '/anshullkgarg/images/curated/succulent-rosette-macro-2021-11-15.jpg',
            title: 'Succulent Rosette Macro',
            location: 'Botanical garden',
            date: '2021-11-15',
            dominantColor: '#3ba545',
            tags: ['macro', 'succulent', 'rosette', 'green', 'nature'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA8ADwAAD/4QOKRXhpZgAATU0AKgAAAAgACgEPAAIAAAAIAAAAhgEQAAIAAAAHAAAAjgESAAMAAAABAAEAAAEaAAUAAAABAAAAlgEbAAUAAAABAAAAngEoAAMAAAABAAIAAAExAAIAAAALAAAApgEyAAIAAAAUAAAAsodpAAQAAAABAAAAxoglAAQAAAABAAACtAAAAABPbmVQbHVzAEFDMjAwMQAAAAAA8AAAAAEAAADwAAAAAUx1bWluYXIgQUkAADIwMjE6MTE6MTUgMTA6NDE6MDkAAB6CmgAFAAAAAQAAAjSCnQAFAAAAAQAAAjyIIgADAAAAAQAAAACIJwADAAAAAQBkAACQAAAHAAAABDAyMjCQAwACAAAAFAAAAkSQBAACAAAAFAAAAliRAQAHAAAABAECAwCSAQAKAAAAAQAAAmySAgAFAAAAAQAAAnSSAwAKAAAAAQAAAnySBAAKAAAAAQAAAoSSBQAFAAAAAQAAAoySBwADAAAAAQACAACSCAADAAAAAQAVAACSCQADAAAAAQAQAACSCgAFAAAAAQAAApSSkAACAAAABwAAApySkQACAAAABwAAAqSSkgACAAAABwAAAqygAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAAABigAwAEAAAAAQAAACCiFwADAAAAAQAAAACjAQAHAAAAAQAAAACkAgADAAAAAQAAAACkAwADAAAAAQAAAACkBQADAAAAAQAAAACkBgADAAAAAQAAAAAAAAAAAAAAAQAAAWkAAAAJAAAABTIwMjE6MTE6MTUgMTA6NDE6MDkAMjAyMToxMToxNSAxMDo0MTowOQAAAGwXAAAMuQAAIisAABZRAAAAAAAAAAH/////AAAAAgAAIisAABZRAAAALwAAAAowMDA2MzMAADAwMDYzMwAAMDAwNjMzAAAACQAAAAEAAAAEAgMAAAABAAIAAAACTgAAAAACAAUAAAADAAADJgADAAIAAAACRQAAAAAEAAUAAAADAAADPgAFAAEAAAABAAAAAAAGAAUAAAABAAADVgAHAAUAAAADAAADXgAdAAIAAAALAAADdgAAAAAAAAALAAAAAQAAABkAAAABAAADkwAAAGQAAABMAAAAAQAAACoAAAABAAAO4wAAAGQAAFM1AAAACgAAAAUAAAABAAAACwAAAAEAAAAJAAAAATIwMjE6MTE6MTUAAP/AABEIACAAGAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAICAgICAgMCAgMFAwMDBQYFBQUFBggGBgYGBggKCAgICAgICgoKCgoKCgoMDAwMDAwODg4ODg8PDw8PDw8PDw//2wBDAQICAgQEBAcEBAcQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/3QAEAAL/2gAMAwEAAhEDEQA/APWvhB4z8Pa7rEAvrU216xaz1K3mj2SRuRsbzEcA8g4IYcg18z+NvjB8Xfg9rUvw68J3f9mSaIZYpZIoV3T7pX2MCwIVAgXaBjv9BreOPE+nx2dp8Trq2lsvGWmNCshtCklrq0JyAkkiZUlQMq4+dR8pypwGeI9Zt/ixYwfEbxSLbRdQliFpLbxsS0/lgFWWNzuLFeCB3Ge5r+RZZnGnH2k03G+ie9+q037prRp9z47G41qHLF67npnwG8Saj4m8H2E2vRQafF4dN4ZBFH5UcjyFGExVcLlVZwcAZY+ua9v/AOEs8If9BaH/AL5avBtN1S0k+HC6L8Kle6gdWhubgxlJIZEGWVgeVYbtwPPLDbnqPNP+Ee+JP/QQu/8Av5J/8TXgx4jSck2oavR7/Pt/ka08XyxSbuz/0MP4MeAJvHltq2jx6za6hf6fbtP5L27EqZQwiVt2xSzlTsB9M8V6B4x+FngvVvBQ1hJ7hNVf5bZr22VWgmhO3ywNhG5JPl2qe3U5rxz4WeMNK+H/AIgu/FHwj0ZJdJt5Y7XUp5rhnudTuANy/vCWCGHdnG1s79uOSR7lJ4/ePwdeeL5NPhsYLnXIX020yztHLJL5ZeRmwWTeTIMBcE46cV/H+K+p0YRleSqSa0a1u7NaLRX6rtvrdHy9OjStZbnzD43uNb8KeHorW4tLvTINUmS4lUkoBMEHykKRyBzzzyK8g/4Sib/n8uv+/jf/ABVfeEHiXR/GmmHwR8QrL7Tb6oVewuItr3MFyzNuiKuCJE3g7QwwARjGc1B/wzl4D/54al/4LrP/AOIrPLa1OFO1SDvfom/yT/M5P7KUtYPQ/9k=',
            story: {
              id: 'curated-succulent',
              title: 'Fractal Greens',
              photos: ['/anshullkgarg/images/curated/succulent-rosette-macro-2021-11-15.jpg'],
              duration: 4000
            }
          },
          {
            id: "img-mountain-river-2022-10-08",
            src: "/anshullkgarg/images/converted-images/mountain-river-golden-hour-2022-10-08.jpg",
            title: "Mountain River at Golden Hour",
            location: "Himalayas, India (likely)",
            date: "2022-10-08",
            dominantColor: "#6aa7c5",
            tags: ["landscape", "river", "mountains", "forest", "golden-hour"],
            views: 2987,
            likes: 221,
            aspectRatio: 0.563,
            width: 675,
            height: 1200,
            placeholder: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBM... (short)",
            story: {
              id: "story-river-golden",
              title: "Glacial Water, Warm Light",
              photos: [
                "/anshullkgarg/images/converted-images/mountain-river-golden-hour-2022-10-08.jpg",
                "/anshullkgarg/images/curated/mountain-clouds-ridge-2022-10-05.jpg"
              ],
              duration: 5000
            }
          },
          {
            id: 'cur-1-5',
            src: '/anshullkgarg/images/converted-images/varkala-cliff-beach-2023-05-28.jpg',
            title: 'Varkala Cliff Beach',
            location: 'Varkala, Kerala, India',
            date: '2023-05-28',
            dominantColor: '#66a9e0',
            tags: ['beach', 'cliff', 'coast', 'palm', 'blue-sky'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            story: {
              id: 'story-varkala',
              title: 'Evening at the Cliff',
              photos: ['/anshullkgarg/images/converted-images/varkala-cliff-beach-2023-05-28.jpg'],
              duration: 4500
            }
          },
          {
            id: 'cur-1-6',
            src: '/anshullkgarg/images/converted-images/mossy-tree-roots-forest-2023-03-23.jpg',
            title: 'Mossy Tree Roots',
            location: 'Rainforest trail',
            date: '2023-03-23',
            dominantColor: '#3d5f3a',
            tags: ['forest', 'roots', 'moss', 'texture', 'nature'],
            views: 0,
            likes: 0,
            aspectRatio: 683 / 1200,
            width: 683,
            height: 1200,
            story: {
              id: 'story-roots',
              title: 'Roots After Rain',
              photos: ['/anshullkgarg/images/converted-images/mossy-tree-roots-forest-2023-03-23.jpg'],
              duration: 4000
            }
          },
          {
            id: 'cur-1-7',
            src: '/anshullkgarg/images/converted-images/bare-branches-monochrome-2021-11-14.jpg',
            title: 'Bare Branches (Monochrome)',
            location: 'Hillside grove',
            date: '2021-11-14',
            dominantColor: '#222222',
            tags: ['trees', 'branches', 'black-and-white', 'minimal'],
            views: 0,
            likes: 0,
            aspectRatio: 617 / 1200,
            width: 617,
            height: 1200,
            story: {
              id: 'story-branches-bw',
              title: 'Winter Silhouettes',
              photos: ['/anshullkgarg/images/converted-images/bare-branches-monochrome-2021-11-14.jpg'],
              duration: 4000
            }
          }
          ,
          {
            id: 'cur-1-8',
            src: '/anshullkgarg/images/converted-images/stone-steps-roots-closeup-2021-11-14.jpg',
            title: 'Stone Steps and Roots (Close-up)',
            location: 'Forest stone path',
            date: '2021-11-14',
            dominantColor: '#3b332a',
            tags: ['forest', 'roots', 'stone', 'texture'],
            views: 0,
            likes: 0,
            aspectRatio: 594 / 1200,
            width: 594,
            height: 1200,
            story: {
              id: 'story-stone-steps',
              title: 'Roots Beside the Stones',
              photos: ['/anshullkgarg/images/converted-images/stone-steps-roots-closeup-2021-11-14.jpg'],
              duration: 4000
            }
          },
          {
            id: 'cur-1-9',
            src: '/anshullkgarg/images/converted-images/stonewalk-forest-trail-2021-11-14.jpg',
            title: 'Stonewalk Through Forest',
            location: 'Monsoon trail',
            date: '2021-11-14',
            dominantColor: '#4a4a4a',
            tags: ['trail', 'stone', 'forest', 'path'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            story: {
              id: 'story-stonewalk',
              title: 'Wet Stones After Rain',
              photos: ['/anshullkgarg/images/converted-images/stonewalk-forest-trail-2021-11-14.jpg'],
              duration: 4000
            }
          },
          {
            id: 'cur-1-10',
            src: '/anshullkgarg/images/converted-images/mountain-forest-slope-2022-10-06.jpg',
            title: 'Mountain Forest Slope',
            location: 'Himalayan foothills',
            date: '2022-10-06',
            dominantColor: '#2f4f2f',
            tags: ['mountain', 'forest', 'slope', 'hills'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            story: {
              id: 'story-forest-slope',
              title: 'Ridge and Pines',
              photos: ['/anshullkgarg/images/converted-images/mountain-forest-slope-2022-10-06.jpg'],
              duration: 4500
            }
          },
          {
            id: 'cur-1-11',
            src: '/anshullkgarg/images/converted-images/hill-lake-view-2021-11-13.jpg',
            title: 'Hill Overlooking Lake',
            location: 'Forest valley',
            date: '2021-11-13',
            dominantColor: '#5a7b4f',
            tags: ['hill', 'lake', 'forest', 'valley'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            story: {
              id: 'story-hill-lake',
              title: 'Clearing in the Canopy',
              photos: ['/anshullkgarg/images/converted-images/hill-lake-view-2021-11-13.jpg'],
              duration: 4500
            }
          },
          {
            id: 'cur-1-12',
            src: '/anshullkgarg/images/converted-images/coastal-promenade-palms-2023-03-26.jpg',
            title: 'Coastal Promenade Palms',
            location: 'Coastal town',
            date: '2023-03-26',
            dominantColor: '#6db0d6',
            tags: ['coast', 'palms', 'promenade', 'blue-sky'],
            views: 0,
            likes: 0,
            aspectRatio: 839 / 1200,
            width: 839,
            height: 1200,
            story: {
              id: 'story-coastal-promenade',
              title: 'Windy Shoreline Walk',
              photos: ['/anshullkgarg/images/converted-images/coastal-promenade-palms-2023-03-26.jpg'],
              duration: 4500
            }
          },
          {
            id: 'cur-1-13',
            src: '/anshullkgarg/images/converted-images/seaside-park-palms-2023-03-26.jpg',
            title: 'Seaside Park with Palms',
            location: 'Beachfront park',
            date: '2023-03-26',
            dominantColor: '#67a9c8',
            tags: ['beach', 'palms', 'park', 'coast'],
            views: 0,
            likes: 0,
            aspectRatio: 675 / 1200,
            width: 675,
            height: 1200,
            story: {
              id: 'story-seaside-park',
              title: 'Playground by the Sea',
              photos: ['/anshullkgarg/images/converted-images/seaside-park-palms-2023-03-26.jpg'],
              duration: 4000
            }
          },
          {
            id: 'cur-1-14',
            src: '/anshullkgarg/images/converted-images/beach-sunset-glow-2023-03-23.jpg',
            title: 'Beach Sunset Glow',
            location: 'West coast',
            date: '2023-03-23',
            dominantColor: '#f0a35a',
            tags: ['beach', 'sunset', 'ocean', 'golden-hour'],
            views: 0,
            likes: 0,
            aspectRatio: 675 / 1200,
            width: 675,
            height: 1200,
            story: {
              id: 'story-beach-sunset',
              title: 'Last Light on the Waves',
              photos: ['/anshullkgarg/images/converted-images/beach-sunset-glow-2023-03-23.jpg'],
              duration: 4500
            }
          }
  
        ]
      },
      {
        id: 'cur-5',
        title: 'Minimal & Abstract',
        cover: '/anshullkgarg/images/converted-images/triangle-lamp-webs-2022-09-28.jpg',
        count: 1,
        palette: ['#f2a840', '#3b2a1a', '#cccccc', '#1a1a1a'],
        location: 'Indoors',
        date: '2022-09-28',
        description: 'Geometric and minimal compositions.',
        photos: [
          {
            id: 'abst-1',
            src: '/anshullkgarg/images/converted-images/triangle-lamp-webs-2022-09-28.jpg',
            title: 'Triangle Lamp with Webs',
            location: 'Ambient interior',
            date: '2022-09-28',
            dominantColor: '#f2a840',
            tags: ['lamp', 'geometry', 'abstract', 'indoor'],
            views: 0,
            likes: 0,
            aspectRatio: 1200 / 1200,
            width: 1200,
            height: 1200,
            story: {
              id: 'story-triangle-lamp',
              title: 'Warm Light and Webs',
              photos: ['/anshullkgarg/images/converted-images/triangle-lamp-webs-2022-09-28.jpg'],
              duration: 4000
            }
          }
        ]
      },
      {
        id: 'cur-6',
        title: 'Village Sunset Series',
        cover: '/anshullkgarg/images/converted-images/village-sunset-kiosk-2023-03-23-1.jpg',
        count: 2,
        palette: ['#f0a35a', '#c07040', '#2a2a2a', '#1a1a1a'],
        location: 'Village',
        date: '2023-03-23',
        description: 'Golden sun over rural kiosks and palms.',
        photos: [
          {
            id: 'vs-1',
            src: '/anshullkgarg/images/converted-images/village-sunset-kiosk-2023-03-23-1.jpg',
            title: 'Village Sunset Kiosk I',
            location: 'Village',
            date: '2023-03-23',
            dominantColor: '#f0a35a',
            tags: ['village', 'sunset', 'kiosk', 'palms'],
            views: 0,
            likes: 0,
            aspectRatio: 1024 / 768,
            width: 1024,
            height: 768,
            story: {
              id: 'story-vs-1',
              title: 'Evening Stop I',
              photos: ['/anshullkgarg/images/converted-images/village-sunset-kiosk-2023-03-23-1.jpg'],
              duration: 4000
            }
          },
          {
            id: 'vs-2',
            src: '/anshullkgarg/images/converted-images/village-sunset-kiosk-2023-03-23-2.jpg',
            title: 'Village Sunset Kiosk II',
            location: 'Village',
            date: '2023-03-23',
            dominantColor: '#f0a35a',
            tags: ['village', 'sunset', 'kiosk', 'palms'],
            views: 0,
            likes: 0,
            aspectRatio: 1024 / 768,
            width: 1024,
            height: 768,
            story: {
              id: 'story-vs-2',
              title: 'Evening Stop II',
              photos: ['/anshullkgarg/images/converted-images/village-sunset-kiosk-2023-03-23-2.jpg'],
              duration: 4000
            }
          }
        ]
      },
      {
        id: 'cur-7',
        title: 'Urban Night',
        cover: '/anshullkgarg/images/converted-images/apartment-courtyard-night-bw-2021-02-15.jpg',
        count: 1,
        palette: ['#111111', '#2a2a2a', '#e0e0e0', '#555555'],
        location: 'City',
        date: '2021-02-15',
        description: 'Black‑and‑white urban nighttime scenes.',
        photos: [
          {
            id: 'urban-1',
            src: '/anshullkgarg/images/converted-images/apartment-courtyard-night-bw-2021-02-15.jpg',
            title: 'Apartment Courtyard (Night, B&W)',
            location: 'Urban complex',
            date: '2021-02-15',
            dominantColor: '#111111',
            tags: ['architecture', 'night', 'urban', 'black-and-white'],
            views: 0,
            likes: 0,
            aspectRatio: 540 / 1200,
            width: 540,
            height: 1200,
            story: {
              id: 'story-apartment-bw',
              title: 'Quiet Courtyard',
              photos: ['/anshullkgarg/images/converted-images/apartment-courtyard-night-bw-2021-02-15.jpg'],
              duration: 4500
            }
          }
        ]
      },
      {
        id: 'cur-2',
        title: 'Heritage & Night',
        cover: '/anshullkgarg/images/converted-images/heritage-haveli-night-facade-2023-04-29.jpg',
        count: 8,
        palette: ['#0b1733', '#a57b4e', '#f4e1b6', '#1a1a1a'],
        location: 'Rajasthan, India',
        date: '2021-11-13 – 2024-08-23',
        description: 'Heritage architecture and low-light minimal scenes.',
        photos: [
          {
            id: "img-haveli-night-2023-04-29",
            src: "/anshullkgarg/images/converted-images/heritage-haveli-night-facade-2023-04-29.jpg",
            title: "Haveli Facade at Blue Hour",
            location: "Jaipur, India (likely)",
            date: "2023-04-29",
            dominantColor: "#0b1733",
            tags: ["architecture", "heritage", "facade", "blue-hour", "urban-night"],
            views: 2104,
            likes: 163,
            aspectRatio: 1.333,
            width: 4000,
            height: 3000,
            placeholder: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QMS... (short)",
            story: {
              id: "story-haveli",
              title: "Amber Glow Under Indigo Sky",
              photos: [
                "/anshullkgarg/images/converted-images/heritage-haveli-night-facade-2023-04-29.jpg",
                "/anshullkgarg/images/converted-images/stone-fort-wall-trail-2021-12-25.jpg"
              ],
              duration: 6000
            }
          },
          {
            id: "img-fort-trail-2021-12-25",
            src: "/anshullkgarg/images/converted-images/stone-fort-wall-trail-2021-12-25.jpg",
            title: "Stone Fort Wall Trail",
            location: "Rajasthan, India (likely)",
            date: "2021-12-25",
            dominantColor: "#a57b4e",
            tags: ["heritage", "fort", "trail", "architecture", "sunny"],
            views: 1764,
            likes: 132,
            aspectRatio: 0.686,
            width: 823,
            height: 1200,
            placeholder: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QHI... (short)",
            story: {
              id: "story-fort-trail",
              title: "Walk Along the Old Ramparts",
              photos: [
                "/anshullkgarg/images/converted-images/stone-fort-wall-trail-2021-12-25.jpg",
                "/anshullkgarg/images/converted-images/heritage-haveli-night-facade-2023-04-29.jpg"
              ],
              duration: 5500
            }
          },
          {
            id: "img-bw-tealight-2021-11-25",
            src: "/anshullkgarg/images/converted-images/bw-tealight-niche-2021-11-25.jpg",
            title: "Tealight in Niche (B&W Minimal)",
            location: "Indoors",
            date: "2021-11-25",
            dominantColor: "#0a0a0a",
            tags: ["minimal", "black-and-white", "candle", "low-light", "moody"],
            views: 1243,
            likes: 96,
            aspectRatio: 0.724,
            width: 869,
            height: 1200,
            placeholder: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA8ADwAAD/4QOK... (short)",
            story: {
              id: "story-tealight",
              title: "Quiet Light, Loud Silence",
              photos: [
                "/anshullkgarg/images/converted-images/bw-tealight-niche-2021-11-25.jpg",
                "/anshullkgarg/images/curated/mountain-clouds-ridge-2022-10-05.jpg"
              ],
              duration: 5000
            }
          },
          {
            id: 'hn-4',
            src: '/anshullkgarg/images/converted-images/jaipur-sun-through-chhatri-2024-08-23.jpg',
            title: 'Sun Through Chhatri',
            location: 'Jaipur, India',
            date: '2024-08-23',
            dominantColor: '#f2a045',
            tags: ['architecture', 'sunset', 'silhouette', 'chhatri', 'Jaipur'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            story: {
              id: 'story-chhatri-sun',
              title: 'Golden Hour Silhouette',
              photos: ['/anshullkgarg/images/converted-images/jaipur-sun-through-chhatri-2024-08-23.jpg'],
              duration: 4500
            }
          },
          {
            id: 'hn-5',
            src: '/anshullkgarg/images/converted-images/jaipur-hawa-mahal-2022-09-18.jpg',
            title: 'Hawa Mahal Facade',
            location: 'Jaipur, India',
            date: '2022-09-18',
            dominantColor: '#d1785d',
            tags: ['architecture', 'heritage', 'palace', 'Jaipur', 'facade'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            story: {
              id: 'story-hawa-mahal',
              title: 'Windows of Wind',
              photos: ['/anshullkgarg/images/converted-images/jaipur-hawa-mahal-2022-09-18.jpg'],
              duration: 4500
            }
          }
          ,
          {
            id: 'hn-6',
            src: '/anshullkgarg/images/converted-images/gopuram-temple-bluehour-2021-12-10.jpg',
            title: 'Temple Gopuram at Blue Hour',
            location: 'South India',
            date: '2021-12-10',
            dominantColor: '#1f3d8a',
            tags: ['temple', 'gopuram', 'blue-hour', 'reflection'],
            views: 0,
            likes: 0,
            aspectRatio: 1200 / 675,
            width: 1200,
            height: 675,
            story: {
              id: 'story-gopuram',
              title: 'Lights by the Sacred Tank',
              photos: ['/anshullkgarg/images/converted-images/gopuram-temple-bluehour-2021-12-10.jpg'],
              duration: 5000
            }
          },
          {
            id: 'hn-9',
            src: '/anshullkgarg/images/converted-images/dusk-village-lane-2021-11-13.jpg',
            title: 'Dusk Village Lane',
            location: 'Rural settlement',
            date: '2021-11-13',
            dominantColor: '#3e3e3e',
            tags: ['village', 'lane', 'dusk', 'street'],
            views: 0,
            likes: 0,
            aspectRatio: 709 / 1200,
            width: 709,
            height: 1200,
            story: {
              id: 'story-village-lane',
              title: 'Evening Walk',
              photos: ['/anshullkgarg/images/converted-images/dusk-village-lane-2021-11-13.jpg'],
              duration: 4000
            }
          }
        ]
      },
      {
        id: 'cur-3',
        title: 'Culinary & Lifestyle',
        cover: '/anshullkgarg/images/converted-images/woodfired-pizza-jalapeno-2021-12-28.jpg',
        count: 2,
        palette: ['#b83d2a', '#c96f37', '#f1d0a5', '#3a2a1a'],
        location: 'India',
        date: '2021-12-27 – 2021-12-28',
        description: 'Comfort food and cozy table scenes.',
        photos: [
          {
            id: 'food-1',
            src: '/anshullkgarg/images/converted-images/italian-baked-pasta-garlic-bread-2021-12-27.jpg',
            title: 'Italian Baked Pasta with Garlic Bread',
            location: 'Restaurant table',
            date: '2021-12-27',
            dominantColor: '#c96f37',
            tags: ['food', 'pasta', 'comfort', 'garlic-bread', 'cheese'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            story: {
              id: 'story-baked-pasta',
              title: 'Fresh Out of the Oven',
              photos: ['/anshullkgarg/images/converted-images/italian-baked-pasta-garlic-bread-2021-12-27.jpg'],
              duration: 4000
            }
          },
          {
            id: 'food-2',
            src: '/anshullkgarg/images/converted-images/woodfired-pizza-jalapeno-2021-12-28.jpg',
            title: 'Wood-fired Pizza with Jalapeño',
            location: 'Pizzeria',
            date: '2021-12-28',
            dominantColor: '#b83d2a',
            tags: ['food', 'pizza', 'jalapeno', 'woodfired'],
            views: 0,
            likes: 0,
            aspectRatio: 900 / 1200,
            width: 900,
            height: 1200,
            story: {
              id: 'story-pizza',
              title: 'Slice of Heat',
              photos: ['/anshullkgarg/images/converted-images/woodfired-pizza-jalapeno-2021-12-28.jpg'],
              duration: 4000
            }
          }
        ]
      }
];



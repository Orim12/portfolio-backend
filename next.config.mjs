export default {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/admin/',
        permanent: false,
      },
    ]
  },
  assetPrefix: process.env.NODE_ENV === 'development' ? undefined : '/admin',
  images: {
    path: process.env.NODE_ENV === 'development' ? undefined : '/admin/_next/image',
  },
}

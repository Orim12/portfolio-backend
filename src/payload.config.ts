// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { cloudinaryAdapter } from './cloudinary'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { v2 as cloudinary } from 'cloudinary'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { GeneralData } from './globals/generaldata'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // Globale upload limiet verhogen
  upload: {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB in bytes
    },
  },
  collections: [Users, Media, Projects],
  globals: [GeneralData],
  cors: [
    'http://localhost:3000', // Je frontend URL
    'https://mirovaassen.nl', // Vervang met je productie URL
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          disableLocalStorage: true,
          generateFileURL: ({ filename }) => {
            // Zorg dat public_id correct is opgebouwd - remove extension properly
            const publicId = filename.startsWith('media/')
              ? filename.replace(/\.[^/.]+$/, '')
              : `media/${filename.replace(/\.[^/.]+$/, '')}`

            // Determine resource type based on file extension
            const extension = filename.split('.').pop()?.toLowerCase() || ''
            let urlPath = 'image/upload'

            const videoExtensions = ['mp4', 'webm', 'mov', 'avi', 'mkv']
            const rawExtensions = ['doc', 'docx', 'txt', 'zip', 'xls', 'xlsx']

            if (videoExtensions.includes(extension)) {
              urlPath = 'video/upload'
            } else if (rawExtensions.includes(extension)) {
              urlPath = 'raw/upload'
            }

            return `https://res.cloudinary.com/dqbctfrbn/${urlPath}/${publicId}`
          },
        },
      },
    }),
  ],
})

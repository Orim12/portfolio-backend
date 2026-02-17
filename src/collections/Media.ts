import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      label: 'Cloudinary URL',
      admin: {
        readOnly: true,
        hidden: true, // Verberg in admin, we genereren dit automatisch
      },
    },
    {
      name: 'publicId',
      type: 'text',
      label: 'Public ID',
      admin: {
        readOnly: true,
        hidden: true, // Verberg in admin, we genereren dit automatisch
      },
    }
  ],
  hooks: {
    afterRead: [
      ({ doc }) => {
        // Genereer cloudinaryUrl automatisch
        if (doc.filename) {
          const publicId = doc.filename.startsWith('media/')
            ? doc.filename.replace(/\.[^/.]+$/, '')
            : `media/${doc.filename.replace(/\.[^/.]+$/, '')}`

          // Determine resource type based on file extension
          const extension = doc.filename.split('.').pop()?.toLowerCase() || ''
          let urlPath = 'image/upload'

          const videoExtensions = ['mp4', 'webm', 'mov', 'avi', 'mkv']
          const rawExtensions = ['doc', 'docx', 'txt', 'zip', 'xls', 'xlsx']

          if (videoExtensions.includes(extension)) {
            urlPath = 'video/upload'
          } else if (rawExtensions.includes(extension)) {
            urlPath = 'raw/upload'
          }

          doc.cloudinaryUrl = `https://res.cloudinary.com/dqbctfrbn/${urlPath}/${publicId}`
          doc.publicId = publicId
        }
        return doc
      },
    ],
  },
  upload: true,
}
